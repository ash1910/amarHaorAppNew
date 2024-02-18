import { View, Text, Button, Alert, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState, useRef} from 'react';
import { useLocalSearchParams, router, Stack } from "expo-router";
import { Video, ResizeMode } from 'expo-av';
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";

import {useNavigation} from '@react-navigation/native';
import { getDistrictDetail } from "../../../../../src/requests/User";
import {width, height} from '../../../../../src/utils/validator';

export default function Page() {
  const { id, name, url } = useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [districtList, setDistrictList] = useState([]);
  

  let isMounted = true;
  var web_url = "https://amarhaor.com";
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    isMounted = true;
    return () => { isMounted = false };
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 0, paddingBottom: 16, backgroundColor: '#ffffff'}}>
      <View style={{alignItems:'center', width: '100%', paddingBottom: 16,}}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: 500, margin: 10,}}>{name}</Text>
        <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', left: 16, top: 12}}><MaterialIcons name="arrow-back" size={28} color={"#49454F"}/></TouchableOpacity>
      </View>
      <Video
          ref={video}
          style={{height: 300, width: '100%'}}
          source={{
            uri: `${web_url}${url}`,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      
    </ScrollView>
  )
}