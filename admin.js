const CONTROLS_URL = window.ACADEMIC_CALENDAR_CONTROLS_URL || "./calendar-controls.json";
const SETTINGS_KEY = "academicCalendarGithubSettingsV1";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const EVENT_META = {
  newTeacherTraining: { label: "New Teacher Training", color: "#63aeca" },
  teacherProfessionalLearning: { label: "Teacher Professional Learning", color: "#ffc000" },
  studentStaffHoliday: { label: "Student / Staff Holiday", color: "#a3d0a8" },
  earlyRelease: { label: "Early Release", color: "#d9d9d9" },
  firstLastDay: { label: "First / Last Day of School", color: "#b18fc2" },
  proposedStaar: { label: "Proposed STAAR Testing", color: "#005987" }
};

const GRADING_META = {
  gp6: { label: "6-Week Grading Periods", color: "#005987" },
  gp9: { label: "9-Week Grading Periods", color: "#ffc000" }
};

function createEmptyEventGroups() {
  return Object.keys(EVENT_META).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function groupEventRules(eventRules) {
  const groups = createEmptyEventGroups();
  (eventRules || []).forEach((rule) => {
    if (!rule || !groups[rule.type]) return;
    groups[rule.type].push({ start: rule.start || "", end: rule.end || rule.start || "" });
  });
  return groups;
}

function normalizeGradingRanges(saved) {
  if (!saved || typeof saved !== "object") return { gp6: [], gp9: [] };
  return {
    gp6: Array.isArray(saved.gp6)
      ? saved.gp6.map((range) => ({ start: range.start || "", end: range.end || "" }))
      : [],
    gp9: Array.isArray(saved.gp9)
      ? saved.gp9.map((range) => ({ start: range.start || "", end: range.end || "" }))
      : []
  };
}

function markersToRanges(markers, type) {
  const sorted = (markers || [])
    .filter((marker) => marker && marker.type === type && marker.date && marker.side)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  const ranges = [];
  let activeStart = "";

  sorted.forEach((marker) => {
    if (marker.side === "start") {
      activeStart = marker.date;
    } else if (marker.side === "end" && activeStart) {
      ranges.push({ start: activeStart, end: marker.date });
      activeStart = "";
    }
  });

  return ranges;
}

function rangesToMarkers(gradingGroups) {
  const markers = [];
  ["gp6", "gp9"].forEach((type) => {
    (gradingGroups[type] || []).forEach((range) => {
      if (!range.start || !range.end) return;
      markers.push({ type, date: range.start, side: "start" });
      markers.push({ type, date: range.end, side: "end" });
    });
  });
  return markers;
}

function flattenEventRules(eventGroups) {
  return Object.entries(eventGroups).flatMap(([type, ranges]) =>
    ranges
      .filter((range) => range.start)
      .map((range) => ({
        type,
        start: range.start,
        end: range.end || range.start,
        weekdaysOnly: true
      }))
  );
}

function loadGithubSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return {
        owner: "lisdhamrick",
        repo: "Academic-Calendar",
        branch: "main",
        path: "calendar-controls.json",
        token: ""
      };
    }
    const saved = JSON.parse(raw);
    return {
      owner: saved.owner || "lisdhamrick",
      repo: saved.repo || "Academic-Calendar",
      branch: saved.branch || "main",
      path: saved.path || "calendar-controls.json",
      token: saved.token || ""
    };
  } catch {
    return {
      owner: "lisdhamrick",
      repo: "Academic-Calendar",
      branch: "main",
      path: "calendar-controls.json",
      token: ""
    };
  }
}

function saveGithubSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function base64EncodeUtf8(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

async function getCurrentFileSha(settings) {
  const url = `https://api.github.com/repos/${encodeURIComponent(settings.owner)}/${encodeURIComponent(
    settings.repo
  )}/contents/${settings.path}?ref=${encodeURIComponent(settings.branch)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${settings.token}`,
      Accept: "application/vnd.github+json"
    }
  });

  if (response.status === 404) return null;

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GitHub read failed (${response.status}): ${err}`);
  }

  const data = await response.json();
  return data.sha || null;
}

async function saveControlsToGithub(settings, payload) {
  const sha = await getCurrentFileSha(settings);
  const url = `https://api.github.com/repos/${encodeURIComponent(settings.owner)}/${encodeURIComponent(
    settings.repo
  )}/contents/${settings.path}`;

  const content = `${JSON.stringify(payload, null, 2)}\n`;
  const body = {
    message: `Update calendar controls ${new Date().toISOString()}`,
    content: base64EncodeUtf8(content),
    branch: settings.branch
  };

  if (sha) body.sha = sha;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GitHub save failed (${response.status}): ${err}`);
  }

  return response.json();
}

async function fetchSharedControls() {
  try {
    const response = await fetch(`${CONTROLS_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      return {
        schoolYearLabel: "",
        startYear: 2026,
        startMonth: 6,
        monthsToRender: 12,
        eventGroups: createEmptyEventGroups(),
        gradingGroups: { gp6: [], gp9: [] },
        importantDates: []
      };
    }

    const data = await response.json();
    return {
      schoolYearLabel: data.schoolYearLabel || "",
      startYear: Number.isInteger(data.startYear) ? data.startYear : 2026,
      startMonth: Number.isInteger(data.startMonth) ? data.startMonth : 6,
      monthsToRender: Number.isInteger(data.monthsToRender) ? data.monthsToRender : 12,
      eventGroups: groupEventRules(data.eventRules || []),
      gradingGroups: data.gradingRanges
        ? normalizeGradingRanges(data.gradingRanges)
        : {
            gp6: markersToRanges(data.gradingMarkers || [], "gp6"),
            gp9: markersToRanges(data.gradingMarkers || [], "gp9")
          },
      importantDates: Array.isArray(data.importantDates)
        ? data.importantDates.map((entry) => ({ label: entry.label || "", dateText: entry.dateText || "" }))
        : []
    };
  } catch {
    return {
      schoolYearLabel: "",
      startYear: 2026,
      startMonth: 6,
      monthsToRender: 12,
      eventGroups: createEmptyEventGroups(),
      gradingGroups: { gp6: [], gp9: [] },
      importantDates: []
    };
  }
}

const state = {
  schoolYearLabel: "",
  startYear: 2026,
  startMonth: 6,
  monthsToRender: 12,
  eventGroups: createEmptyEventGroups(),
  gradingGroups: { gp6: [], gp9: [] },
  importantDates: []
};

const githubSettings = loadGithubSettings();

const schoolYearLabelInput = document.getElementById("schoolYearLabel");
const startYearInput = document.getElementById("startYear");
const startMonthSelect = document.getElementById("startMonth");
const monthsToRenderInput = document.getElementById("monthsToRender");
const eventGroupsContainer = document.getElementById("eventGroups");
const gradingGroupsContainer = document.getElementById("gradingGroups");
const importantDatesBody = document.getElementById("importantDatesBody");
const statusLine = document.getElementById("statusLine");
const saveButton = document.getElementById("saveControls");

const repoOwnerInput = document.getElementById("repoOwner");
const repoNameInput = document.getElementById("repoName");
const repoBranchInput = document.getElementById("repoBranch");
const repoPathInput = document.getElementById("repoPath");
const githubTokenInput = document.getElementById("githubToken");

let statusTimer = null;
let isDirty = false;

MONTHS.forEach((monthName, index) => {
  const option = document.createElement("option");
  option.value = String(index);
  option.textContent = monthName;
  startMonthSelect.appendChild(option);
});

function setStatus(message, persist = false) {
  statusLine.textContent = message;
  if (statusTimer) {
    clearTimeout(statusTimer);
    statusTimer = null;
  }
  if (!persist && message) {
    statusTimer = setTimeout(() => {
      statusLine.textContent = "";
      statusTimer = null;
    }, 3000);
  }
}

function markDirty() {
  if (!isDirty) {
    isDirty = true;
  }
  setStatus("");
}

function createDeleteButton(onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-danger";
  button.textContent = "Remove";
  button.addEventListener("click", () => {
    onClick();
    markDirty();
  });
  return button;
}

function createInput(type, value) {
  const input = document.createElement("input");
  input.type = type;
  input.value = value || "";
  return input;
}

function renderEventGroups() {
  eventGroupsContainer.innerHTML = "";

  Object.entries(EVENT_META).forEach(([type, meta]) => {
    const ranges = state.eventGroups[type] || [];
    const card = document.createElement("div");
    card.className = "group-card";
    card.style.setProperty("--group-color", meta.color);

    const head = document.createElement("div");
    head.className = "group-head";
    head.innerHTML = `<h3 class="group-title">${meta.label}</h3>`;

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn";
    addBtn.textContent = "Add Range";
    addBtn.addEventListener("click", () => {
      ranges.push({ start: "", end: "" });
      renderEventGroups();
      markDirty();
    });
    head.appendChild(addBtn);

    const table = document.createElement("table");
    table.className = "group-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    ranges.forEach((range, index) => {
      const row = document.createElement("tr");

      const startCell = document.createElement("td");
      const startInput = createInput("date", range.start);
      startInput.addEventListener("change", () => {
        range.start = startInput.value;
        markDirty();
      });
      startCell.appendChild(startInput);

      const endCell = document.createElement("td");
      const endInput = createInput("date", range.end || range.start);
      endInput.addEventListener("change", () => {
        range.end = endInput.value;
        markDirty();
      });
      endCell.appendChild(endInput);

      const actionCell = document.createElement("td");
      actionCell.appendChild(
        createDeleteButton(() => {
          ranges.splice(index, 1);
          renderEventGroups();
        })
      );

      row.append(startCell, endCell, actionCell);
      tbody.appendChild(row);
    });

    card.append(head, table);
    eventGroupsContainer.appendChild(card);
  });
}

function renderGradingGroups() {
  gradingGroupsContainer.innerHTML = "";

  Object.entries(GRADING_META).forEach(([type, meta]) => {
    const ranges = state.gradingGroups[type] || [];
    const card = document.createElement("div");
    card.className = "group-card";
    card.style.setProperty("--group-color", meta.color);

    const head = document.createElement("div");
    head.className = "group-head";
    head.innerHTML = `<h3 class="group-title">${meta.label}</h3>`;

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn";
    addBtn.textContent = "Add Range";
    addBtn.addEventListener("click", () => {
      ranges.push({ start: "", end: "" });
      renderGradingGroups();
      markDirty();
    });
    head.appendChild(addBtn);

    const table = document.createElement("table");
    table.className = "group-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    ranges.forEach((range, index) => {
      const row = document.createElement("tr");

      const startCell = document.createElement("td");
      const startInput = createInput("date", range.start);
      startInput.addEventListener("change", () => {
        range.start = startInput.value;
        markDirty();
      });
      startCell.appendChild(startInput);

      const endCell = document.createElement("td");
      const endInput = createInput("date", range.end);
      endInput.addEventListener("change", () => {
        range.end = endInput.value;
        markDirty();
      });
      endCell.appendChild(endInput);

      const actionCell = document.createElement("td");
      actionCell.appendChild(
        createDeleteButton(() => {
          ranges.splice(index, 1);
          renderGradingGroups();
        })
      );

      row.append(startCell, endCell, actionCell);
      tbody.appendChild(row);
    });

    card.append(head, table);
    gradingGroupsContainer.appendChild(card);
  });
}

function renderImportantDates() {
  importantDatesBody.innerHTML = "";

  state.importantDates.forEach((entry, index) => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    const labelInput = createInput("text", entry.label);
    labelInput.addEventListener("change", () => {
      entry.label = labelInput.value;
      markDirty();
    });
    labelCell.appendChild(labelInput);

    const dateTextCell = document.createElement("td");
    const dateTextInput = createInput("text", entry.dateText);
    dateTextInput.addEventListener("change", () => {
      entry.dateText = dateTextInput.value;
      markDirty();
    });
    dateTextCell.appendChild(dateTextInput);

    const actionCell = document.createElement("td");
    actionCell.appendChild(
      createDeleteButton(() => {
        state.importantDates.splice(index, 1);
        renderImportantDates();
      })
    );

    row.append(labelCell, dateTextCell, actionCell);
    importantDatesBody.appendChild(row);
  });
}

function renderAll() {
  schoolYearLabelInput.value = state.schoolYearLabel;
  startYearInput.value = state.startYear;
  startMonthSelect.value = String(state.startMonth);
  monthsToRenderInput.value = state.monthsToRender;
  renderEventGroups();
  renderGradingGroups();
  renderImportantDates();
}

function collectForm() {
  return {
    schoolYearLabel: schoolYearLabelInput.value.trim(),
    startYear: Number(startYearInput.value),
    startMonth: Number(startMonthSelect.value),
    monthsToRender: Number(monthsToRenderInput.value),
    eventRules: flattenEventRules(state.eventGroups),
    gradingRanges: {
      gp6: (state.gradingGroups.gp6 || []).filter((range) => range.start && range.end),
      gp9: (state.gradingGroups.gp9 || []).filter((range) => range.start && range.end)
    },
    gradingMarkers: rangesToMarkers(state.gradingGroups),
    importantDates: state.importantDates.filter((entry) => entry.label && entry.dateText)
  };
}

function bindGithubSettings() {
  repoOwnerInput.value = githubSettings.owner;
  repoNameInput.value = githubSettings.repo;
  repoBranchInput.value = githubSettings.branch;
  repoPathInput.value = githubSettings.path;
  githubTokenInput.value = githubSettings.token;

  [repoOwnerInput, repoNameInput, repoBranchInput, repoPathInput, githubTokenInput].forEach((input) => {
    input.addEventListener("input", () => {
      githubSettings.owner = repoOwnerInput.value.trim();
      githubSettings.repo = repoNameInput.value.trim();
      githubSettings.branch = repoBranchInput.value.trim();
      githubSettings.path = repoPathInput.value.trim();
      githubSettings.token = githubTokenInput.value.trim();
      saveGithubSettings(githubSettings);
      setStatus("");
    });
  });
}

schoolYearLabelInput.addEventListener("input", markDirty);
startYearInput.addEventListener("input", markDirty);
startMonthSelect.addEventListener("change", markDirty);
monthsToRenderInput.addEventListener("input", markDirty);

document.getElementById("addImportantDate").addEventListener("click", () => {
  state.importantDates.push({ label: "", dateText: "" });
  renderImportantDates();
  markDirty();
});

document.getElementById("saveControls").addEventListener("click", async () => {
  githubSettings.owner = repoOwnerInput.value.trim();
  githubSettings.repo = repoNameInput.value.trim();
  githubSettings.branch = repoBranchInput.value.trim();
  githubSettings.path = repoPathInput.value.trim();
  githubSettings.token = githubTokenInput.value.trim();
  saveGithubSettings(githubSettings);

  if (!githubSettings.owner || !githubSettings.repo || !githubSettings.branch || !githubSettings.path) {
    setStatus("Complete Repo Owner, Repo Name, Branch, and Controls File Path.", true);
    return;
  }

  if (!githubSettings.token) {
    setStatus("Enter your GitHub PAT to save directly to the repository.", true);
    return;
  }

  const payload = collectForm();

  try {
    saveButton.disabled = true;
    saveButton.textContent = "Saving...";
    await saveControlsToGithub(githubSettings, payload);
    isDirty = false;
    setStatus("Saved to GitHub. Changes will appear on GitHub Pages after publish delay.");
  } catch (error) {
    setStatus(error.message || "Save failed.", true);
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = "Save";
  }
});

document.getElementById("resetDefaults").addEventListener("click", async () => {
  const fresh = await fetchSharedControls();
  state.schoolYearLabel = fresh.schoolYearLabel;
  state.startYear = fresh.startYear;
  state.startMonth = fresh.startMonth;
  state.monthsToRender = fresh.monthsToRender;
  state.eventGroups = deepClone(fresh.eventGroups || createEmptyEventGroups());
  state.gradingGroups = deepClone(fresh.gradingGroups || { gp6: [], gp9: [] });
  state.importantDates = deepClone(fresh.importantDates || []);
  renderAll();
  isDirty = false;
  setStatus("Reloaded values from shared calendar-controls.json.");
});

document.getElementById("clearSaved").addEventListener("click", () => {
  state.eventGroups = createEmptyEventGroups();
  state.gradingGroups = { gp6: [], gp9: [] };
  state.importantDates = [];
  renderAll();
  markDirty();
  setStatus("Cleared form values.", true);
});

bindGithubSettings();

fetchSharedControls().then((fresh) => {
  state.schoolYearLabel = fresh.schoolYearLabel;
  state.startYear = fresh.startYear;
  state.startMonth = fresh.startMonth;
  state.monthsToRender = fresh.monthsToRender;
  state.eventGroups = deepClone(fresh.eventGroups || createEmptyEventGroups());
  state.gradingGroups = deepClone(fresh.gradingGroups || { gp6: [], gp9: [] });
  state.importantDates = deepClone(fresh.importantDates || []);
  renderAll();
});
