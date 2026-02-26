const STORAGE_KEY = "academicCalendarControlsV1";

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

const DEFAULT_CONTROLS = {
  schoolYearLabel: "2026-2027",
  startYear: 2026,
  startMonth: 6,
  monthsToRender: 12,
  eventRules: [
    { type: "newTeacherTraining", start: "2026-08-03", end: "2026-08-03", weekdaysOnly: false },
    {
      type: "teacherProfessionalLearning",
      start: "2026-08-03",
      end: "2026-08-11",
      weekdaysOnly: true
    },
    { type: "firstLastDay", start: "2026-08-12", end: "2026-08-12", weekdaysOnly: false },
    { type: "studentStaffHoliday", start: "2026-09-07", end: "2026-09-07", weekdaysOnly: false },
    {
      type: "teacherProfessionalLearning",
      start: "2026-09-21",
      end: "2026-09-21",
      weekdaysOnly: false
    },
    {
      type: "teacherProfessionalLearning",
      start: "2026-10-09",
      end: "2026-10-09",
      weekdaysOnly: false
    },
    { type: "studentStaffHoliday", start: "2026-10-12", end: "2026-10-13", weekdaysOnly: false },
    {
      type: "teacherProfessionalLearning",
      start: "2026-11-02",
      end: "2026-11-03",
      weekdaysOnly: true
    },
    { type: "studentStaffHoliday", start: "2026-11-23", end: "2026-11-27", weekdaysOnly: true },
    { type: "earlyRelease", start: "2026-12-18", end: "2026-12-18", weekdaysOnly: false },
    { type: "studentStaffHoliday", start: "2026-12-21", end: "2026-12-31", weekdaysOnly: true },
    { type: "studentStaffHoliday", start: "2027-01-01", end: "2027-01-01", weekdaysOnly: false },
    {
      type: "teacherProfessionalLearning",
      start: "2027-01-04",
      end: "2027-01-04",
      weekdaysOnly: false
    },
    { type: "studentStaffHoliday", start: "2027-01-18", end: "2027-01-18", weekdaysOnly: false },
    {
      type: "teacherProfessionalLearning",
      start: "2027-02-12",
      end: "2027-02-12",
      weekdaysOnly: false
    },
    { type: "studentStaffHoliday", start: "2027-02-15", end: "2027-02-16", weekdaysOnly: true },
    { type: "studentStaffHoliday", start: "2027-03-15", end: "2027-03-19", weekdaysOnly: true },
    { type: "studentStaffHoliday", start: "2027-03-26", end: "2027-03-26", weekdaysOnly: false },
    {
      type: "teacherProfessionalLearning",
      start: "2027-03-29",
      end: "2027-03-29",
      weekdaysOnly: false
    },
    {
      type: "teacherProfessionalLearning",
      start: "2027-04-26",
      end: "2027-04-26",
      weekdaysOnly: false
    },
    { type: "earlyRelease", start: "2027-05-27", end: "2027-05-27", weekdaysOnly: false },
    { type: "firstLastDay", start: "2027-05-27", end: "2027-05-27", weekdaysOnly: false }
  ],
  gradingRanges: {
    gp6: [
      { start: "2026-09-28", end: "2026-11-06" },
      { start: "2026-11-09", end: "2027-01-29" },
      { start: "2027-02-01", end: "2027-03-26" },
      { start: "2027-03-29", end: "2027-05-27" }
    ],
    gp9: [
      { start: "2026-08-12", end: "2026-10-16" },
      { start: "2026-10-19", end: "2027-01-08" },
      { start: "2027-01-11", end: "2027-03-19" },
      { start: "2027-03-22", end: "2027-05-27" }
    ]
  },
  importantDates: [
    { label: "First Day of School", dateText: "Aug. 12, 2026" },
    { label: "Fall Break (Student / Staff Holiday)", dateText: "Nov. 23-27, 2026" },
    { label: "Early Release", dateText: "Dec. 18, 2026" },
    { label: "Winter Break (Student / Staff Holiday)", dateText: "Dec. 21, 2026-Jan. 1, 2027" },
    { label: "Spring Break (Student / Staff Holiday)", dateText: "Mar. 15-19, 2027" },
    { label: "Proposed STAAR Testing", dateText: "Apr. 6-May 1, 2027" },
    { label: "Last Day of School / Early Release", dateText: "May 27, 2027" }
  ]
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createEmptyEventGroups() {
  return Object.keys(EVENT_META).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
}

function createEmptyGradingGroups() {
  return { gp6: [], gp9: [] };
}

function groupEventRules(eventRules) {
  const groups = createEmptyEventGroups();
  (eventRules || []).forEach((rule) => {
    if (!rule || !groups[rule.type]) return;
    groups[rule.type].push({
      start: rule.start || "",
      end: rule.end || rule.start || "",
      weekdaysOnly: Boolean(rule.weekdaysOnly)
    });
  });
  return groups;
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
      return;
    }
    if (marker.side === "end" && activeStart) {
      ranges.push({ start: activeStart, end: marker.date });
      activeStart = "";
    }
  });

  return ranges;
}

function normalizeGradingRanges(saved) {
  if (saved && typeof saved === "object") {
    return {
      gp6: Array.isArray(saved.gp6)
        ? saved.gp6.map((range) => ({ start: range.start || "", end: range.end || "" }))
        : [],
      gp9: Array.isArray(saved.gp9)
        ? saved.gp9.map((range) => ({ start: range.start || "", end: range.end || "" }))
        : []
    };
  }
  return createEmptyGradingGroups();
}

function loadControls() {
  const defaults = deepClone(DEFAULT_CONTROLS);

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        schoolYearLabel: defaults.schoolYearLabel,
        startYear: defaults.startYear,
        startMonth: defaults.startMonth,
        monthsToRender: defaults.monthsToRender,
        eventGroups: groupEventRules(defaults.eventRules),
        gradingGroups: normalizeGradingRanges(defaults.gradingRanges),
        importantDates: defaults.importantDates
      };
    }

    const saved = JSON.parse(raw);
    const gradingGroups = saved.gradingRanges
      ? normalizeGradingRanges(saved.gradingRanges)
      : {
          gp6: markersToRanges(saved.gradingMarkers || [], "gp6"),
          gp9: markersToRanges(saved.gradingMarkers || [], "gp9")
        };

    return {
      schoolYearLabel: saved.schoolYearLabel || defaults.schoolYearLabel,
      startYear: Number.isInteger(saved.startYear) ? saved.startYear : defaults.startYear,
      startMonth: Number.isInteger(saved.startMonth) ? saved.startMonth : defaults.startMonth,
      monthsToRender: Number.isInteger(saved.monthsToRender)
        ? saved.monthsToRender
        : defaults.monthsToRender,
      eventGroups: groupEventRules(saved.eventRules || defaults.eventRules),
      gradingGroups,
      importantDates: Array.isArray(saved.importantDates)
        ? saved.importantDates.map((entry) => ({ label: entry.label || "", dateText: entry.dateText || "" }))
        : defaults.importantDates
    };
  } catch {
    return {
      schoolYearLabel: defaults.schoolYearLabel,
      startYear: defaults.startYear,
      startMonth: defaults.startMonth,
      monthsToRender: defaults.monthsToRender,
      eventGroups: groupEventRules(defaults.eventRules),
      gradingGroups: normalizeGradingRanges(defaults.gradingRanges),
      importantDates: defaults.importantDates
    };
  }
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

const state = loadControls();

const schoolYearLabelInput = document.getElementById("schoolYearLabel");
const startYearInput = document.getElementById("startYear");
const startMonthSelect = document.getElementById("startMonth");
const monthsToRenderInput = document.getElementById("monthsToRender");
const eventGroupsContainer = document.getElementById("eventGroups");
const gradingGroupsContainer = document.getElementById("gradingGroups");
const importantDatesBody = document.getElementById("importantDatesBody");
const statusLine = document.getElementById("statusLine");

MONTHS.forEach((monthName, index) => {
  const option = document.createElement("option");
  option.value = String(index);
  option.textContent = monthName;
  startMonthSelect.appendChild(option);
});

function createDeleteButton(onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-danger";
  button.textContent = "Remove";
  button.addEventListener("click", onClick);
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
      ranges.push({ start: "", end: "", weekdaysOnly: false });
      renderEventGroups();
    });
    head.appendChild(addBtn);

    const table = document.createElement("table");
    table.className = "group-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th class="checkbox-cell">Weekdays Only</th>
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
      });
      startCell.appendChild(startInput);

      const endCell = document.createElement("td");
      const endInput = createInput("date", range.end || range.start);
      endInput.addEventListener("change", () => {
        range.end = endInput.value;
      });
      endCell.appendChild(endInput);

      const weekdaysCell = document.createElement("td");
      weekdaysCell.className = "checkbox-cell";
      const weekdaysInput = document.createElement("input");
      weekdaysInput.type = "checkbox";
      weekdaysInput.checked = Boolean(range.weekdaysOnly);
      weekdaysInput.addEventListener("change", () => {
        range.weekdaysOnly = weekdaysInput.checked;
      });
      weekdaysCell.appendChild(weekdaysInput);

      const actionCell = document.createElement("td");
      actionCell.appendChild(
        createDeleteButton(() => {
          ranges.splice(index, 1);
          renderEventGroups();
        })
      );

      row.append(startCell, endCell, weekdaysCell, actionCell);
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
      });
      startCell.appendChild(startInput);

      const endCell = document.createElement("td");
      const endInput = createInput("date", range.end);
      endInput.addEventListener("change", () => {
        range.end = endInput.value;
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
    });
    labelCell.appendChild(labelInput);

    const dateTextCell = document.createElement("td");
    const dateTextInput = createInput("text", entry.dateText);
    dateTextInput.addEventListener("change", () => {
      entry.dateText = dateTextInput.value;
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

function flattenEventRules(eventGroups) {
  return Object.entries(eventGroups).flatMap(([type, ranges]) =>
    ranges
      .filter((range) => range.start)
      .map((range) => ({
        type,
        start: range.start,
        end: range.end || range.start,
        weekdaysOnly: Boolean(range.weekdaysOnly)
      }))
  );
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

function setStatus(message) {
  statusLine.textContent = message;
}

document.getElementById("addImportantDate").addEventListener("click", () => {
  state.importantDates.push({ label: "", dateText: "" });
  renderImportantDates();
});

document.getElementById("saveControls").addEventListener("click", () => {
  const payload = collectForm();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  setStatus("Saved. Refresh the calendar page to see updates.");
});

document.getElementById("resetDefaults").addEventListener("click", () => {
  const defaults = deepClone(DEFAULT_CONTROLS);
  state.schoolYearLabel = defaults.schoolYearLabel;
  state.startYear = defaults.startYear;
  state.startMonth = defaults.startMonth;
  state.monthsToRender = defaults.monthsToRender;
  state.eventGroups = groupEventRules(defaults.eventRules);
  state.gradingGroups = normalizeGradingRanges(defaults.gradingRanges);
  state.importantDates = defaults.importantDates;
  renderAll();
  setStatus("Form reset to defaults. Click Save to apply.");
});

document.getElementById("clearSaved").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  setStatus("Saved control data cleared. Calendar page will fall back to defaults.");
});

renderAll();
