import { ThemeProvider } from 'styled-components'
import { Text, View, StyleSheet } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { TransactionsProvider } from './src/contexts/TransactionsContext'

import Home from './src/pages/Home'
// import { Loading } from './src/components/Loading'

import { defaultTheme } from './src/styles/themes/default'
import { GlobalStyle } from './src/styles/global'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })
  console.log('fonts', fontsLoaded)
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Home />
        {/* {fontsLoaded ? (
        ) : (
          <View style={styles.container}>
            <Text style={{ color: '#fff', fontSize: 24 }}>Carregando...</Text>
          </View>
        )} */}
      </TransactionsProvider>

      <StatusBar style="light" backgroundColor="transparent" translucent />
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
