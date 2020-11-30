const toCurrency = (amount, withSymbol = true) => {
  if (isNaN(amount) || Array.isArray(amount)) {
    return 0
  }

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

  return withSymbol ? currency.substring(0).replace(',', '') : currency
}

export default toCurrency
