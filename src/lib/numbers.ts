export const formatPrice = (price?: number): string | null => {
  return price
    ? new Intl.NumberFormat("nb-NO", {
        style: "currency",
        currency: "NOK",
      }).format(price)
    : "Ingen pris oppgitt";
};
