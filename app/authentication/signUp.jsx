import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import Colors from '../../constant/Colors';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignUp() {
    
  const router=useRouter();
  const [fullName, setFullName]=useState();
  const [email, setEmail]=useState();
  const [password, setPassword]=useState();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  const CreateNewAccount=()=>{
    console.log('Creating new account with email:', email);
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(resp)=>{
        const user=resp.user;
        console.log(user);
        await SaveUser(user);
        // Save User to Database
    })
    .catch(error=>{
        console.log(error.message)
    })
  }

  const SaveUser=async(user)=>{
    const data = {
        name:fullName,
        email:email,
        member:false,
        uid:user?.uid
    }

    await setDoc(doc(db,'users',email),data)

    setUserDetail(data);

    // Navigate to New Screen
  }

  return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 100,
        padding: 2,
        flex: 1,
        padding: 25,
        color: Colors.WHITE
    }}>

        <Image source={require('../../assets/images/logo.png')}
            style={{
            width: 180,
            height: 180
            }}
        />

        <Text style={{
            fontSize: 30,
            fontFamily: 'outfit-bold'
        }}>Create New Account</Text>

        <TextInput placeholder='Full Name' onChangeText={(value)=>setFullName(value)} style={styles.textInput}/>
        <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={styles.textInput}/>
        <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput}/>

        <TouchableOpacity
        onPress={CreateNewAccount}
            style={{
                padding: 15,
                backgroundColor: Colors.PRIMARY,
                width: '100%',
                marginTop: 25,
                borderRadius: 10
            }}
        >
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.WHITE,
                textAlign: 'center'
            }}>Create Account</Text>
        </TouchableOpacity>
        
        <View style={{
            display: 'flex',
            flexDirection: 'row', gap: 5,
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit'
            }}>Already have an account?</Text>
            <Pressable
                onPress={()=>router.push('/authentication/signIn')}
            >
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-bold'
                    }}>Sign In Here</Text>
            </Pressable>
        </View>
        

    </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 18,
        marginTop: 20,
        borderRadius: 8
    }
})