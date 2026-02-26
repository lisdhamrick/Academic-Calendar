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

const EVENT_TYPES = {
  newTeacherTraining: "New Teacher Training",
  teacherProfessionalLearning: "Teacher Professional Learning",
  studentStaffHoliday: "Student / Staff Holiday",
  earlyRelease: "Early Release",
  firstLastDay: "First / Last Day of School",
  proposedStaar: "Proposed STAAR Testing"
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
  gradingMarkers: [
    { type: "gp6", date: "2026-09-28", side: "start" },
    { type: "gp6", date: "2026-11-06", side: "end" },
    { type: "gp6", date: "2026-11-09", side: "start" },
    { type: "gp6", date: "2027-01-29", side: "end" },
    { type: "gp6", date: "2027-02-01", side: "start" },
    { type: "gp6", date: "2027-03-26", side: "end" },
    { type: "gp6", date: "2027-03-29", side: "start" },
    { type: "gp6", date: "2027-05-27", side: "end" },
    { type: "gp9", date: "2026-08-12", side: "start" },
    { type: "gp9", date: "2026-10-16", side: "end" },
    { type: "gp9", date: "2026-10-19", side: "start" },
    { type: "gp9", date: "2027-01-08", side: "end" },
    { type: "gp9", date: "2027-01-11", side: "start" },
    { type: "gp9", date: "2027-03-19", side: "end" },
    { type: "gp9", date: "2027-03-22", side: "start" },
    { type: "gp9", date: "2027-05-27", side: "end" }
  ],
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

function loadControls() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return deepClone(DEFAULT_CONTROLS);
    return { ...deepClone(DEFAULT_CONTROLS), ...JSON.parse(raw) };
  } catch {
    return deepClone(DEFAULT_CONTROLS);
  }
}

const state = loadControls();

const schoolYearLabelInput = document.getElementById("schoolYearLabel");
const startYearInput = document.getElementById("startYear");
const startMonthSelect = document.getElementById("startMonth");
const monthsToRenderInput = document.getElementById("monthsToRender");
const eventRulesBody = document.getElementById("eventRulesBody");
const markersBody = document.getElementById("markersBody");
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

function createSelect(optionsMap, value) {
  const select = document.createElement("select");
  Object.entries(optionsMap).forEach(([key, label]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = label;
    if (key === value) option.selected = true;
    select.appendChild(option);
  });
  return select;
}

function createInput(type, value) {
  const input = document.createElement("input");
  input.type = type;
  input.value = value || "";
  return input;
}

function renderEventRules() {
  eventRulesBody.innerHTML = "";

  state.eventRules.forEach((rule, index) => {
    const row = document.createElement("tr");

    const typeCell = document.createElement("td");
    const typeSelect = createSelect(EVENT_TYPES, rule.type);
    typeCell.appendChild(typeSelect);

    const startCell = document.createElement("td");
    const startInput = createInput("date", rule.start);
    startCell.appendChild(startInput);

    const endCell = document.createElement("td");
    const endInput = createInput("date", rule.end || rule.start);
    endCell.appendChild(endInput);

    const weekdaysCell = document.createElement("td");
    weekdaysCell.className = "checkbox-cell";
    const weekdaysInput = document.createElement("input");
    weekdaysInput.type = "checkbox";
    weekdaysInput.checked = Boolean(rule.weekdaysOnly);
    weekdaysCell.appendChild(weekdaysInput);

    const actionCell = document.createElement("td");
    actionCell.appendChild(
      createDeleteButton(() => {
        state.eventRules.splice(index, 1);
        renderEventRules();
      })
    );

    typeSelect.addEventListener("change", () => {
      rule.type = typeSelect.value;
    });
    startInput.addEventListener("change", () => {
      rule.start = startInput.value;
    });
    endInput.addEventListener("change", () => {
      rule.end = endInput.value;
    });
    weekdaysInput.addEventListener("change", () => {
      rule.weekdaysOnly = weekdaysInput.checked;
    });

    row.append(typeCell, startCell, endCell, weekdaysCell, actionCell);
    eventRulesBody.appendChild(row);
  });
}

function renderMarkers() {
  markersBody.innerHTML = "";

  state.gradingMarkers.forEach((marker, index) => {
    const row = document.createElement("tr");

    const typeCell = document.createElement("td");
    const typeSelect = createSelect({ gp6: "6-Week", gp9: "9-Week" }, marker.type);
    typeCell.appendChild(typeSelect);

    const dateCell = document.createElement("td");
    const dateInput = createInput("date", marker.date);
    dateCell.appendChild(dateInput);

    const sideCell = document.createElement("td");
    const sideSelect = createSelect({ start: "Start", end: "End" }, marker.side);
    sideCell.appendChild(sideSelect);

    const actionCell = document.createElement("td");
    actionCell.appendChild(
      createDeleteButton(() => {
        state.gradingMarkers.splice(index, 1);
        renderMarkers();
      })
    );

    typeSelect.addEventListener("change", () => {
      marker.type = typeSelect.value;
    });
    dateInput.addEventListener("change", () => {
      marker.date = dateInput.value;
    });
    sideSelect.addEventListener("change", () => {
      marker.side = sideSelect.value;
    });

    row.append(typeCell, dateCell, sideCell, actionCell);
    markersBody.appendChild(row);
  });
}

function renderImportantDates() {
  importantDatesBody.innerHTML = "";

  state.importantDates.forEach((entry, index) => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    const labelInput = createInput("text", entry.label);
    labelCell.appendChild(labelInput);

    const dateTextCell = document.createElement("td");
    const dateTextInput = createInput("text", entry.dateText);
    dateTextCell.appendChild(dateTextInput);

    const actionCell = document.createElement("td");
    actionCell.appendChild(
      createDeleteButton(() => {
        state.importantDates.splice(index, 1);
        renderImportantDates();
      })
    );

    labelInput.addEventListener("change", () => {
      entry.label = labelInput.value;
    });
    dateTextInput.addEventListener("change", () => {
      entry.dateText = dateTextInput.value;
    });

    row.append(labelCell, dateTextCell, actionCell);
    importantDatesBody.appendChild(row);
  });
}

function renderAll() {
  schoolYearLabelInput.value = state.schoolYearLabel;
  startYearInput.value = state.startYear;
  startMonthSelect.value = String(state.startMonth);
  monthsToRenderInput.value = state.monthsToRender;
  renderEventRules();
  renderMarkers();
  renderImportantDates();
}

function collectForm() {
  return {
    schoolYearLabel: schoolYearLabelInput.value.trim(),
    startYear: Number(startYearInput.value),
    startMonth: Number(startMonthSelect.value),
    monthsToRender: Number(monthsToRenderInput.value),
    eventRules: state.eventRules.filter((rule) => rule.type && rule.start),
    gradingMarkers: state.gradingMarkers.filter((marker) => marker.type && marker.date && marker.side),
    importantDates: state.importantDates.filter((entry) => entry.label && entry.dateText)
  };
}

function setStatus(message) {
  statusLine.textContent = message;
}

document.getElementById("addEventRule").addEventListener("click", () => {
  state.eventRules.push({
    type: "studentStaffHoliday",
    start: "",
    end: "",
    weekdaysOnly: false
  });
  renderEventRules();
});

document.getElementById("addMarker").addEventListener("click", () => {
  state.gradingMarkers.push({ type: "gp6", date: "", side: "start" });
  renderMarkers();
});

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
  Object.keys(state).forEach((key) => {
    state[key] = defaults[key];
  });
  renderAll();
  setStatus("Form reset to defaults. Click Save to apply.");
});

document.getElementById("clearSaved").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  setStatus("Saved control data cleared. Calendar page will fall back to defaults.");
});

renderAll();
