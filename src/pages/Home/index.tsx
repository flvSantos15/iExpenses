import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

import { useTransaction } from '../../contexts/TransactionsContext'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'

import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useState } from 'react'

export default function Home() {
  const { transactions, transactionsDataPages } = useTransaction()

  const [selectedPageIndex, setSelectedPageIndex] = useState(0)

  const test = 'testing'

  const numberOfPages = Math.ceil(transactions.length / 10)

  const handlePreviousPageIndex = () => {
    if (selectedPageIndex > 0) {
      setSelectedPageIndex(selectedPageIndex - 1)
    }
  }

  const handleNextPageIndex = () => {
    if (selectedPageIndex + 1 < numberOfPages) {
      setSelectedPageIndex(selectedPageIndex + 1)
    }
  }

  return (
    <ScrollView>
      <Header />
      <Summary />

      <ScrollView className="flex flex-row gap-2 gap-x-0 mt-4 px-4 h-[390px] border border-solid border-[blue]">
        {transactionsDataPages.map((pages, index) => {
          return (
            <ScrollView
              key={index}
              className="flex flex-row gap-2 gap-x-0 mt-4 px-4 w-full border border-solid border-[red]"
            >
              {pages.map((transaction) => {
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
                          {dateFormatter.format(
                            new Date(transaction.createdAt)
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          )
        })}
      </ScrollView>

      {numberOfPages > 1 && (
        <View className="flex flex-row justify-center items-center w-full p-0 mt-4 mb-4">
          <TouchableOpacity onPress={handlePreviousPageIndex}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={selectedPageIndex === 0 ? '#323238' : '#00875f'}
            />
          </TouchableOpacity>

          <View className="flex flex-row justify-center items-center p-0 gap-2 mr-4 ml-1">
            {Array.from({ length: numberOfPages }).map((_, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPageIndex(index)}
                  className={`flex items-center justify-center w-10 h-10 ${
                    selectedPageIndex === index ? 'bg-green-700' : 'bg-gray-600'
                  } rounded-md`}
                >
                  <Text className="font-title text-base text-center text-gray-100">
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <TouchableOpacity onPress={handleNextPageIndex}>
            <MaterialIcons
              name="arrow-forward-ios"
              size={24}
              // color="#00875f"
              color={
                selectedPageIndex === numberOfPages - 1 ? '#323238' : '#00875f'
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}
