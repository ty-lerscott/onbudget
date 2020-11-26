import React from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import toCurrency from 'utils/currency'

import {
  Table,
  TableRow,
  TableBody,
  DataTable,
  TableCell,
  TableHead,
  TableHeader,
  OverflowMenu,
  TableToolbar,
  TableContainer,
  OverflowMenuItem,
  DataTableSkeleton,
  TableToolbarContent
} from 'carbon-components-react'
import Page from 'components/Page/Page'
import Card from 'components/Card/Card'
import MonthDisplay from 'components/MonthDisplay/MonthDisplay'
import { EditTransactionModal } from 'components/Forms/Transaction'
import DeleteTransactionModal from 'components/Modals/DeleteTransaction/DeleteTransaction'

import './styles.scss'

const handleFormatCell = cell => {
  switch (cell.info.header) {
    case 'date':
      return format(cell.value, 'MM/dd/yyyy')
    case 'amount':
      return toCurrency(cell.value)
    default:
      return cell.value
  }
}

const TransactionHistory = ({
  children,
  transactions,
  onEditTransaction,
  onDeleteTransaction
}) => {
  return (
    <Page name='TransactionHistory'>
      <Card infinite>
        <div
          className='TransactionHistoryTable'
          data-testid={
            !!transactions
              ? 'TransactionHistoryTable'
              : 'TransactionHistoryTable-loading'
          }>
          {!!transactions ? (
            <>
              <DeleteTransactionModal />
              <EditTransactionModal />

              <DataTable
                rows={transactions}
                headers={[].concat(
                  transactions?.length
                    ? [
                        { header: 'Date', key: 'date' },
                        {
                          header: 'Category',
                          key: 'category'
                        },
                        {
                          header: 'Description',
                          key: 'description'
                        },
                        { header: 'Amount', key: 'amount' }
                      ]
                    : []
                )}>
                {({
                  rows,
                  headers,
                  getRowProps,
                  getTableProps,
                  getHeaderProps,
                  getToolbarProps
                }) => (
                  <TableContainer title='Transaction History'>
                    <TableToolbar
                      {...getToolbarProps()}
                      aria-label='data table toolbar'>
                      <TableToolbarContent>
                        <MonthDisplay classNames='MonthDisplay-intable' />
                      </TableToolbarContent>
                    </TableToolbar>

                    <Table
                      {...getTableProps()}
                      isSortable
                      useZebraStyles
                      shouldShowBorder
                      overflowMenuOnHover>
                      <TableHead>
                        <TableRow>
                          {headers.map((header, i) => (
                            <TableHeader
                              key={`${header.header}-${i}`}
                              {...getHeaderProps({
                                header
                              })}>
                              {header.header}
                            </TableHeader>
                          ))}
                          <TableHeader />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length ? (
                          rows.map(row => (
                            <TableRow
                              key={row.id}
                              {...getRowProps({
                                row
                              })}>
                              {row.cells.map(cell => (
                                <TableCell key={cell.id}>
                                  {handleFormatCell(cell)}
                                </TableCell>
                              ))}

                              <TableCell className='bx--table-column-menu'>
                                <OverflowMenu flipped>
                                  <OverflowMenuItem
                                    itemText='Edit'
                                    onClick={onEditTransaction(row)}
                                  />
                                  <OverflowMenuItem
                                    itemText='Delete'
                                    onClick={onDeleteTransaction(row)}
                                  />
                                </OverflowMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell className='text-centered'>
                              There's no transaction data for this month
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            </>
          ) : (
            <DataTableSkeleton zebra showToolbar={false} />
          )}
        </div>
        {children}
      </Card>
    </Page>
  )
}

TransactionHistory.propTypes = {
  children: PropTypes.node,
  transactions: PropTypes.array,
  onEditTransaction: PropTypes.func,
  onDeleteTransaction: PropTypes.func
}

export default TransactionHistory
