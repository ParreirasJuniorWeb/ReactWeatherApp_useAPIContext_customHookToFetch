export const formatWeekDate = (dateInput) => {
  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const date = new Date(dateInput);
  return isNaN(date) ? null : daysOfWeek[date.getDay()];
};