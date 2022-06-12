import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export default function App () {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const [isAuth, setAuth] = useState(false)

  onAuthStateChanged(getAuth(), (user: User | null) => {
    const isUser = user !== null
    if (isUser) {
      console.log(user)
      setAuth(true)
    } else {
      setAuth(false)
    }
  })

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} auth={isAuth} />
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
