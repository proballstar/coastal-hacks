/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-use-before-define
import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  View
} from 'react-native'
import MyCamera from '../components/Camera'
import { FETCH_URLs, METHODS } from '../constants/Fetch'
import { getAuth } from 'firebase/auth'

const WINDOW_HEIGHT = Dimensions.get('window').height
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08)

export default function App () {
  const [isPreview, setIsPreview] = useState(false)

  const onSnap = async (cameraRef: any) => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true }
      const data = await cameraRef.current.takePictureAsync(options)
      const source = data.base64
      const formData = new FormData()
      formData.append('cid', '')
      const auth = getAuth()
      formData.append('uid', auth.currentUser?.uid!)
      formData.append('image', source)
      fetch(FETCH_URLs.SAVE_CAMERA, {
        method: METHODS.POST,
        body: formData,
        redirect: 'follow'
      })
    }
  }

  return (
    <View style={styles.container}>
      <MyCamera onPicture={onSnap} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  },
  capture: {
    backgroundColor: '#5A45FF',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    marginBottom: 28,
    marginHorizontal: 30
  }
})
