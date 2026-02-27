const CONTROLS_URL = window.ACADEMIC_CALENDAR_CONTROLS_URL || "./calendar-controls.json";

const DEFAULT_EVENT_RULES = [
  { type: "newTeacherTraining", start: "2026-08-03", end: "2026-08-03", weekdaysOnly: true },
  {
    type: "teacherProfessionalLearning",
    start: "2026-08-03",
    end: "2026-08-11",
    weekdaysOnly: true
  },
  { type: "firstLastDay", start: "2026-08-12", end: "2026-08-12", weekdaysOnly: true },
  { type: "studentStaffHoliday", start: "2026-09-07", end: "2026-09-07", weekdaysOnly: true },
  {
    type: "teacherProfessionalLearning",
    start: "2026-09-21",
    end: "2026-09-21",
    weekdaysOnly: true
  },
  {
    type: "teacherProfessionalLearning",
    start: "2026-10-09",
    end: "2026-10-09",
    weekdaysOnly: true
  },
  { type: "studentStaffHoliday", start: "2026-10-12", end: "2026-10-13", weekdaysOnly: true },
  {
    type: "teacherProfessionalLearning",
    start: "2026-11-02",
    end: "2026-11-03",
    weekdaysOnly: true
  },
  { type: "studentStaffHoliday", start: "2026-11-23", end: "2026-11-27", weekdaysOnly: true },
  { type: "earlyRelease", start: "2026-12-18", end: "2026-12-18", weekdaysOnly: true },
  { type: "studentStaffHoliday", start: "2026-12-21", end: "2026-12-31", weekdaysOnly: true },
  { type: "studentStaffHoliday", start: "2027-01-01", end: "2027-01-01", weekdaysOnly: true },
  {
    type: "teacherProfessionalLearning",
    start: "2027-01-04",
    end: "2027-01-04",
    weekdaysOnly: true
  },
  { type: "studentStaffHoliday", start: "2027-01-18", end: "2027-01-18", weekdaysOnly: true },
  {
    type: "teacherProfessionalLearning",
    start: "2027-02-12",
    end: "2027-02-12",
    weekdaysOnly: true
  },
  { type: "studentStaffHoliday", start: "2027-02-15", end: "2027-02-16", weekdaysOnly: true },
  { type: "studentStaffHoliday", start: "2027-03-15", end: "2027-03-19", weekdaysOnly: true },
  { type: "studentStaffHoliday", start: "2027-03-26", end: "2027-03-26", weekdaysOnly: true },
  {
    type: "teacherProfessionalLearning",
    start: "2027-03-29",
    end: "2027-03-29",
    weekdaysOnly: true
  },
  {
    type: "teacherProfessionalLearning",
    start: "2027-04-26",
    end: "2027-04-26",
    weekdaysOnly: true
  },
  { type: "earlyRelease", start: "2027-05-27", end: "2027-05-27", weekdaysOnly: true },
  { type: "firstLastDay", start: "2027-05-27", end: "2027-05-27", weekdaysOnly: true }
];

const DEFAULT_GRADING_MARKERS = [
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
];

const DEFAULT_IMPORTANT_DATES = [
  { label: "First Day of School", dateText: "Aug. 12, 2026" },
  { label: "Fall Break (Student / Staff Holiday)", dateText: "Nov. 23-27, 2026" },
  { label: "Early Release", dateText: "Dec. 18, 2026" },
  { label: "Winter Break (Student / Staff Holiday)", dateText: "Dec. 21, 2026-Jan. 1, 2027" },
  { label: "Spring Break (Student / Staff Holiday)", dateText: "Mar. 15-19, 2027" },
  { label: "Proposed STAAR Testing", dateText: "Apr. 6-May 1, 2027" },
  { label: "Last Day of School / Early Release", dateText: "May 27, 2027" }
];

const CALENDAR_CONFIG = {
  districtName: "Leander ISD",
  schoolYearLabel: "2026-2027",
  startYear: 2026,
  startMonth: 6,
  monthsToRender: 12,
  eventTypes: {
    newTeacherTraining: { label: "New Teacher Training", className: "event-new-teacher" },
    teacherProfessionalLearning: {
      label: "Teacher Professional Learning",
      className: "event-teacher-pl"
    },
    studentStaffHoliday: { label: "Student / Staff Holiday", className: "event-holiday" },
    earlyRelease: { label: "Early Release", className: "event-early-release" },
    firstLastDay: { label: "First / Last Day of School", className: "event-first-last" },
    proposedStaar: { label: "Proposed STAAR Testing", className: "event-staar" }
  },
  gradingMarkerTypes: {
    gp6: { label: "6-Week Grading Periods", className: "event-gp6" },
    gp9: { label: "9-Week Grading Periods", className: "event-gp9" }
  },
  events: [],
  gradingMarkers: [],
  importantDates: DEFAULT_IMPORTANT_DATES.map((entry) => ({ ...entry }))
};

function createDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function parseISODate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function enumerateDateRange(startISO, endISO) {
  const dates = [];
  const cursor = parseISODate(startISO);
  const end = parseISODate(endISO);
  while (cursor <= end) {
    dates.push(createDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

function expandEventRules(rules) {
  const events = [];

  rules.forEach((rule) => {
    if (!rule || typeof rule !== "object") return;
    const { type, start, end, weekdaysOnly } = rule;
    if (!type || !start) return;
    const finalEnd = end || start;
    if (!CALENDAR_CONFIG.eventTypes[type]) return;

    const dateKeys = enumerateDateRange(start, finalEnd);
    dateKeys.forEach((dateKey) => {
      if (weekdaysOnly) {
        const day = parseISODate(dateKey).getDay();
        if (day === 0 || day === 6) return;
      }
      events.push({ date: dateKey, type });
    });
  });

  return events;
}

function sanitizeMarkers(markers) {
  return markers
    .filter(
      (marker) =>
        marker &&
        (marker.type === "gp6" || marker.type === "gp9") &&
        typeof marker.date === "string" &&
        (marker.side === "start" || marker.side === "end")
    )
    .map((marker) => ({ type: marker.type, date: marker.date, side: marker.side }));
}

function markersFromRanges(gradingRanges) {
  if (!gradingRanges || typeof gradingRanges !== "object") return [];
  const markers = [];

  ["gp6", "gp9"].forEach((type) => {
    const ranges = Array.isArray(gradingRanges[type]) ? gradingRanges[type] : [];
    ranges.forEach((range) => {
      if (!range || typeof range.start !== "string" || typeof range.end !== "string") return;
      if (!range.start || !range.end) return;
      markers.push({ type, date: range.start, side: "start" });
      markers.push({ type, date: range.end, side: "end" });
    });
  });

  return markers;
}

function sanitizeImportantDates(entries) {
  return entries
    .filter(
      (entry) =>
        entry && typeof entry.label === "string" && entry.label && typeof entry.dateText === "string"
    )
    .map((entry) => ({ label: entry.label, dateText: entry.dateText }));
}

function applyControlData(data) {
  if (!data || typeof data !== "object") return;

  if (typeof data.schoolYearLabel === "string" && data.schoolYearLabel.trim()) {
    CALENDAR_CONFIG.schoolYearLabel = data.schoolYearLabel.trim();
  }

  if (Number.isInteger(data.startYear)) {
    CALENDAR_CONFIG.startYear = data.startYear;
  }

  if (Number.isInteger(data.startMonth) && data.startMonth >= 0 && data.startMonth <= 11) {
    CALENDAR_CONFIG.startMonth = data.startMonth;
  }

  if (Number.isInteger(data.monthsToRender) && data.monthsToRender >= 1 && data.monthsToRender <= 24) {
    CALENDAR_CONFIG.monthsToRender = data.monthsToRender;
  }

  if (Array.isArray(data.eventRules)) {
    CALENDAR_CONFIG.events = expandEventRules(data.eventRules);
  } else if (Array.isArray(data.events)) {
    CALENDAR_CONFIG.events = data.events
      .filter((event) => event && typeof event.date === "string" && CALENDAR_CONFIG.eventTypes[event.type])
      .map((event) => ({ date: event.date, type: event.type }));
  }

  if (data.gradingRanges && typeof data.gradingRanges === "object") {
    CALENDAR_CONFIG.gradingMarkers = sanitizeMarkers(markersFromRanges(data.gradingRanges));
  } else if (Array.isArray(data.gradingMarkers)) {
    CALENDAR_CONFIG.gradingMarkers = sanitizeMarkers(data.gradingMarkers);
  }

  if (Array.isArray(data.importantDates)) {
    const cleaned = sanitizeImportantDates(data.importantDates);
    if (cleaned.length > 0) {
      CALENDAR_CONFIG.importantDates = cleaned;
    }
  }
}

async function loadSharedControls() {
  try {
    const response = await fetch(`${CONTROLS_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function seedDefaultData() {
  CALENDAR_CONFIG.events = expandEventRules(DEFAULT_EVENT_RULES);
  CALENDAR_CONFIG.gradingMarkers = DEFAULT_GRADING_MARKERS.map((marker) => ({ ...marker }));
}

function buildEventLookup(events) {
  return events.reduce((lookup, event) => {
    if (!lookup[event.date]) lookup[event.date] = [];
    lookup[event.date].push(event.type);
    return lookup;
  }, {});
}

function buildMarkerLookup(markers) {
  return markers.reduce((lookup, marker) => {
    if (!lookup[marker.date]) lookup[marker.date] = [];
    lookup[marker.date].push(marker);
    return lookup;
  }, {});
}

function getMarkerState(dayMarkers) {
  const state = {
    start: { gp6: false, gp9: false },
    end: { gp6: false, gp9: false }
  };

  dayMarkers.forEach((marker) => {
    if (!state[marker.side]) return;
    if (marker.type === "gp6" || marker.type === "gp9") {
      state[marker.side][marker.type] = true;
    }
  });

  return state;
}

function addBracket(dayCell, side, type, segment = "full") {
  const markerTag = document.createElement("span");
  markerTag.className = `day-bracket day-bracket-${side} day-bracket-${type} day-bracket-${segment}`;
  dayCell.appendChild(markerTag);
}

function weekHasOnlyWeekendMonthDays(weekCells) {
  const monthDays = weekCells.filter((cell) => cell.type === "day");
  if (monthDays.length === 0) return false;
  return monthDays.every((cell) => cell.weekday === 0 || cell.weekday === 6);
}

function renderCalendar() {
  const schoolYearLabel = document.getElementById("schoolYearLabel");
  const calendarGrid = document.getElementById("calendarGrid");
  const legend = document.getElementById("legend");
  const importantDates = document.getElementById("importantDates");

  schoolYearLabel.textContent = CALENDAR_CONFIG.schoolYearLabel;

  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
  const eventLookup = buildEventLookup(CALENDAR_CONFIG.events);
  const markerLookup = buildMarkerLookup(CALENDAR_CONFIG.gradingMarkers);

  for (let monthOffset = 0; monthOffset < CALENDAR_CONFIG.monthsToRender; monthOffset += 1) {
    const anchorDate = new Date(
      CALENDAR_CONFIG.startYear,
      CALENDAR_CONFIG.startMonth + monthOffset,
      1
    );
    const monthCard = document.createElement("article");
    monthCard.className = "month-card";

    const monthName = monthFormatter.format(anchorDate);
    const year = anchorDate.getFullYear();
    monthCard.innerHTML = `
      <header>
        <h3>${monthName}</h3>
        <p>${year}</p>
      </header>
      <ol class="weekday-row">
        <li>S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li><li>S</li>
      </ol>
      <ol class="days-grid"></ol>
    `;

    const daysGrid = monthCard.querySelector(".days-grid");
    const firstWeekday = anchorDate.getDay();
    const daysInMonth = new Date(year, anchorDate.getMonth() + 1, 0).getDate();
    const trailingDays = (7 - ((firstWeekday + daysInMonth) % 7)) % 7;
    const monthCells = [];

    for (let i = 0; i < firstWeekday; i += 1) {
      monthCells.push({ type: "spacer" });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dayDate = new Date(year, anchorDate.getMonth(), day);
      const key = createDateKey(dayDate);
      monthCells.push({ type: "day", day, key, weekday: dayDate.getDay() });
    }

    for (let i = 0; i < trailingDays; i += 1) {
      monthCells.push({ type: "spacer" });
    }

    const weeks = [];
    for (let i = 0; i < monthCells.length; i += 7) {
      weeks.push(monthCells.slice(i, i + 7));
    }

    if (weeks.length === 6) {
      if (weekHasOnlyWeekendMonthDays(weeks[0])) weeks.shift();
      if (weeks.length === 6 && weekHasOnlyWeekendMonthDays(weeks[weeks.length - 1])) weeks.pop();
    }

    weeks.flat().forEach((cell) => {
      if (cell.type === "spacer") {
        const spacer = document.createElement("li");
        spacer.className = "day-cell spacer";
        spacer.innerHTML = '<span class="day-dot" aria-hidden="true"></span>';
        daysGrid.appendChild(spacer);
        return;
      }

      const dayEvents = eventLookup[cell.key] || [];
      const dayMarkers = markerLookup[cell.key] || [];
      const dayCell = document.createElement("li");
      dayCell.className = "day-cell";
      if (cell.weekday === 0 || cell.weekday === 6) {
        dayCell.classList.add("day-weekend");
      }

      if (dayEvents.length > 0) {
        dayEvents.forEach((eventType) => {
          const eventClass = CALENDAR_CONFIG.eventTypes[eventType]?.className;
          if (eventClass) dayCell.classList.add(eventClass);
        });
      }

      if (dayEvents.includes("earlyRelease")) {
        dayCell.classList.add("day-cell-er");
        dayCell.innerHTML = '<span class="day-number er-label">ER</span>';
        dayCell.setAttribute("aria-label", `Early Release: ${cell.day}`);
      } else {
        dayCell.innerHTML = `<span class="day-number">${cell.day}</span>`;
      }

      const markerState = getMarkerState(dayMarkers);
      ["start", "end"].forEach((side) => {
        const hasGp6 = markerState[side].gp6;
        const hasGp9 = markerState[side].gp9;

        if (hasGp6 || hasGp9) dayCell.classList.add(`has-marker-${side}`);
        if (hasGp6 && hasGp9) {
          addBracket(dayCell, side, "gp6", "upper");
          addBracket(dayCell, side, "gp9", "lower");
        } else if (hasGp6) {
          addBracket(dayCell, side, "gp6");
        } else if (hasGp9) {
          addBracket(dayCell, side, "gp9");
        }
      });

      if (dayEvents.includes("firstLastDay")) {
        const frameTag = document.createElement("span");
        frameTag.className = "day-frame-first-last";
        dayCell.appendChild(frameTag);
      }

      daysGrid.appendChild(dayCell);
    });

    calendarGrid.appendChild(monthCard);
  }

  Object.values(CALENDAR_CONFIG.eventTypes).forEach((eventType) => {
    const item = document.createElement("span");
    item.className = "legend-item";
    const swatch = document.createElement("span");
    swatch.className = `legend-swatch ${eventType.className}`;
    if (eventType.className === "event-early-release") {
      swatch.classList.add("legend-swatch-er");
      swatch.textContent = "ER";
    }
    item.appendChild(swatch);
    item.append(` ${eventType.label}`);
    legend.appendChild(item);
  });

  Object.values(CALENDAR_CONFIG.gradingMarkerTypes).forEach((markerType) => {
    const item = document.createElement("span");
    item.className = "legend-item";
    const markerCell = document.createElement("span");
    markerCell.className = `legend-marker-cell legend-marker-${markerType.className}`;

    const start = document.createElement("span");
    start.className = "legend-marker-edge legend-marker-start";
    const end = document.createElement("span");
    end.className = "legend-marker-edge legend-marker-end";

    markerCell.appendChild(start);
    markerCell.appendChild(end);
    item.appendChild(markerCell);
    item.append(` ${markerType.label}`);
    legend.appendChild(item);
  });

  CALENDAR_CONFIG.importantDates.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${entry.label}</span><strong>${entry.dateText}</strong>`;
    importantDates.appendChild(li);
  });
}

seedDefaultData();
loadSharedControls()
  .then((data) => {
    applyControlData(data);
  })
  .finally(() => {
    renderCalendar();
  });
