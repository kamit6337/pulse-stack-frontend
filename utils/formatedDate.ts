const formatedDate = (unformDate: Date): string => {
  if (!unformDate) return "";

  const date = new Date(unformDate);

  const formatted = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted;
};

export default formatedDate;
