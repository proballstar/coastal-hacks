import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { FETCH_URLs, METHODS } from '../constants/Fetch'
import { getAuth } from 'firebase/auth'

export default function UserProfile () {
  const [user, setUser] = useState({ uid: '', badges: [], events: [], trash: 0 })

  async function fetchProfile () {
    await fetch(FETCH_URLs.GET_TRASH(getAuth().currentUser?.uid!))
      .then(res => res.json())
      .then(resp => setUser(resp))
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <View>
      <Text>User Profile:</Text>
      <View>
        <Text>
          Total Pounds of Trash Collected: {user.trash}
        </Text>
        {user.badges.map((values, index) => {
          return (
            <Image
              source={{ uri: values }}
            />
          )
        })}
        <TouchableOpacity>
          
        </TouchableOpacity>
      </View>
    </View>
  )
}
