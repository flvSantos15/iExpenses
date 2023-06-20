import { useMemo } from 'react'

import { useTransaction } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useTransaction()

  const summary = useMemo(() => {
    return transactions?.reduce(
      (acc, transactions) => {
        if (transactions.type === 'income') {
          acc.income += transactions.price
          acc.total += transactions.price
        } else {
          acc.outcome += transactions.price
          acc.total -= transactions.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0
      }
    )
  }, [transactions])

  return summary
}
