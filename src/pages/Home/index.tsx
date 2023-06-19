import { useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'

import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { api } from '../../lib/axios'

export default function Home() {
  // const transactions = useContextSelector(TransactionsContext, (context) => {
  //   return context.transactions
  // })

  // console.log('home', transactions)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/transactions')
        console.log('data home', data)
      } catch (err) {
        console.log('err home', err)
      }
    }
    load()
  }, [])

  return (
    <View>
      <Header />
      <Summary />

      <View className="flex flex-col gap-2 gap-x-0 mt-4 px-4">
        <View className="flex items-center pt-4 px-5 pb-5 gap-3 gap-x-0 bg-gray-700 rounded-md">
          <View className="flex items-start p-0 gap-y-1 gap-x-0 w-full">
            <Text className="font-body text-base text-gray-300">
              Desenvolvimento de site
            </Text>

            <Text className="font-title text-xl text-green-300">
              {priceFormatter.format(14320)}
            </Text>
          </View>

          <View className="w-full flex flex-row justify-between items-center p-0">
            <View className="flex flex-row items-center">
              <Ionicons name="pricetags-outline" size={16} color="#7c7c8a" />
              <Text className="font-body text-base text-gray-500 ml-1">
                freelancer
              </Text>
            </View>

            <View className="flex flex-row items-center">
              <Feather name="calendar" size={16} color="#7c7c8a" />
              <Text className="font-body text-base text-gray-500 mr-2">
                {dateFormatter.format(new Date('16-06-2023'))}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex items-center pt-4 px-5 pb-5 gap-3 gap-x-0 bg-gray-700 rounded-md">
          <View className="flex items-start p-0 gap-y-1 gap-x-0 w-full">
            <Text className="font-body text-base text-gray-300">Aluguel</Text>

            <Text className="text-title text-xl text-red-300">
              - {priceFormatter.format(600)}
            </Text>
          </View>

          <View className="w-full flex flex-row justify-between items-center p-0">
            <View className="flex flex-row items-center">
              <Ionicons name="pricetags-outline" size={16} color="#7c7c8a" />
              <Text className="font-body text-base text-gray-500 ml-1">
                casa
              </Text>
            </View>

            <View className="flex flex-row items-center">
              <Feather name="calendar" size={16} color="#7c7c8a" />
              <Text className="font-body text-base text-gray-500 mr-2">
                {dateFormatter.format(new Date('28-06-2023'))}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-center items-center p-0 mt-14">
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
    </View>
  )
}
