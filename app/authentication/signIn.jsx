import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import Colors from '../../constant/Colors';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignIn() {
  const router = useRouter();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const [loading,setLoading]=useState(false);

  console.log(ToastAndroid); // Should print an object with 'show' and 'showWithGravity' methods.


  const onSignInClick = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async(resp) => {
        const user = resp.user;
        console.log(user);
        await getUserDetails();
        setLoading(false);
        router.replace('/(tabs)/home');
      })
      .catch((e) => {
        console.log(e);    
        setLoading(false);
        const errorMessage = "Incorrect Email & Password";
        
        if (Platform.OS === "android") {
          ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
        } else {
          Alert.alert("Error", errorMessage);
        }
      });
  };

  const getUserDetails=async()=>{
    const result=await getDoc(doc(db, 'users', email));
    console.log(result.data())
    setUserDetail(result.data())
  }

  return (
    <View style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 100,
            paddin: 2,
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
            }}>Welcome Back</Text>
    
            <TextInput placeholder='Email' 
            onChangeText={(value)=>setEmail(value)}
            style={styles.textInput}/>
            <TextInput placeholder='Password' 
            onChangeText={(value)=>setPassword(value)}
            secureTextEntry={true} style={styles.textInput}/>
    
            <TouchableOpacity
                onPress={onSignInClick} // ✅ Removed unnecessary parentheses
                disabled={loading}
                style={{
                    padding: 15,
                    backgroundColor: Colors?.PRIMARY ?? "#007bff", // ✅ Default color if Colors.PRIMARY is undefined
                    width: "100%",
                    marginTop: 25,
                    borderRadius: 10,
                }}
                >
                {!loading ? (
                    <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 20,
                        color: Colors?.WHITE ?? "#fff", // ✅ Default color if Colors.WHITE is undefined
                        textAlign: "center",
                    }}
                    >
                    Sign In
                    </Text>
                ) : (
                    <ActivityIndicator size={"large"} color={Colors?.WHITE ?? "#fff"} />
                )}
            </TouchableOpacity>

            
            <View style={{
                display: 'flex',
                flexDirection: 'row', gap: 5,
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Don't have an account?</Text>
                <Pressable
                    onPress={()=>router.push('/authentication/signUp')}
                >
                        <Text style={{
                            color: Colors.PRIMARY,
                            fontFamily: 'outfit-bold'
                        }}>Register Here</Text>
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