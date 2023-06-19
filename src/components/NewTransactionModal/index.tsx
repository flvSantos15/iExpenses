import { Controller, useForm } from 'react-hook-form'

import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from 'react-native'
import { SimpleLineIcons, Feather } from '@expo/vector-icons'

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface NewTransactionProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export interface NewTransactionsFormInputs {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export function NewTransactionModal({
  isModalOpen,
  setIsModalOpen
}: NewTransactionProps) {
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState<'income' | 'outcome' | null>(null)

  // const [isModalOpen, setIsModalOpen] = useState(true)

  // const createTransaction = useContextSelector(
  //   TransactionsContext,
  //   (context) => {
  //     return context.createTransaction
  //   }
  // )

  async function handleCreateNewtransaction() {
    try {
      console.log({ description, price, category, type })
      //     const { description, category, price, type } = data

      //     createTransaction({ description, category, price, type })
    } catch (err) {
      console.log(err, 'error no NewTransactionModal')
    } finally {
      setDescription('')
      setPrice('')
      setCategory('')
      setType(null)

      setIsModalOpen(false)
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false)
      }}
    >
      {/* absolute top-1/2 -translate-y-[250px] */}
      <View className="flex items-center justify-center w-full h-screen inset-0 bg-black/[.80]">
        <View className="rounded-[20px] w-full h-[478px] pt-6 px-6 bg-gray-800">
          <Text className="font-title text-xl text-gray-100">
            Nova Transação
          </Text>

          <TouchableOpacity
            onPress={() => setIsModalOpen(false)}
            className="absolute top-6 right-6"
          >
            <SimpleLineIcons name="close" size={24} color="#7C7C8A" />
          </TouchableOpacity>

          <View className="flex p-0 gap-y-3 gap-x-0 mt-2">
            <TextInput
              placeholder="Descrição"
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholderTextColor="#7c7c8a"
              className="flex flex-row items-start p-4 gap-2 w-full h-[54px] bg-gray-900 rounded-md placeholder:text-gray-500 placeholder:text-base placeholder:font-title"
            />
            <TextInput
              placeholder="Preço"
              value={price}
              onChangeText={(text) => setPrice(text)}
              placeholderTextColor="#7c7c8a"
              keyboardType="numeric"
              className="flex flex-row items-start p-4 gap-2 w-full h-[54px] bg-gray-900 rounded-md placeholder:text-gray-500 placeholder:text-base placeholder:font-title"
            />
            <TextInput
              placeholder="Categoria"
              value={category}
              onChangeText={(text) => setCategory(text)}
              placeholderTextColor="#7c7c8a"
              className="flex flex-row items-start p-4 gap-2 w-full h-[54px] bg-gray-900 rounded-md placeholder:text-gray-500 placeholder:text-base placeholder:font-title mb-2"
            />

            <View className="flex flex-row justify-between w-full mb-3">
              <TouchableOpacity
                onPress={() => setType('income')}
                className={clsx(
                  'p-4 flex flex-row items-center justify-center rounded-md h-[58px] w-[48%]',
                  {
                    'bg-gray-700': type !== 'income',
                    'bg-green-500': type === 'income'
                  }
                )}
              >
                <Feather
                  name="arrow-up-circle"
                  size={24}
                  color={type === 'income' ? '#fff' : '#00b37e'}
                />
                <Text className="text-gray-300 font-body text-base ml-4">
                  Entrada
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setType('outcome')}
                className={clsx(
                  'p-4 flex flex-row items-center justify-center rounded-md h-[58px] w-[48%]',
                  {
                    'bg-gray-700': type !== 'outcome',
                    'bg-red-500': type === 'outcome'
                  }
                )}
              >
                <Feather
                  name="arrow-down-circle"
                  size={24}
                  color={type === 'outcome' ? '#fff' : '#f75a68'}
                />
                <Text className="text-gray-300 font-body text-base ml-4">
                  Saída
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleCreateNewtransaction}
              className="flex flex-row justify-center items-center h-[50] w-full bg-green-500 rounded-md mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Text className="text-white font-title text-base">Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
