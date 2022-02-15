import React, { useEffect, useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-expo'
import { Text } from 'react-native'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { API_KEY } from '@env'
import AuthContext from './context/Authentication'

const client = StreamChat.getInstance(API_KEY)

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const [selectedChannel, setSelectedChannel] = useState<any>(null)

  const [userId, setUserId] = useState('')

  useEffect(() => {
    return () => client.disconnectUser()
  }, [])

  const onChannelPressed = (channel: any) => {
    setSelectedChannel(channel)
  }

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{ userId, setUserId }}>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme="light" />
            </Chat>
            {/* <Chat client={client}>
            {selectedChannel ? (
              <Channel channel={selectedChannel}>
                <MessageList />
                <MessageInput />
                <Text
                  style={{ margin: 50 }}
                  onPress={() => setSelectedChannel(null)}
                >
                  Go Back
                </Text>
              </Channel>
            ) : (
              <ChannelList
                onSelect={onChannelPressed}
                filters={{ name: 'ChatApp.dev' }}
              />
            )}
          </Chat> */}
          </OverlayProvider>

          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    )
  }
}
