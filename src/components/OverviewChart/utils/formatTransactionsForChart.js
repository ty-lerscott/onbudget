const getCategory = (categories, id) =>
	(categories || []).find(category => category.id === id)

// given an array of transactions, group them by category
// return them as an array sorted by the total spent in that category
const formatTransactionsForChart = (transactions, categories) => {
	if (!transactions.length || !categories.length) {
		return []
	}

	const transactionsForThisMonth = transactions.reduce(
		(byCategory, transaction) => {
			const { categoryId } = transaction

			const category = getCategory(categories, categoryId)

			if (!byCategory[category.name]) {
				byCategory[category.name] = {
					total: 0,
					color: category.color
				}
			}

			byCategory[category.name].total += transaction.amount

			return byCategory
		},
		{}
	)

	const entries = Object.entries(transactionsForThisMonth)

	entries.sort((a, b) => b[1].total - a[1].total)

	return {
		datasets: [
			{
				data: entries.map(([key, value]) => value.total),
				backgroundColor: entries.map(([key, value]) => value.color)
			}
		],
		labels: entries.map(([key]) => key)
	}
}

export default formatTransactionsForChart
