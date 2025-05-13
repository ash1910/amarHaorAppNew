import { View, Text, Button, Alert, Image, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
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
import { getDistrictDetail } from "@/src/requests/User";
import {width, height} from '@/src/utils/validator';

export default function Page() {
  const { id, name, url, thumb_img } = useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  

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
        <Text style={{color: '#000', fontSize: 20, fontWeight: 500, margin: 10, paddingLeft: 40}}>{name}</Text>
        <TouchableOpacity onPress={() => { 
          video.current.pauseAsync();
          router.back();
          }} style={{position: 'absolute', left: 16, top: 12}}><MaterialIcons name="arrow-back" size={28} color={"#49454F"}/></TouchableOpacity>
      </View>
      
      <Video
          ref={video}
          style={{height: 300, width: '100%'}}
          source={{
            uri: `${web_url}${url}`,
          }}
          posterSource={{uri:web_url+"/"+thumb_img}}
          posterStyle={{resizeMode:'cover'}}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          usePoster
          shouldPlay={true}
          isLooping={false}
          isMuted={false}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          onLoadStart={() => setIsPreloading(true)}
          onReadyForDisplay={() => setIsPreloading(false)}
        />
        {isPreloading &&
          <ActivityIndicator
              animating
              color={"white"}
              size="large"
              style={{ flex: 1, position:"absolute", top:"50%", left:"45%", backgroundColor: '#000', padding: 20, borderRadius: 6 }}
          />
        }
      
    </ScrollView>
  )
}