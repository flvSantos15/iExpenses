import {
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useContext,
  createContext
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { lastDateFormat } from '../utils/formatter'

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
  transactionsDataPages: ITransactions[][]
  createTransaction: (value: CreateTransactionInput) => void
  lastIncome: string
  lastOutcome: string
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextData)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])
  const [transactionsDataPages, setTransactionsDataPages] = useState<
    ITransactions[][]
  >([])
  const [lastIncome, setLastIncome] = useState('')
  const [lastOutcome, setLastOutcome] = useState('')

  function array_chunk(arr: ITransactions[], len: number) {
    let chunks = [],
      i = 0,
      n = arr.length
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)))
    }
    return chunks
  }

  const fetchTransactions = async () => {
    try {
      const transactionsData = await AsyncStorage.getItem('@transactions')
      const lastIncomeData = await AsyncStorage.getItem('@lastIncome')
      const lastOutcomeData = await AsyncStorage.getItem('@lastOutcome')

      setLastIncome(() =>
        lastIncomeData
          ? JSON.parse(lastIncomeData)
          : lastDateFormat.format(new Date())
      )
      setLastOutcome(
        lastOutcomeData
          ? JSON.parse(lastOutcomeData)
          : lastDateFormat.format(new Date())
      )

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

    if (type === 'income') {
      AsyncStorage.setItem(
        '@lastIncome',
        JSON.stringify(lastDateFormat.format(new Date()))
      )
    }

    if (type === 'outcome') {
      AsyncStorage.setItem(
        '@lastOutcome',
        JSON.stringify(lastDateFormat.format(new Date()))
      )
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

    const newArray = array_chunk(transactions, 10)

    setTransactionsDataPages(newArray)
  }, [transactions])

  const contextValues = useMemo(
    () => ({
      transactions,
      createTransaction,
      lastIncome,
      lastOutcome,
      transactionsDataPages
    }),
    [
      transactions,
      createTransaction,
      lastIncome,
      lastOutcome,
      transactionsDataPages
    ]
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
