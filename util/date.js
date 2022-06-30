export function getFormattedDate(date) {
  // try {
  return date.toISOString().slice(0, 10);
  // } catch (error) {
  //   return date.toString();
  // }
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
