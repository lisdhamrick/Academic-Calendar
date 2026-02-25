const CALENDAR_CONFIG = {
  districtName: "Leander ISD",
  schoolYearLabel: "2026-2027",
  startYear: 2026,
  startMonth: 6, // July (0-indexed)
  monthsToRender: 12,
  eventTypes: {
    newTeacherTraining: { label: "New Teacher Training", className: "event-new-teacher" },
    teacherProfessionalLearning: {
      label: "Teacher Professional Learning",
      className: "event-teacher-pl"
    },
    studentStaffHoliday: { label: "Student / Staff Holiday", className: "event-holiday" },
    earlyRelease: { label: "Early Release", className: "event-early-release" },
    firstLastDay: { label: "First / Last Day of School", className: "event-first-last" }
  },
  gradingMarkerTypes: {
    gp6: { label: "6-Week Grading Periods", className: "event-gp6" },
    gp9: { label: "9-Week Grading Periods", className: "event-gp9" }
  },
  events: [],
  gradingMarkers: [],
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

function addEventRange(type, startISO, endISO = startISO) {
  const dateKeys = enumerateDateRange(startISO, endISO);
  dateKeys.forEach((dateKey) => CALENDAR_CONFIG.events.push({ date: dateKey, type }));
}

function addWeekdayEventRange(type, startISO, endISO = startISO) {
  const dateKeys = enumerateDateRange(startISO, endISO);
  dateKeys.forEach((dateKey) => {
    const date = parseISODate(dateKey);
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      CALENDAR_CONFIG.events.push({ date: dateKey, type });
    }
  });
}

function addGradingMarker(type, dateISO, side) {
  CALENDAR_CONFIG.gradingMarkers.push({ type, date: dateISO, side });
}

function seedDefaultEvents() {
  addEventRange("newTeacherTraining", "2026-08-03", "2026-08-03");
  addWeekdayEventRange("teacherProfessionalLearning", "2026-08-03", "2026-08-11");
  addEventRange("firstLastDay", "2026-08-12");
  addEventRange("studentStaffHoliday", "2026-09-07");
  addEventRange("teacherProfessionalLearning", "2026-09-21");
  addEventRange("teacherProfessionalLearning", "2026-10-09");
  addEventRange("studentStaffHoliday", "2026-10-12", "2026-10-13");
  addWeekdayEventRange("teacherProfessionalLearning", "2026-11-02", "2026-11-03");
  addWeekdayEventRange("studentStaffHoliday", "2026-11-23", "2026-11-27");
  addEventRange("earlyRelease", "2026-12-18");
  addWeekdayEventRange("studentStaffHoliday", "2026-12-21", "2026-12-31");
  addEventRange("studentStaffHoliday", "2027-01-01");
  addEventRange("teacherProfessionalLearning", "2027-01-04");
  addEventRange("studentStaffHoliday", "2027-01-18");
  addEventRange("teacherProfessionalLearning", "2027-02-12");
  addWeekdayEventRange("studentStaffHoliday", "2027-02-15", "2027-02-16");
  addWeekdayEventRange("studentStaffHoliday", "2027-03-15", "2027-03-19");
  addEventRange("studentStaffHoliday", "2027-03-26");
  addEventRange("teacherProfessionalLearning", "2027-03-29");
  addEventRange("teacherProfessionalLearning", "2027-04-26");
  addEventRange("earlyRelease", "2027-05-27");
  addEventRange("firstLastDay", "2027-05-27");

  // These are editable boundary markers used for the bracket-style grading period notation.
  addGradingMarker("gp6", "2026-09-28", "start");
  addGradingMarker("gp6", "2026-11-06", "end");
  addGradingMarker("gp6", "2026-11-09", "start");
  addGradingMarker("gp6", "2027-01-29", "end");
  addGradingMarker("gp6", "2027-02-01", "start");
  addGradingMarker("gp6", "2027-03-26", "end");
  addGradingMarker("gp6", "2027-03-29", "start");
  addGradingMarker("gp6", "2027-05-27", "end");

  addGradingMarker("gp9", "2026-08-12", "start");
  addGradingMarker("gp9", "2026-10-16", "end");
  addGradingMarker("gp9", "2026-10-19", "start");
  addGradingMarker("gp9", "2027-01-08", "end");
  addGradingMarker("gp9", "2027-01-11", "start");
  addGradingMarker("gp9", "2027-03-19", "end");
  addGradingMarker("gp9", "2027-03-22", "start");
  addGradingMarker("gp9", "2027-05-27", "end");
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

    for (let i = 0; i < firstWeekday; i += 1) {
      const spacer = document.createElement("li");
      spacer.className = "day-cell spacer";
      daysGrid.appendChild(spacer);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dayDate = new Date(year, anchorDate.getMonth(), day);
      const key = createDateKey(dayDate);
      const dayEvents = eventLookup[key] || [];
      const dayMarkers = markerLookup[key] || [];

      const dayCell = document.createElement("li");
      dayCell.className = "day-cell";
      if (dayEvents.length > 0) {
        dayEvents.forEach((eventType) => {
          const eventClass = CALENDAR_CONFIG.eventTypes[eventType]?.className;
          if (eventClass) dayCell.classList.add(eventClass);
        });
      }

      if (dayEvents.includes("earlyRelease")) {
        dayCell.classList.add("day-cell-er");
        dayCell.innerHTML = `<span class="day-number er-label">ER</span>`;
      } else {
        dayCell.innerHTML = `<span class="day-number">${day}</span>`;
      }

      if (dayEvents.includes("earlyRelease")) {
        dayCell.setAttribute("aria-label", `Early Release: ${day}`);
      }

      dayMarkers.forEach((marker) => {
        const markerTag = document.createElement("span");
        markerTag.className = `day-marker day-marker-${marker.type} day-marker-${marker.side}`;
        markerTag.textContent = marker.side === "start" ? "[" : "]";
        dayCell.appendChild(markerTag);
      });

      daysGrid.appendChild(dayCell);
    }

    calendarGrid.appendChild(monthCard);
  }

  Object.values(CALENDAR_CONFIG.eventTypes).forEach((eventType) => {
    const item = document.createElement("span");
    item.className = "legend-item";
    item.innerHTML = `<span class="legend-swatch ${eventType.className}"></span>${eventType.label}`;
    legend.appendChild(item);
  });

  Object.values(CALENDAR_CONFIG.gradingMarkerTypes).forEach((markerType) => {
    const item = document.createElement("span");
    item.className = "legend-item";
    item.innerHTML = `<span class="legend-bracket ${markerType.className}">[ ]</span>${markerType.label}`;
    legend.appendChild(item);
  });

  CALENDAR_CONFIG.importantDates.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${entry.label}</span><strong>${entry.dateText}</strong>`;
    importantDates.appendChild(li);
  });
}

seedDefaultEvents();
renderCalendar();
