import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function Header() {
    const {userDetail, setUserDetail}=useContext(UserDetailContext)
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <View>
            <Text style={{
            fontSize: 25,
            fontFamily: 'outfit-bold'
            }}>Hello, {userDetail?.name}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17
            }}>Let's Get Started!</Text>
        </View>
        <TouchableOpacity>
        <Ionicons name="settings-outline" size={32} color="black" />
        </TouchableOpacity>
    </View>
  )
}