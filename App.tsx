import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StreamChat } from 'stream-chat'
import { Chat, OverlayProvider, ChannelList } from 'stream-chat-expo'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { API_KEY } from '@env'

const client = StreamChat.getInstance(API_KEY)

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: 'Victor',
          name: 'AkuChukwu',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        client.devToken('Victor'),
      )

      const channel = client.channel('messaging', 'ChatApp', {
        name: 'ChatApp.dev',
      })
      await channel.watch()
    }

    connectUser()

    return () => client.disconnectUser()
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider>
          <Chat client={client}>
            {/* <Navigation colorScheme={colorScheme} /> */}
            <ChannelList />
          </Chat>
        </OverlayProvider>
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
