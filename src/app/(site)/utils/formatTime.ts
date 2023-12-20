export function formatTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate.replace(',', '').replace(/(\d+) (\w+) (\d+) (\d+:\d+)/, '$1. $2 $3 $4');
}
