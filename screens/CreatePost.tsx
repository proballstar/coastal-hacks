/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { StyleSheet } from 'react-native'
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { METHODS, FETCH_URLs } from '../constants/Fetch'

export default function CreatePostScreen () {
  function createPost () {
    fetch('', {
      method: METHODS.POST,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({})
    })
  }

  return (
    <View>

    </View>
  )
}

const styles = StyleSheet.create({

})
