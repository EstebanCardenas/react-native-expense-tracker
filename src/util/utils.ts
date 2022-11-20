export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function generateRandomId(): string {
  return `${(Date.now() + Math.floor(Math.random() * 11))}`;
}
