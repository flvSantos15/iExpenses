import { Feather } from '@expo/vector-icons'

import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'

export function Summary() {
  const { income, outcome, total } = useSummary()

  return (
    <SafeAreaView className="flex flex-row items-center py-0 pl-4 pr-0 mx-auto w-full h-[150px] -mt-20">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex flex-row p-0 gap-4 w-full"
      >
        <View className="flex items-start py-6 pr-8 pl-6 gap-3 bg-gray-600 rounded-md w-[280px] h-[150px]">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-gray-300 font-body">Entradas</Text>
            <Feather name="arrow-up-circle" size={24} color="#00b37e" />
          </View>

          <Text className="block mt-4 text-3xl font-title text-gray-300">
            {priceFormatter.format(income)}
          </Text>
        </View>

        <View className="flex items-start py-6 pr-8 pl-6 gap-3 bg-gray-600 rounded-md w-[280px] h-[150px]">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-gray-300 font-body">Saídas</Text>
            <Feather name="arrow-down-circle" size={24} color="#f75a68" />
          </View>

          <Text className="block mt-4 text-3xl font-title text-gray-300">
            {priceFormatter.format(outcome)}
          </Text>
        </View>

        <View className="flex items-start py-6 pr-8 pl-6 gap-3 bg-green-700 rounded-md w-[280px] h-[150px]">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-gray-300 font-body">Total</Text>
            <Feather name="dollar-sign" size={24} color="#fff" />
          </View>

          <Text className="block mt-4 text-3xl font-title text-white">
            {priceFormatter.format(total)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
