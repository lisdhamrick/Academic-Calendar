const CONTROLS_URL = window.ACADEMIC_CALENDAR_CONTROLS_URL || "./calendar-controls.json";

const DEFAULT_EVENT_RULES = [
  { type: "newTeacherTraining", start: "2026-08-03", end: "2026-08-03", weekdaysOnly: true },
  {
    type: "teacherProfessionalLearning",
    start: "2026-08-03",
    end: "2026-08-11",
    weekdaysOnly: true
  },
  {
    type: "firstLastDay",
    start: "2026-08-12",
    end: "2026-08-12",
    weekdaysOnly: true,
    name: "First Day of School"
  },
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
  {
    type: "studentStaffHoliday",
    start: "2026-11-23",
    end: "2026-11-27",
    weekdaysOnly: true,
    name: "Fall Break"
  },
  {
    type: "earlyRelease",
    start: "2026-12-18",
    end: "2026-12-18",
    weekdaysOnly: true,
    name: "Early Release"
  },
  {
    type: "studentStaffHoliday",
    start: "2026-12-21",
    end: "2027-01-01",
    weekdaysOnly: true,
    name: "Winter Break"
  },
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
  {
    type: "studentStaffHoliday",
    start: "2027-03-15",
    end: "2027-03-19",
    weekdaysOnly: true,
    name: "Spring Break"
  },
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
  {
    type: "earlyRelease",
    start: "2027-05-27",
    end: "2027-05-27",
    weekdaysOnly: true,
    name: "Last Day of School / Early Release"
  },
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
  eventRules: DEFAULT_EVENT_RULES.map((rule) => ({ ...rule })),
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

function sanitizeEventRules(rules) {
  return rules
    .filter(
      (rule) =>
        rule &&
        typeof rule.type === "string" &&
        CALENDAR_CONFIG.eventTypes[rule.type] &&
        typeof rule.start === "string" &&
        rule.start
    )
    .map((rule) => ({
      type: rule.type,
      start: rule.start,
      end: typeof rule.end === "string" && rule.end ? rule.end : rule.start,
      weekdaysOnly: Boolean(rule.weekdaysOnly),
      name: typeof rule.name === "string" ? rule.name.trim() : ""
    }));
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
    .map((entry) => {
      const cleaned = { label: entry.label, dateText: entry.dateText };
      if (typeof entry.start === "string" && entry.start) cleaned.start = entry.start;
      if (typeof entry.end === "string" && entry.end) cleaned.end = entry.end;
      return cleaned;
    });
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
    CALENDAR_CONFIG.eventRules = sanitizeEventRules(data.eventRules);
    CALENDAR_CONFIG.events = expandEventRules(CALENDAR_CONFIG.eventRules);
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
  CALENDAR_CONFIG.eventRules = sanitizeEventRules(DEFAULT_EVENT_RULES);
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

const MONTH_INDEX = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

function normalizeMonthToken(monthToken) {
  return monthToken.toLowerCase().replace(/\./g, "");
}

function inferSchoolYearForMonth(monthIndex) {
  return monthIndex < CALENDAR_CONFIG.startMonth ? CALENDAR_CONFIG.startYear + 1 : CALENDAR_CONFIG.startYear;
}

function parseMonthDayYear(part) {
  const match = part.match(/([A-Za-z]{3,9})\.?\s*(\d{1,2})(?:,\s*(\d{4}))?/);
  if (!match) return null;
  const month = MONTH_INDEX[normalizeMonthToken(match[1])];
  if (month === undefined) return null;
  const day = Number(match[2]);
  const year = match[3] ? Number(match[3]) : null;
  if (!Number.isInteger(day) || day < 1 || day > 31) return null;
  return { month, day, year };
}

function parseImportantDateRange(entry) {
  if (entry.start) {
    return { start: entry.start, end: entry.end || entry.start };
  }

  const text = entry.dateText.replace(/[–—]/g, "-").trim();
  if (!text.includes("-")) {
    const single = parseMonthDayYear(text);
    if (!single) return null;
    const year = single.year ?? inferSchoolYearForMonth(single.month);
    const iso = createDateKey(new Date(year, single.month, single.day));
    return { start: iso, end: iso };
  }

  const parts = text.split("-");
  if (parts.length < 2) return null;

  const leftPart = parts[0].trim();
  const rightPart = parts.slice(1).join("-").trim();

  const left = parseMonthDayYear(leftPart);
  if (!left) return null;

  let right = parseMonthDayYear(rightPart);
  if (!right) {
    const rightDayMatch = rightPart.match(/^(\d{1,2})(?:,\s*(\d{4}))?$/);
    if (!rightDayMatch) return null;
    right = {
      month: left.month,
      day: Number(rightDayMatch[1]),
      year: rightDayMatch[2] ? Number(rightDayMatch[2]) : null
    };
  }

  let leftYear = left.year ?? inferSchoolYearForMonth(left.month);
  let rightYear = right.year;

  if (!rightYear) {
    if (right.month < left.month) {
      rightYear = leftYear + 1;
    } else {
      rightYear = leftYear;
    }
  }

  const start = createDateKey(new Date(leftYear, left.month, left.day));
  const end = createDateKey(new Date(rightYear, right.month, right.day));
  return start <= end ? { start, end } : { start: end, end: start };
}

function enrichAndSortImportantDates(entries) {
  const enriched = entries
    .map((entry, index) => {
      const parsedRange = parseImportantDateRange(entry);
      const start = parsedRange?.start || "";
      const end = parsedRange?.end || start;
      return { ...entry, start, end, index };
    })
    .sort((a, b) => {
      if (a.start && b.start) return a.start.localeCompare(b.start) || a.index - b.index;
      if (a.start) return -1;
      if (b.start) return 1;
      return a.index - b.index;
    });

  return enriched;
}

function createCalendarTooltip() {
  const existing = document.getElementById("calendarTooltip");
  if (existing) return existing;

  const tooltip = document.createElement("div");
  tooltip.id = "calendarTooltip";
  tooltip.className = "calendar-tooltip";
  tooltip.setAttribute("role", "tooltip");
  document.body.appendChild(tooltip);
  return tooltip;
}

function positionTooltip(tooltip, anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const spacing = 10;
  let top = rect.top + window.scrollY - tooltipRect.height - spacing;
  let placement = "top";
  if (top < window.scrollY + 8) {
    top = rect.bottom + window.scrollY + spacing;
    placement = "bottom";
  }
  let left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
  left = Math.max(window.scrollX + 8, Math.min(left, window.scrollX + window.innerWidth - tooltipRect.width - 8));
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.dataset.placement = placement;
}

function showTooltip(tooltip, anchorEl, lines, accentColor = "#ffc000") {
  if (!lines || lines.length === 0) return;
  tooltip.innerHTML = lines.map((line) => `<div>${line}</div>`).join("");
  tooltip.style.setProperty("--tooltip-accent", accentColor);
  tooltip.classList.add("is-visible");
  positionTooltip(tooltip, anchorEl);
}

function hideTooltip(tooltip) {
  tooltip.classList.remove("is-visible");
}

function formatPanelDateRange(startISO, endISO) {
  const start = parseISODate(startISO);
  const end = parseISODate(endISO);
  const shortMonth = new Intl.DateTimeFormat("en-US", { month: "short" });
  const sMonth = `${shortMonth.format(start)}.`;
  const eMonth = `${shortMonth.format(end)}.`;
  const sDay = start.getDate();
  const eDay = end.getDate();
  const sYear = start.getFullYear();
  const eYear = end.getFullYear();

  if (startISO === endISO) return `${sMonth} ${sDay}, ${sYear}`;
  if (sYear === eYear && start.getMonth() === end.getMonth()) {
    return `${sMonth} ${sDay}-${eDay}, ${sYear}`;
  }
  if (sYear === eYear) {
    return `${sMonth} ${sDay}-${eMonth} ${eDay}, ${sYear}`;
  }
  return `${sMonth} ${sDay}, ${sYear}-${eMonth} ${eDay}, ${eYear}`;
}

function isWeekendISO(isoDate) {
  const day = parseISODate(isoDate).getDay();
  return day === 0 || day === 6;
}

function resolveAccentColorForType(type) {
  const rootStyles = getComputedStyle(document.documentElement);
  const varByType = {
    newTeacherTraining: "--new-teacher",
    teacherProfessionalLearning: "--staff-dev",
    studentStaffHoliday: "--holiday",
    earlyRelease: "--gold",
    firstLastDay: "--first-last",
    proposedStaar: "--staar"
  };
  const varName = varByType[type];
  if (varName) {
    const resolved = rootStyles.getPropertyValue(varName).trim();
    if (resolved) return resolved;
  }
  return "#ffc000";
}

function buildNamedImportantFromEventRules(rules) {
  const entries = [];
  rules.forEach((rule, index) => {
    const name = typeof rule.name === "string" ? rule.name.trim() : "";
    if (!name || !rule.start) return;
    const start = rule.start;
    const end = rule.end || rule.start;
    entries.push({
      id: `ev-${index}`,
      label: name,
      dateText: formatPanelDateRange(start, end),
      start,
      end,
      type: rule.type,
      accentColor: resolveAccentColorForType(rule.type)
    });
  });

  entries.sort((a, b) => a.start.localeCompare(b.start));
  return entries;
}

function buildFallbackImportantEntries(entries) {
  return enrichAndSortImportantDates(entries)
    .filter((entry) => entry.start)
    .map((entry, index) => ({
      id: `imp-${index}`,
      label: entry.label,
      dateText: entry.dateText,
      start: entry.start,
      end: entry.end,
      accentColor: "#ffc000"
    }));
}

function getCellVisualData(cell, eventLookup, markerLookup) {
  if (!cell || cell.type !== "day") return { hasVisual: false, signature: "" };
  const dayEvents = eventLookup[cell.key] || [];
  const dayMarkers = markerLookup[cell.key] || [];
  const eventSignature = dayEvents.slice().sort().join("|");
  const markerSignature = dayMarkers
    .map((marker) => `${marker.type}:${marker.side}`)
    .sort()
    .join("|");

  return {
    hasVisual: dayEvents.length > 0 || dayMarkers.length > 0,
    signature: `e:${eventSignature};m:${markerSignature}`
  };
}

function shouldSplitBetweenCells(leftCell, rightCell, eventLookup, markerLookup) {
  const left = getCellVisualData(leftCell, eventLookup, markerLookup);
  const right = getCellVisualData(rightCell, eventLookup, markerLookup);
  return left.hasVisual && right.hasVisual && left.signature !== right.signature;
}

function renderCalendar() {
  const schoolYearLabel = document.getElementById("schoolYearLabel");
  const calendarGrid = document.getElementById("calendarGrid");
  const legend = document.getElementById("legend");
  const importantDates = document.getElementById("importantDates");
  const tooltip = createCalendarTooltip();

  calendarGrid.innerHTML = "";
  legend.innerHTML = "";
  importantDates.innerHTML = "";

  schoolYearLabel.textContent = CALENDAR_CONFIG.schoolYearLabel;

  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
  const eventLookup = buildEventLookup(CALENDAR_CONFIG.events);
  const markerLookup = buildMarkerLookup(CALENDAR_CONFIG.gradingMarkers);
  const namedImportant = buildNamedImportantFromEventRules(CALENDAR_CONFIG.eventRules);
  const importantEntries =
    namedImportant.length > 0 ? namedImportant : buildFallbackImportantEntries(CALENDAR_CONFIG.importantDates);
  const dayCellMap = new Map();

  const importantById = new Map();
  const dateToImportantIds = new Map();
  importantEntries.forEach((entry) => {
    const allDates = enumerateDateRange(entry.start, entry.end);
    const highlightDates = allDates.filter(
      (dateKey) => !isWeekendISO(dateKey) && (eventLookup[dateKey] || []).length > 0
    );
    const enriched = { ...entry, highlightDates };
    importantById.set(entry.id, enriched);
    highlightDates.forEach((dateKey) => {
      if (!dateToImportantIds.has(dateKey)) dateToImportantIds.set(dateKey, []);
      dateToImportantIds.get(dateKey).push(entry.id);
    });
  });

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
        <li><span class="weekday-label">S</span></li>
        <li><span class="weekday-label">M</span></li>
        <li><span class="weekday-label">T</span></li>
        <li><span class="weekday-label">W</span></li>
        <li><span class="weekday-label">T</span></li>
        <li><span class="weekday-label">F</span></li>
        <li><span class="weekday-label">S</span></li>
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

    weeks.forEach((week) => {
      week.forEach((cell, dayIndex) => {
        if (cell.type === "spacer") {
          const spacer = document.createElement("li");
          spacer.className = "day-cell spacer";
          spacer.innerHTML = '<span class="day-glyph" aria-hidden="true"><span class="day-dot"></span></span>';
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
          dayCell.innerHTML = '<span class="day-glyph"><span class="day-number er-label">ER</span></span>';
          dayCell.setAttribute("aria-label", `Early Release: ${cell.day}`);
        } else {
          dayCell.innerHTML = `<span class="day-glyph"><span class="day-number">${cell.day}</span></span>`;
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

        dayCell.dataset.date = cell.key;

        const nextCell = dayIndex < 6 ? week[dayIndex + 1] : null;
        if (shouldSplitBetweenCells(cell, nextCell, eventLookup, markerLookup)) {
          dayCell.classList.add("split-right");
        }

        daysGrid.appendChild(dayCell);
        if (!dayCellMap.has(cell.key)) dayCellMap.set(cell.key, []);
        dayCellMap.get(cell.key).push(dayCell);
      });
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

  importantEntries.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "important-date-item";
    li.dataset.importantId = entry.id;
    if (entry.accentColor) li.style.setProperty("--item-accent", entry.accentColor);
    if (entry.start) li.dataset.start = entry.start;
    if (entry.end) li.dataset.end = entry.end || entry.start;
    li.innerHTML = `<strong>${entry.dateText}</strong><span>${entry.label}</span>`;
    importantDates.appendChild(li);
  });

  const importantItems = Array.from(importantDates.querySelectorAll(".important-date-item"));

  function clearHighlights() {
    dayCellMap.forEach((cells) => cells.forEach((el) => el.classList.remove("is-related-highlight")));
    importantItems.forEach((item) => item.classList.remove("is-related-highlight"));
  }

  function highlightImportantEntry(entry) {
    if (!entry) return;
    entry.highlightDates.forEach((dateKey) => {
      const cells = dayCellMap.get(dateKey);
      if (cells) cells.forEach((cell) => cell.classList.add("is-related-highlight"));
    });
  }

  dayCellMap.forEach((cells, dateKey) => {
    const relatedIds = dateToImportantIds.get(dateKey) || [];
    if (relatedIds.length === 0) return;

    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", () => {
        clearHighlights();
        const matches = relatedIds
          .map((id) => importantById.get(id))
          .filter(Boolean);

        matches.forEach((entry) => {
          highlightImportantEntry(entry);
          const matchItem = importantItems.find(
            (item) => item.dataset.importantId === entry.id
          );
          if (matchItem) matchItem.classList.add("is-related-highlight");
        });

        if (matches.length === 1) {
          showTooltip(tooltip, cell, [matches[0].label, matches[0].dateText], matches[0].accentColor);
        } else if (matches.length > 1) {
          const lines = matches.flatMap((entry) => [entry.label, entry.dateText]);
          showTooltip(tooltip, cell, lines, "#ffc000");
        }
      });

      cell.addEventListener("mouseleave", () => {
        clearHighlights();
        hideTooltip(tooltip);
      });
    });
  });

  importantItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      clearHighlights();
      item.classList.add("is-related-highlight");
      const entry = importantById.get(item.dataset.importantId || "");
      if (!entry) return;

      highlightImportantEntry(entry);
      const firstDate = entry.highlightDates[0];
      const firstMatch = firstDate ? dayCellMap.get(firstDate)?.[0] : null;
      if (firstMatch) showTooltip(tooltip, firstMatch, [entry.label, entry.dateText], entry.accentColor);
    });

    item.addEventListener("mouseleave", () => {
      clearHighlights();
      hideTooltip(tooltip);
    });
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
