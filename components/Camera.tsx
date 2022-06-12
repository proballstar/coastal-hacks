/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-use-before-define
import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

type PictureTake = (cameraRef: MutableRefObject<any>) => any

export default function MyCamera ({ onPicture }: { onPicture: PictureTake}) {
  const cameraRef = useRef<any>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [isPreview, setIsPreview] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)

  useEffect(() => {
    onHandlePermission()
  }, [])

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const camSwitch = () => {
    if (isPreview) {
      return
    }
    setCameraType((prevCameraType: CameraType) =>
      prevCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    )
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return (
          <Text>No access to camera</Text>
    )
  }

  return (
        <>
            <Camera
            ref={cameraRef!}
            style={styles.camera}
            type={cameraType}
            onCameraReady={onCameraReady}
            useCamera2Api={true}
            />
            {!isPreview && (
                <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity disabled={!isCameraReady} onPress={camSwitch}>
                        <MaterialIcons name='flip-camera-ios' size={28} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      disabled={!isCameraReady}
                      onPress={() => onPicture(cameraRef)}
                      style={styles.capture}
                    >
                      <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ color: 'white', backgroundColor: 'pink'}}>
                      <Text>Take File from Camera Roll</Text>
                    </TouchableOpacity>
                </View>
                )}
                
      </>
  )
}
const WINDOW_HEIGHT = Dimensions.get('window').height
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08)

const styles = StyleSheet.create({

  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 28,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  capture: {
    backgroundColor: '#29b6f6',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    marginBottom: 28,
    marginHorizontal: 30,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row'
  }
})
