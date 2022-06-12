import { TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'

export default function MyTextInput ({ handleChange, handleBlur, values, name }: { handleChange: any; handleBlur: any, values: any, name: string}) {
  const [focused, setFocused] = useState(false)

  function onFocus () {
    setFocused(true)
  }

  function onBlur () {
    setFocused(false)
  }

  return (
    <TextInput
          placeholder={`Enter the ${name.toLowerCase()}...`}
          onChangeText={handleChange(name)}
          onBlur={() => {
            handleBlur(name)
            onBlur()
          }}
          onFocus={() => onFocus()}
          value={values[name]}
          underlineColorAndroid={
              focused ? '#428AF8' : '#D3D3D3'
          }
        style={styles.input}
        />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 80,
    paddingLeft: 6,
    fontSize: 20
  }
})
