import { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import LogoImg from '../../assets/Logo.png'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  return (
    <>
      <View className="bg-gray-900 pt-14 px-0 pb-28 w-full">
        <View className="w-full my-0 mx-auto py-0 px-4 flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-2">
            <Image source={LogoImg} alt="" />
            <Text className="text-white text-[22px]">iExpenses</Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsTransactionModalOpen(true)}
            className="flex flex-row items-center h-[38px] border-none bg-green-500 py-0 px-4 rounded-md pointer hover:bg-green-700"
          >
            <Text className="text-white font-bold">Nova transação</Text>
          </TouchableOpacity>
        </View>
      </View>

      <NewTransactionModal
        isModalOpen={isTransactionModalOpen}
        setIsModalOpen={setIsTransactionModalOpen}
      />
    </>
  )
}
