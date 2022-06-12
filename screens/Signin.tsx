import { View } from 'react-native'
import React from 'react'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from '../Firebase'
import { Formik } from 'formik'
import MyTextInput from '../components/TextInput'

export default function Signin () {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async values => {
        await signInWithEmailAndPassword(getAuth(app), values.email, values.password)
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
      </View>
     )}
    </Formik>
  )
}
