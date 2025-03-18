import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { TextInput } from 'react-native-web'

export default function AddCourse() {
  return (
    <View style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Create New Course</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 25
      }}>What you want to learn today?</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 20,
        marginTop: 8,
        color: Colors.GRAY
      }}>What course you want to create (ex. Learn Python, Digital Marketing, 10th Science Chapters, etc...)</Text>
      <TextInput placeholder='(Ex. Learn Python, Learn 12th Chemistry)'/>
    </View>
  )
}