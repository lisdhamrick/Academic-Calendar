const DEFAULT_CONFIG = {
  title: "Campus Calendar",
  primary: "#005987",
  accent: "#ffc000",
  daysAhead: 120,
  googleEmbedUrl: "",
  apiKey: ""
};

const state = {
  config: null,
  calendars: [],
  events: [],
  visibleSources: new Set()
};

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return atob(normalized + padding);
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function loadConfig() {
  const params = new URLSearchParams(window.location.search);
  const rawCfg = params.get("cfg");
  if (!rawCfg) return { ...DEFAULT_CONFIG };
  const decoded = safeJsonParse(decodeBase64Url(rawCfg));
  return decoded ? { ...DEFAULT_CONFIG, ...decoded } : { ...DEFAULT_CONFIG };
}

function extractEmbedUrl(raw) {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (trimmed.startsWith("<iframe")) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    return match ? match[1] : "";
  }
  return trimmed;
}

function decodeCalendarSource(value) {
  try {
    const decoded = decodeBase64Url(value);
    return decoded.includes("@") ? decoded : value;
  } catch {
    return value;
  }
}

function parseGoogleEmbed(embedUrl) {
  const parsed = new URL(extractEmbedUrl(embedUrl));
  const params = parsed.searchParams;
  const srcValues = params.getAll("src");
  const colors = params.getAll("color");
  return srcValues.map((src, index) => ({
    id: decodeCalendarSource(src),
    color: colors[index] || colors[0] || "#616161",
    label: decodeCalendarSource(src).split("@")[0].replace(/_/g, " ")
  }));
}

function setTheme(config) {
  document.documentElement.style.setProperty("--campus-primary", config.primary);
  document.documentElement.style.setProperty("--campus-accent", config.accent);
  const title = document.getElementById("campusTitle");
  if (title) title.textContent = config.title;
  document.title = config.title;
  const range = document.getElementById("campusRangeLabel");
  if (range) range.textContent = `Next ${config.daysAhead} days`;
}

function formatDateHeading(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(date);
}

function formatDateAccent(date) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date);
}

function formatEventTime(start, end, allDay) {
  if (allDay) return "All day";
  const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
  if (!end) return fmt.format(start);
  return `${fmt.format(start)} - ${fmt.format(end)}`;
}

function normalizeEvent(item, source) {
  const start = item.start?.dateTime || item.start?.date;
  const end = item.end?.dateTime || item.end?.date;
  if (!start) return null;
  const allDay = Boolean(item.start?.date && !item.start?.dateTime);
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  return {
    id: item.id,
    title: item.summary || "Untitled event",
    start: startDate,
    end: endDate,
    allDay,
    sourceId: source.id,
    sourceLabel: source.label,
    sourceColor: source.color,
    location: item.location || ""
  };
}

async function fetchCalendarEvents(source, config) {
  const timeMin = new Date();
  const timeMax = new Date();
  timeMax.setDate(timeMax.getDate() + Number(config.daysAhead || 120));
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(source.id)}/events`);
  url.searchParams.set("key", config.apiKey);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("timeMin", timeMin.toISOString());
  url.searchParams.set("timeMax", timeMax.toISOString());
  url.searchParams.set("maxResults", "250");

  const response = await fetch(url.toString());
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Calendar API error (${response.status}): ${text.slice(0, 140)}`);
  }
  const data = await response.json();
  return (data.items || []).map((item) => normalizeEvent(item, source)).filter(Boolean);
}

function setStatus(message, isError = false) {
  const status = document.getElementById("campusStatus");
  if (!status) return;
  status.hidden = !message;
  status.textContent = message;
  status.classList.toggle("is-error", isError);
}

function renderFilters() {
  const container = document.getElementById("sourceFilters");
  const toolbar = document.getElementById("campusToolbar");
  if (!container || !toolbar) return;

  container.innerHTML = "";
  if (state.calendars.length <= 1) {
    toolbar.hidden = true;
    return;
  }

  toolbar.hidden = false;
  state.calendars.forEach((source) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    if (!state.visibleSources.has(source.id)) button.classList.add("is-off");
    button.dataset.sourceId = source.id;
    button.setAttribute("aria-pressed", state.visibleSources.has(source.id) ? "true" : "false");

    const swatch = document.createElement("span");
    swatch.className = "filter-swatch";
    swatch.style.background = source.color;

    const label = document.createElement("span");
    label.textContent = source.label;

    button.append(swatch, label);
    container.appendChild(button);
  });

  container.onclick = (event) => {
    const button = event.target.closest(".filter-chip");
    if (!(button instanceof HTMLButtonElement)) return;
    const sourceId = button.dataset.sourceId;
    if (!sourceId) return;
    if (state.visibleSources.has(sourceId)) {
      state.visibleSources.delete(sourceId);
    } else {
      state.visibleSources.add(sourceId);
    }
    renderFilters();
    renderEvents();
  };
}

function renderEvents() {
  const groups = document.getElementById("campusGroups");
  if (!groups) return;
  groups.innerHTML = "";

  const visibleEvents = state.events.filter((event) => state.visibleSources.has(event.sourceId));
  if (visibleEvents.length === 0) {
    groups.innerHTML = '<div class="empty-state">No events found for the current filters.</div>';
    return;
  }

  const grouped = new Map();
  visibleEvents.forEach((event) => {
    const key = event.start.toISOString().slice(0, 10);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(event);
  });

  Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, items]) => {
      const date = new Date(`${key}T00:00:00`);
      const section = document.createElement("section");
      section.className = "date-group";

      const head = document.createElement("div");
      head.className = "date-group-head";
      head.innerHTML = `<h2>${formatDateHeading(date)}</h2><p>${formatDateAccent(date)}</p>`;

      const rule = document.createElement("div");
      rule.className = "date-rule";

      const list = document.createElement("div");
      list.className = "event-list";

      items
        .sort((a, b) => a.start - b.start)
        .forEach((event) => {
          const card = document.createElement("article");
          card.className = "event-card";
          card.innerHTML = `
            <div class="event-time">${formatEventTime(event.start, event.end, event.allDay)}</div>
            <div class="event-main">
              <p class="event-title">${event.title}</p>
              <div class="event-meta">
                <span class="event-source">
                  <span class="event-source-dot" style="background:${event.sourceColor}"></span>
                  ${event.sourceLabel}
                </span>
                ${event.location ? `<span class="event-location">${event.location}</span>` : ""}
              </div>
            </div>
          `;
          list.appendChild(card);
        });

      section.append(head, rule, list);
      groups.appendChild(section);
    });
}

async function init() {
  const config = loadConfig();
  state.config = config;
  setTheme(config);

  if (!config.googleEmbedUrl || !config.apiKey) {
    setStatus("Add a builder-generated config URL with a public Google Calendar embed URL and API key.", true);
    return;
  }

  try {
    state.calendars = parseGoogleEmbed(config.googleEmbedUrl);
    state.visibleSources = new Set(state.calendars.map((source) => source.id));
    const results = await Promise.all(state.calendars.map((source) => fetchCalendarEvents(source, config)));
    state.events = results.flat();
    setStatus("");
    renderFilters();
    renderEvents();
  } catch (error) {
    setStatus(error.message || "Unable to load campus calendar events.", true);
  }
}

init();
