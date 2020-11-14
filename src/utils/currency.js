const toCurrency = (amount) =>
  isNaN(amount) || Array.isArray(amount)
    ? 0
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

export default toCurrency;
