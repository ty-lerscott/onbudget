import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SkeletonText } from 'carbon-components-react'

import Card from 'components/Card/Card'

import toCurrency from 'utils/currency'
import calculateSpending from './utils/calculateSpending'

import { TransactionProps } from 'definitions'

import './AverageDailySpending.scss'

const AverageDailySpending = ({ unplanned, isLoading, ...props }) => {
  const total = calculateSpending(unplanned)

  return (
    <Card
      small
      wrapped
      centered
      title='Average Daily Spending'
      className='AverageDailySpending'
      data-testid='AverageDailySpending'
      {...props}>
      <div
        aria-label='Average daily spending amount'
        className={cn('amount', { isLoading })}>
        {isLoading ? (
          <SkeletonText data-testid='AverageDailySpendingSkeleton' />
        ) : (
          toCurrency(total)
        )}
      </div>
    </Card>
  )
}

AverageDailySpending.propTypes = {
  isLoading: PropTypes.bool,
  unplanned: PropTypes.arrayOf(TransactionProps)
}

const mapStateToProps = state => ({
  isLoading: state.ui.dashboard.isLoading.averageDailySpending
})

export default connect(mapStateToProps)(AverageDailySpending)
