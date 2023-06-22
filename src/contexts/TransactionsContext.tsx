import {
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useContext,
  createContext
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

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
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransactionContextData {
  transactions: ITransactions[]
  // fetchTransactions: () => void
  createTransaction: (value: CreateTransactionInput) => void
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  const fetchTransactions = async () => {
    try {
      const transactionsData = await AsyncStorage.getItem('@transactions')

      if (transactionsData) {
        setTransactions(JSON.parse(transactionsData) as ITransactions[])
      } else {
        setTransactions([])
      }
    } catch (err) {
      console.log('error no contexto', err)
    }
  }

  const createTransaction = async ({
    description,
    category,
    price,
    type
  }: CreateTransactionInput) => {
    const transactionData = {
      id: new Date().getTime(),
      description,
      category,
      price,
      type,
      createdAt: new Date().toDateString()
    }

    if (transactions?.length) {
      setTransactions((state) => [transactionData, ...state])
    } else {
      setTransactions([transactionData])
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    if (transactions) {
      AsyncStorage.setItem('@transactions', JSON.stringify(transactions))
    }
  }, [transactions])

  const contextValues = useMemo(
    () => ({
      transactions,
      createTransaction
    }),
    [transactions, createTransaction]
  )

  return (
    <TransactionsContext.Provider value={contextValues}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionsContext)

  return context
}
