import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from '../constant/Colors';
import { auth, db } from './../config/firebaseConfig';

export default function Index() {

  const router=useRouter();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        const result = await getDoc(doc(db, "users", user?.email));
        setUserDetail(result.data());
        router.replace("/(tabs)/home");
      }
    });

    return () => unsubscribe(); // ✅ Cleanup listener on unmount
  }, []); // 👀 Only run once on mount

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE
      }}
    >

      <Image source={require('./../assets/images/landing.png')}
      style={{
        width: '100%',
        height: 300,
        marginTop: 70
      }}
      />

      <View style={{
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 35
      }}>
        <Text style={{
          fontSize: 30,
          textAlign: 'center',
          color: Colors.WHITE,
          fontFamily: 'outfit-bold'
        }}>Welcome to Coaching Guru</Text>

        <Text style={{
          fontSize: 20,
          color: Colors.WHITE,
          marginTop: 20,
          textAlign: 'center',
          fontFamily: 'outfit'
        }}>Transform your ideas into engaging educational content effortlessly with AI</Text>
      
        <TouchableOpacity style={styles.button}
        onPress={() => router.push('/authentication/signUp')}
        >
          <Text style={[styles.buttonText,{color: Colors.PRIMARY}]}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{
          backgroundColor: Colors.PRIMARY,
          borderWidth: 1,
          borderColor: Colors.WHITE
          }]}
          onPress={()=>router.push('/authentication/signIn')}
          >
          <Text style={[styles.buttonText, {color: Colors.WHITE}]}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  button:{
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit'
  }
})