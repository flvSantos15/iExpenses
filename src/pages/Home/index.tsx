import { useEffect } from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

import { useTransaction } from '../../contexts/TransactionsContext'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'

import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { api } from '../../lib/axios'

export default function Home() {
  const { transactions } = useTransaction()

  return (
    <ScrollView>
      <Header />
      <Summary />

      <ScrollView className="flex flex-col gap-2 gap-x-0 mt-4 px-4 h-[360px] min-h-[360px]">
        {transactions.map((transaction) => {
          return (
            <View
              key={transaction.id}
              className="flex items-center pt-4 px-5 pb-5 gap-3 gap-x-0 bg-gray-700 rounded-md"
            >
              <View className="flex items-start p-0 gap-y-1 gap-x-0 w-full">
                <Text className="font-body text-base text-gray-300">
                  {transaction.description}
                </Text>

                <Text
                  className={`font-title text-xl ${
                    transaction.type === 'income'
                      ? 'text-green-300'
                      : 'text-red-300'
                  }`}
                >
                  {transaction.type === 'income' ? '' : '-'}
                  {priceFormatter.format(transaction.price)}
                </Text>
              </View>

              <View className="w-full flex flex-row justify-between items-center p-0">
                <View className="flex flex-row items-center">
                  <Ionicons
                    name="pricetags-outline"
                    size={16}
                    color="#7c7c8a"
                  />
                  <Text className="font-body text-base text-gray-500 ml-1">
                    {transaction.category}
                  </Text>
                </View>

                <View className="flex flex-row items-center">
                  <Feather name="calendar" size={16} color="#7c7c8a" />
                  <Text className="font-body text-base text-gray-500 mr-2">
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </Text>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>

      <View className="flex flex-row justify-center items-center w-full p-0 mt-4 mb-4">
        <TouchableOpacity>
          <MaterialIcons name="arrow-back-ios" size={24} color="#323238" />
        </TouchableOpacity>

        <View className="flex flex-row justify-center items-center p-0 gap-2 mr-4 ml-1">
          <TouchableOpacity className="flex items-center justify-center w-10 h-10 bg-green-700 rounded-md">
            <Text className="font-title text-base text-center text-gray-100">
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-md">
            <Text className="font-title text-base text-center text-gray-100">
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-md">
            <Text className="font-title text-base text-center text-gray-100">
              3
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <MaterialIcons name="arrow-forward-ios" size={24} color="#00875f" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
