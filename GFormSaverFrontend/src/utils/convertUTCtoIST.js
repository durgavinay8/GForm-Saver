export const convertUTCtoIST = (utcDateString) => {
  return new Date(utcDateString).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
