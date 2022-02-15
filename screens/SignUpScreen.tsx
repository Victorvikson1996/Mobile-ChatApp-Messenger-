import React, { useState, useContext } from 'react'

import { useChatContext } from 'stream-chat-expo'

import AuthContext from '../context/Authentication'

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native'

// export interface props {
//   username: string
//   fullname: string
// }

const SignUpScreen = () => {
  const [username, setUserName] = useState('')

  const [fullName, setFullName] = useState('')

  const { client } = useChatContext()

  const { setUserId } = useContext(AuthContext)

  const connectUser = async (username: string, fullName: string) => {
    await client.connectUser(
      {
        id: username,
        name: fullName,
        // image: 'https://i.imgur.com/fR9Jz14.png',
      },
      client.devToken(username),
    )

    const channel = client.channel('messaging', 'AkuDev', {
      name: 'Sean',
    })
    await channel.create()

    setUserId(username)
  }

  const signUp = () => {
    // console.warn(username, fullName)

    connectUser(username, fullName)
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          placeholder="Username"
          style={styles.input}
          onChangeText={setUserName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          style={styles.input}
        />
      </View>

      <Pressable onPress={signUp} style={styles.button}>
        <Text>Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
  },
  input: {
    // backgroundColor: 'white',
  },

  button: {
    backgroundColor: '#256cff',
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
})

export default SignUpScreen
