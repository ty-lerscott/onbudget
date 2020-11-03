// export default (amount) =>
//   !amount ? 0 : Math.round((amount + Number.EPSILON) * 100) / 100;

export default (amount) =>
  isNaN(amount)
    ? 0
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

export const asNumber = (amount) => (!amount ? 0 : Number(amount.substr(1)));
