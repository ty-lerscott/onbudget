import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SkeletonText } from 'carbon-components-react'

import Card from 'components/Card/Card'

import toCurrency from 'utils/currency'
import { sumTransactions } from 'utils/transactions'

import './TransactionOverview.scss'

import { TransactionProps } from 'definitions'

const TransactionOverview = ({
  date,
  bills,
  deposits,
  dispatch,
  isLoading,
  unplanned,
  classNames,
  ...props
}) => {
  const billsTotal = sumTransactions(bills)
  const depositsTotal = sumTransactions(deposits)
  const unplannedTotal = sumTransactions(unplanned)

  const revenue = depositsTotal - unplannedTotal - billsTotal

  return (
    <Card
      small
      wrapped
      centered
      spaceBetween
      title='Transaction Overview'
      className={cn('TransactionOverview', classNames)}
      {...props}>
      <div className='overviewGroup'>
        <span
          className={cn('amount', {
            negative: revenue < 0,
            positive: revenue > 0
          })}>
          {/* TODO: MUST CALCULATE WITH BALANCE AT START OF MONTH */}
          {isLoading ? <SkeletonText /> : toCurrency(revenue)}
        </span>
        <span className='title'>Revenue</span>
      </div>
      <div className='overviewGroup'>
        <span className='amount'>
          {isLoading ? <SkeletonText /> : toCurrency(unplannedTotal)}
        </span>
        <span className='title'>Unplanned</span>
      </div>
      <div className='overviewGroup'>
        <span className='amount'>
          {isLoading ? <SkeletonText /> : toCurrency(billsTotal)}
        </span>
        <span className='title'>Bills</span>
      </div>
    </Card>
  )
}

TransactionOverview.propTypes = {
  dispatch: PropTypes.func,
  isLoading: PropTypes.bool,
  classNames: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  bills: PropTypes.arrayOf(TransactionProps),
  deposits: PropTypes.arrayOf(TransactionProps),
  unplanned: PropTypes.arrayOf(TransactionProps)
}

const mapStateToProps = state => ({
  isLoading: state.ui.dashboard.isLoading.transactionOverview
})

export default connect(mapStateToProps)(TransactionOverview)
