import { View, Button } from 'react-native'
import React from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import app from '../Firebase'
import { Formik } from 'formik'
import MyTextInput from '../components/TextInput'


export default function Signup() {
  async function google() {
    const GoogleProvider = new GoogleAuthProvider()
    await signInWithPopup(getAuth(), GoogleProvider)
  }
  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async values => {
          await createUserWithEmailAndPassword(getAuth(app), values.email, values.password)
        }}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
        <MyTextInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          name="email"
        />
        <MyTextInput
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          name="password"
        />
        <Button onPress={() => handleSubmit()} title="Submit" />
        <View style={{ padding: 15}} />  
        <Button onPress={() => google()} title="Google Auth" />
      </View>
     )}
   </Formik>
    </View>
  )
}
