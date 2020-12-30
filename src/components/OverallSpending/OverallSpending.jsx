import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SkeletonText } from 'carbon-components-react'

import toCurrency from 'utils/currency'
import { sumTransactions } from 'utils/transactions'

import Card from 'components/Card/Card'

import { TransactionProps } from 'definitions'

import './OverallSpending.scss'

const OverallSpending = ({
  dispatch,
  isLoading,
  classNames,
  transactions,
  ...props
}) => {
  const total = sumTransactions(transactions)

  return (
    <Card
      small
      wrapped
      centered
      title='Overall Spending'
      data-testid='OverallSpending'
      className={cn('OverallSpending', classNames)}
      {...props}>
      <div
        className={cn('amount', { isLoading })}
        aria-label='Overall Spending Amount'>
        {isLoading ? (
          <SkeletonText data-testid='OverallSpendingSkeleton' />
        ) : (
          toCurrency(total)
        )}
      </div>
    </Card>
  )
}

OverallSpending.propTypes = {
  dispatch: PropTypes.func, //TODO: why is this being passed to the component?
  isLoading: PropTypes.bool,
  classNames: PropTypes.string,
  transactions: PropTypes.arrayOf(TransactionProps)
}

const mapStateToProps = state => ({
  isLoading: state.ui.dashboard.isLoading.overallSpending
})

export default connect(mapStateToProps)(OverallSpending)
