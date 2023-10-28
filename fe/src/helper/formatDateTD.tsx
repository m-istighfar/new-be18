const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long", // long format for day
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default formattedDate;
