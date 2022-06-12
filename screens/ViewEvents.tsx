import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Button, Text, View } from '../components/Themed'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line camelcase
import { FETCH_URLs, METHODS } from '../constants/Fetch'
import { useNavigation } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'

export default function ViewEvents () {
  const auth = getAuth()
  const navigation = useNavigation()
  const [events, setEvents] = useState([
    {
      title: '',
      content: '',
      lat: '',
      long: '',
      eid: '',
      comments: [],
      rating: 0
    }
  ])

  async function fetchEvents () {
    fetch(FETCH_URLs.GET_EVENTS, {
      method: METHODS.GET
    })
      .then((data) => data.json())
      .then((json) => setEvents(json))
  }
  useEffect(() => {
    fetchEvents()
  }, [])

  async function rate (eid: string) {
    await fetch(FETCH_URLs.RATE_EVENT(eid), {
      method: METHODS.POST,
      body: JSON.stringify({
        uid: auth.currentUser?.uid
      })
    })
  }

  async function rsvp (eid: string) {
    await fetch(FETCH_URLs.JOIN_EVENT(eid), {
      method: METHODS.POST,
      body: JSON.stringify({
        uid: auth.currentUser?.uid
      })
    })
  }

  return (
    <View>

      <View>
        {events.map((value, index) => {
          return (
            <View style={styles.colWrapper} key={`Event-${index}`}>
              <Text></Text><Text></Text><Text></Text>
              <Text style={styles.colText}>   Event: {value.title}</Text>
              <View>
                <TouchableOpacity style={styles.buttons} onPress={() => rate(value.eid)}>
                  <Text>Rate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                  onPress={() =>
                    navigation.navigate('Event', { eid: value.eid })
                  }
                >
                  <Text>
                    More Info
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => rsvp(value.eid)}>
                  <Text>
                    RSVP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  colWrapper: {
    padding: 25,
    marginTop: 20,
    marginBottom: 20,
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').width * 0.175,
    borderRadius: 20,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    fontSize: 35
  },
  colText: {},
  buttons: {
    padding: 10,
    margin: 15,
    borderWidth: 1,
    fontSize: 25
  }
})
