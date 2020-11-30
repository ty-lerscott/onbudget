const toCurrency = (amount, withSymbol = true) => {
  if (isNaN(amount) || Array.isArray(amount)) {
    return 0
  }

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)

  // if with symbol, leave it normal, else remove all non digit characters except for period
  return withSymbol ? currency : currency.replace(/\D(?<!\.)/g, '')
}

export default toCurrency
