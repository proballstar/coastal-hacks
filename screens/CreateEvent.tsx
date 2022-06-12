/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import { FETCH_URLs, METHODS } from '../constants/Fetch'
import { getAuth } from 'firebase/auth'
import MyTextInput from '../components/TextInput'
import { Formik } from 'formik'


export default function CreateEvent () {

  return (
    <View>
      <Formik
          initialValues={{
            title: '',
            content: '',
            lat: '',
            long: ''
          }}
          onSubmit={async (values: any) => {
            const headers = new Headers({
              'Content-Type': 'application/json'
            })
            const auth = getAuth()
            console.log(values)
            await fetch(FETCH_URLs.CREATE_EVENT, {
              headers,
              method: METHODS.POST,
              body: JSON.stringify({
                ...values,
                uid: auth.currentUser?.uid!
              })
            })
          }}
        >
          {({ handleBlur, handleChange, values, handleSubmit }) => (
            <>
              <MyTextInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="title"
                values={values}
              />
              <MyTextInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="content"
                values={values}
              />
              <MyTextInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="lat"
                values={values}
              />
              <MyTextInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="long"
                values={values}
              />
              <TouchableHighlight style={styles.buttons} onPress={() => handleSubmit()}>
                <Text>Create Event</Text>
              </TouchableHighlight>
            </>
          )}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    padding: 5,
    margin: 10,
    textAlign: 'center',
    fontSize: 20
  }
})
