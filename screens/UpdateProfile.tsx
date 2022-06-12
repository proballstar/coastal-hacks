import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import MyTextInput from '../components/TextInput'
import { FETCH_URLs, METHODS } from '../constants/Fetch'
import { getAuth } from 'firebase/auth'

export default function UpdateProfile () {
  return (
      <View>
          <Formik
              initialValues={{
                trash: ''
              }}
              onSubmit={async values => {
                const headers = new Headers()
                const auth = getAuth()
                headers.append('Content-Type', 'application/json')
                await fetch(FETCH_URLs.LOG_TRASH(auth.currentUser?.uid!), {
                  method: METHODS.POST,
                  body: JSON.stringify({
                    trash: values.trash
                  }),
                  headers
                })
              }}
          >
              {({ handleBlur, handleChange, values, handleSubmit }) => {
                return (
                    <>
                        <MyTextInput
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          values={values}
                          name={'trash'}
                        />
                        <TouchableHighlight onPress={handleSubmit}>
                          <Text>Update the amount of trash</Text>
                        </TouchableHighlight>
                    </>

                )
              }}
          </Formik>
        </View>
  )
}
