export function makeGoogleCalendarLink(opts: {
  title: string;
  details: string;
  startISO: string; // ex: 20261224T000000
  endISO: string;   // ex: 20261224T020000
}) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: opts.title,
    details: opts.details,
    dates: `${opts.startISO}/${opts.endISO}`,
  });
  return `${base}&${params.toString()}`;
}
