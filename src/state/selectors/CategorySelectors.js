import { createSelector } from 'reselect'

export const getCategoriesFromState = state => state.app.categories

export const getBillCategories = createSelector(
	[getCategoriesFromState],
	categories => categories.filter(({ isBill }) => isBill)
)

export const getDepositCategories = createSelector(
	[getCategoriesFromState],
	categories => categories.filter(({ isDeposit }) => isDeposit)
)

export const getUnplannedCategories = createSelector(
	[getCategoriesFromState],
	categories =>
		categories.filter(({ isBill, isDeposit }) => !isDeposit && !isBill)
)
