import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'

export default function Page() {
  return <Redirect href={"(drawer)/(tabs)/home"} />;
}