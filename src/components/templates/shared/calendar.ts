import { Invitation } from '../../../types';

/**
 * "Add to calendar" helpers for the RSVP confirmation step.
 * Both use floating local times — the event happens at the venue's wall-clock
 * time regardless of the guest's timezone.
 */

const EVENT_DURATION_HOURS = 4;

/** yyyy-MM-ddTHH:mm → YYYYMMDDTHHMMSS (calendar-format local timestamp). */
function toCalendarStamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  );
}

function eventRange(invitation: Invitation): { start: string; end: string } | null {
  const start = new Date(invitation.date);
  if (Number.isNaN(start.getTime())) return null;
  const end = new Date(start.getTime() + EVENT_DURATION_HOURS * 60 * 60 * 1000);
  return { start: toCalendarStamp(start), end: toCalendarStamp(end) };
}

function eventTitle(invitation: Invitation): string {
  return invitation.names ? `${invitation.names} — Davet` : 'Davet';
}

/** Prefilled Google Calendar "create event" link. */
export function googleCalendarUrl(invitation: Invitation): string | null {
  const range = eventRange(invitation);
  if (!range) return null;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle(invitation),
    dates: `${range.start}/${range.end}`,
    details: invitation.subtitle,
    location: invitation.venue
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Build and download an .ics file — the universal path for Apple Calendar,
 * Outlook and every other RFC 5545 client.
 */
export function downloadIcsFile(invitation: Invitation): void {
  const range = eventRange(invitation);
  if (!range) return;

  const escapeText = (value: string) => value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DavetKart//Invitation//TR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:davetkart-${Date.now()}@davetkart.app`,
    `DTSTAMP:${toCalendarStamp(new Date())}`,
    `DTSTART:${range.start}`,
    `DTEND:${range.end}`,
    `SUMMARY:${escapeText(eventTitle(invitation))}`,
    `DESCRIPTION:${escapeText(invitation.subtitle)}`,
    `LOCATION:${escapeText(invitation.venue)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'davet.ics';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
