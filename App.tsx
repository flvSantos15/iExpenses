import { StatusBar, View } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { TransactionsProvider } from './src/contexts/TransactionsContext'

import Home from './src/pages/Home'
import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <View className="w-full h-screen bg-gray-800 text-gray-100 antialiased">
      <TransactionsProvider>
        <Home />
      </TransactionsProvider>

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </View>
  )
}
