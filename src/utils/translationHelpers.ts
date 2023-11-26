export const getCategoryTranslation = (value: string) => {
  switch (value) {
    case "Venue":
      return "Prostori";
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
