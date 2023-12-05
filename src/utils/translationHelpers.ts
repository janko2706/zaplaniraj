export const getCategoryTranslation = (value: string) => {
  switch (value) {
    case "Venue":
      return "Prostori";
    case "Dresses":
      return "Haljine";
    case "Entertainment":
      return "Zabava";
    case "Flowers":
      return "Cvijece";
    case "Transport":
      return "Transport";
    case "Cakes":
      return "Torte";
    case "Music":
      return "Muzika";
    case "Catering":
      return "Katering";
    default:
      return "";
  }
};
export const getTranslationForRouter = (value: string) => {
  switch (value) {
    case "Vjencanja":
      return "wedding";
    case "Rodendani":
      return "birthday";
    case "Sakramenti":
      return "birthday";

    default:
      return "";
  }
};
export const getTranslationForStatistics = (value: string) => {
  switch (value) {
    case "Vjencanja":
      return "Weddings";
    case "Rodendani":
      return "Birthdays";
    case "Sakramenti":
      return "Sacraments";
    case "Poslovno":
      return "Business";
    case "Slavlja":
      return "Celebrations";

    default:
      return "";
  }
};
export const getCategoryTranslationBackToEnglish = (value: string) => {
  switch (value) {
    case "Haljine":
      return "Dresses";
    case "Prostori":
      return "Venue";
    case "Zabava":
      return "Entertainment";
    case "Cvijece":
      return "Flowers";
    case "Transport":
      return "Transport";
    case "Torte":
      return "Cakes";
    case "Muzika":
      return "Music";
    case "Katering":
      return "Catering";
    default:
      return "";
  }
};
export const getEventTypeTranslation = (value?: string) => {
  if (!value) {
    return "wedding";
  }
  switch (value) {
    case "VJENCANJE":
      return "wedding";
    case "RODENDAN":
      return "birthday";
    case "SAKRAMENT":
      return "sacrament";
    case "SLAVLJE":
      return "celebration";
    default:
      return "wedding";
  }
};
