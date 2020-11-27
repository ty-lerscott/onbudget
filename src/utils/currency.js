const toCurrency = (amount, withSymbol = true) =>
  isNaN(amount) || Array.isArray(amount)
    ? 0
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
        .format(amount)
        .substring(withSymbol ? 0 : 1)

export default toCurrency
