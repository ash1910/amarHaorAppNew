import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import React from 'react'
import { Tabs, router, usePathname } from 'expo-router'
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function _layout() {
  const itemHoverColor = "#35B769";
  const itemHoverRevereColor = "#1C1B1F";
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
   <Tabs safeAreaInsets={{ bottom: 0, }} screenOptions={{
    headerStyle: {
      height: 60 + insets.top, // Specify the height of your custom header
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
    tabBarLabelStyle: { fontWeight: 'bold', marginBottom: insets.bottom + 10, },
    tabBarStyle: { backgroundColor: '#F3EDF7', height: 60 + insets.bottom},
    }}
    >
    <Tabs.Screen name='home' options={{
      tabBarIcon: ({color}) => (
        <Feather name="home" size={24} color={color} />
      ),
      tabBarLabel: 'Home',
      headerTitle: pathname === '/home/district' ? 'Haor List' : '',
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