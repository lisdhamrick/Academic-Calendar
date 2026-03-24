const STORAGE_KEY = "campusCalendarBuilderV1";

function $(id) {
  return document.getElementById(id);
}

function encodeBase64Url(text) {
  return btoa(unescape(encodeURIComponent(text))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
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

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCurrent() {
  const payload = {
    title: $("builderTitle").value.trim(),
    primary: $("builderPrimary").value,
    accent: $("builderAccent").value,
    daysAhead: Number($("builderDaysAhead").value || 120),
    apiKey: $("builderApiKey").value.trim(),
    googleEmbedUrl: extractEmbedUrl($("builderEmbedUrl").value)
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

function buildUrl(config) {
  const cfg = encodeBase64Url(JSON.stringify(config));
  const url = new URL("./campus-calendar.html", window.location.href);
  url.searchParams.set("cfg", cfg);
  return url.toString();
}

function generate() {
  const config = saveCurrent();
  const url = buildUrl(config);
  const iframe = `<iframe src="${url}" style="border:0;width:100%;height:1000px;" loading="lazy" title="${config.title}"></iframe>`;
  $("builderUrl").value = url;
  $("builderIframe").value = iframe;
  $("builderPreview").src = url;
}

function copyFrom(fieldId) {
  const field = $(fieldId);
  field.select();
  field.setSelectionRange(0, field.value.length);
  document.execCommand("copy");
}

function init() {
  const saved = loadSaved();
  if (saved.title) $("builderTitle").value = saved.title;
  if (saved.primary) $("builderPrimary").value = saved.primary;
  if (saved.accent) $("builderAccent").value = saved.accent;
  if (saved.daysAhead) $("builderDaysAhead").value = saved.daysAhead;
  if (saved.apiKey) $("builderApiKey").value = saved.apiKey;
  if (saved.googleEmbedUrl) $("builderEmbedUrl").value = saved.googleEmbedUrl;

  $("builderGenerate").addEventListener("click", generate);
  $("builderCopyUrl").addEventListener("click", () => copyFrom("builderUrl"));
  $("builderCopyIframe").addEventListener("click", () => copyFrom("builderIframe"));

  if (saved.googleEmbedUrl && saved.apiKey) generate();
}

init();
