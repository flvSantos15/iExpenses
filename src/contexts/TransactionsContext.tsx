import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react'

import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

export interface ITransactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionContextData {
  transactions: ITransactions[]
  fetchTransactions: (query?: string) => void
  createTransaction: (value: CreateTransactionInput) => void
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(data)
  }, [])

  const createTransaction = useCallback(
    async ({ description, category, price, type }: CreateTransactionInput) => {
      const { data } = await api.post('/transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date()
      })

      if (transactions?.length) {
        setTransactions((state) => {
          return [data, ...state]
        })
      } else {
        setTransactions(data)
      }
    },
    []
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const contextValues = useMemo(
    () => ({
      transactions,
      fetchTransactions,
      createTransaction
    }),
    [transactions, fetchTransactions, createTransaction]
  )

  return (
    <TransactionsContext.Provider value={contextValues}>
      {children}
    </TransactionsContext.Provider>
  )
}
