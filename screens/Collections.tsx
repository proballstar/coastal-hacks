import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native'
import { Text, View } from '../components/Themed'
import { useEffect, useState } from 'react'
// eslint-disable-next-line camelcase
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import MyTextInput from '../components/TextInput'
import { FETCH_URLs, METHODS } from '../constants/Fetch'

export default function CollectionsScreen() {
  const navigation = useNavigation()
  const [collections, setCollections] = useState([{
    cid: 'adsfasdfasdfsadf',
    name: 'Seashells with holes',
    uid: ''
  }])

  async function fetchCollections () {
    fetch(FETCH_URLs.GET_COLLECTIONS(getAuth().currentUser?.uid!), {
      method: 'GET'
    })
      .then(data => data.json())
      .then(json => setCollections(json))
  }

  useEffect(() => {
    fetchCollections()
  }, [])
  return (
    <View>
      {collections.map((value, index) => {
        return (
          <View style={styles.colWrapper} key={`Collection-${index}`}>
            <Text style={styles.colText}>
              Collection: {value.name}
            </Text>
            <TouchableOpacity
              style={styles.colOpen}
              onPress={() => navigation.navigate('Collect', { cid: value.cid })}
            >
              <Text>
                Enter
              </Text>
            </TouchableOpacity>
          </View>
        )
      })}
      <View>
        <Formik
          initialValues={{
            name: ''
          }}
          onSubmit={async values => {
            const auth = getAuth()
            const headers = new Headers()
            headers.append('Content-Type', 'application/json')
            await fetch(FETCH_URLs.POST_COLLECTION, {
              body: JSON.stringify({
                name: values.name,
                uid: auth.currentUser?.uid!
              }),
              method: 'POST',
              headers
            })
            await fetchCollections()
          }}
        >
          {({ handleBlur, handleChange, values, handleSubmit }) => (
            <>
              <MyTextInput
                handleBlur={handleBlur}
                handleChange={handleChange}
                name='name'
                values={values}
              />
              <TouchableHighlight onPress={() => handleSubmit()}>
                <Text>
                  Create Collection
                </Text>
              </TouchableHighlight>
            </>
          )}
        </Formik>
      </View>
      <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  colWrapper: {
    padding: 25,
    marginTop: 30,
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').width * 0.175,
    borderRadius: 20,
    justifyContent: 'center',
    textAlign: 'center'
  },
  colText: {

  },
  colOpen: {
    backgroundColor: '#D9D9D9'
  }
})
