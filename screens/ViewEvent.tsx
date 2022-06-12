import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'
import { ParamList } from '../types'
import { FETCH_URLs } from '../constants/Fetch'
import MapView, { Marker } from 'react-native-maps'

export default function ViewEvent () {
  const route = useRoute<RouteProp<ParamList, 'Event'>>()
  const [ready, setReady] = useState(false)
  const mapRef = useRef<null | any>(null)
  const { eid } = route.params
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.2022,
    longitudeDelta: 0.2421
  })
  const [event, setEvent] = useState({
    title: '',
    content: '',
    lat: 37,
    long: -122,
    uid: '',
    eid: '',
    rating: 0,
    comments: []
  })

  async function fetchEvent () {
    await fetch(FETCH_URLs.GET_EVENT(eid))
      .then(res => res.json())
      .then(resp => setEvent(resp))
  }
  useEffect(() => {
    // fetchEvent()
    if (!ready) return
    mapRef.current.animateToRegion()
  }, [])

  return (
    <View>
      <Text>
        Event
      </Text>
      <MapView
        ref={mapRef}
        region={region}
        onRegionChange={region => setRegion(region)}
        onMapReady={() => setReady(true)}
        style={styles.map}
      >
        <Marker
            coordinate={{ latitude: 37, longitude: -122 }}
            title={'Sea Cleanup'}
            description={'Help the Environment'}
          />

        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1
  }
})
