import { View, Text } from 'react-native'

import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'

import {
  PriceHighlight,
  Description,
  TransactionsContainer,
  TransactionsTable,
  Category,
  TransactionDate
} from './styles'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { CalendarBlank, TagSimple } from 'phosphor-react'

export default function Home() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <View style={{ width: '100%' }}>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>
                    <div>
                      <Description>{transaction.description}</Description>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '-'}{' '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </div>
                    <div>
                      <Category>
                        <TagSimple color="#7c7c8a" />
                        {transaction.category}
                      </Category>
                      <TransactionDate>
                        <CalendarBlank color="#7c7c8a" />
                        {dateFormatter.format(new Date(transaction.createdAt))}
                      </TransactionDate>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </View>
  )
}
