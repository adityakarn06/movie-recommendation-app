import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const onboarding = () => {
  return (
    <View>
      <Text>onboarding</Text>
      <Link href="/">Go to Home</Link>
    </View>
  )
}

export default onboarding

const styles = StyleSheet.create({})