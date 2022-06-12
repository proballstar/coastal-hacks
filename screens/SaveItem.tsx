/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { StyleSheet, TouchableOpacity } from 'react-native'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { Text, View } from '../components/Themed'
import { RootStackScreenProps, ParamList } from '../types'
import { useEffect, useState } from 'react'
import { FETCH_URLs, METHODS } from '../constants/Fetch'
import { useRoute, RouteProp } from '@react-navigation/native'

export default function SaveItemScreen () {
  const routes = useRoute<RouteProp<ParamList, 'Collect'>>()!
  const cid: any = routes.params!.cid
  const [collections, setCollections] = useState([])

  async function grabCollection () {
    await fetch(FETCH_URLs.GET_COLLECTIONS(cid))
      .then(res => res.json())
      .then(json => setCollections(json))
  }

  useEffect(() => {
    grabCollection()
  }, [])

  async function imagePicker () {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0
    })

    if (!result.cancelled) {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const body = JSON.stringify({
        uri: result.base64,
        cid
      })
      fetch(FETCH_URLs.SAVE_CAMERA, {
        method: METHODS.POST,
        body,
        headers
      })
    }
  }

  return (
    <View>
      <View>
        {collections.map((values, index) => {
          return (
            <View>

            </View>
          )
        })}
        <TouchableOpacity onPress={() => imagePicker()}>
          <Text>
            Add to Collection
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
