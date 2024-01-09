import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import React from 'react'
import { Tabs, router } from 'expo-router'
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function _layout() {
  const itemHoverColor = "#35B769";
  const itemHoverRevereColor = "#1C1B1F";

  return (
   <Tabs screenOptions={{
    headerStyle: {
      height: 80, // Specify the height of your custom header
    },
    headerLeft: () => <View style={{flexDirection: "row",}}>
        <DrawerToggleButton tintColor='#49454F' />
        <TouchableOpacity 
        onPress={() => router.push('home')} >
          <Image
            source={require("../../../assets/images/logo_home.png")}
            style={{width: 84, height: 32}}
          />
        </TouchableOpacity>
      </View>,
    tabBarActiveTintColor: itemHoverColor,
    tabBarInactiveTintColor: itemHoverRevereColor,
    tabBarLabelStyle: { fontWeight: 'bold', marginBottom: 10 },
    tabBarStyle: { backgroundColor: '#F3EDF7', height: 60},
    }}
    >
    <Tabs.Screen name='home' options={{
      tabBarIcon: ({color}) => (
        <Feather name="home" size={24} color={color} />
      ),
      tabBarLabel: 'Home',
      headerTitle: '',
      headerRight: () => <TouchableOpacity 
        style={{marginHorizontal: 10}}
        onPress={() => router.push('explore')} >
          <MaterialIcons
            name="search"
            size={24}
            color="#49454F"
          />
        </TouchableOpacity>
    }}
    listeners={{
      tabPress: e => router.push('home'),
    }} />
    <Tabs.Screen name='explore' options={{
      tabBarIcon: ({color}) => (
        <MaterialIcons name="search" size={24} color={color} />
      ),
      tabBarLabel: 'Explore',
      headerTitle: ''
    }}
    listeners={{
      tabPress: e => router.push('explore'),
    }} />
    <Tabs.Screen name='gallery/index' options={{
      tabBarIcon: ({color}) => (
        <MaterialIcons name="collections" size={24} color={color} />
      ),
      tabBarLabel: 'Gallery',
      headerTitle: ''
    }}
    listeners={{
      tabPress: e => router.push('gallery'),
    }} />
   </Tabs>
  )
}