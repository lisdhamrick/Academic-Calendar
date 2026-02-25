# Embeddable Academic Calendar

This project is a responsive, data-driven academic calendar designed for web embedding.

## Quick Start

1. Open `index.html` in a browser.
2. Edit `app.js` to update school year text and event dates.

## Where to Customize

- School year label: `CALENDAR_CONFIG.schoolYearLabel`
- Calendar span: `startYear`, `startMonth`, `monthsToRender`
- Important dates panel: `CALENDAR_CONFIG.importantDates`
- Highlighted days and ranges: `seedDefaultEvents()` calls
- Event labels and styles: `CALENDAR_CONFIG.eventTypes` + matching CSS classes in `styles.css`

## Embed Example (iframe)

```html
<iframe
  src="https://your-domain.example/academic-calendar/index.html"
  title="Leander ISD Academic Calendar"
  loading="lazy"
  style="width:100%; min-height:1300px; border:0;"
></iframe>
```

For smaller breakpoints, the calendar automatically collapses to 3, 2, and 1 column layouts.
