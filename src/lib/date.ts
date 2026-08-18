export function parseISODate(value: string): Date {
  const datePart = value.split('T')[0]
  const [year, month, day] = datePart.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDateShort(value: string | Date): string {
  const date = typeof value === 'string' ? parseISODate(value) : value
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

export function formatDateLong(value: string | Date): string {
  const date = typeof value === 'string' ? parseISODate(value) : value
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}