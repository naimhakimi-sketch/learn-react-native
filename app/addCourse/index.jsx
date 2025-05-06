import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Shared/Button';
import Colors from '../../constant/Colors';

export default function AddCourse() {
  const [loading,setLoading]=useState(false);
  const [userInput,setUserInput]=useState();
  const onGenerateTopic=async ()=>{
    setLoading(true);
    // Get Topic Ideas from AI Model
    const PROMPT = userInput = Prompt.IDEA;
    const aiResp = await GenerteTopicsAIModel.sendMessage(PROMPT);
    const topicIdea = aiResp.response.text();
    console.log(topicIdea);
    setLoading(false);
  }
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
      <TextInput
        placeholder='(Ex. Learn Python, Learn 12th Chemistry)'
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        onChangeText={(value)=>setUserInput(value)}
      />

      <Button text={'Generate Topic'} type='outline' onPress={()=>onGenerateTopic} loading={loading} />
    </View>
    
  )
}

const styles = StyleSheet.create({
  textInput:{
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: 'flex-start',
    fontSize: 18
  }
})