import { View, Text, Button, Alert, Image, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react';
import { Stack } from 'expo-router'

import {useNavigation} from '@react-navigation/native';
import { getGalleries } from "../../../src/requests/User";
import {width, height} from '../../../src/utils/validator';

export default function Page() {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [galleryList, setGalleryList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  let isMounted = true;

  const loadGallery = async () => {
    setLoading(true);
    let response = await getGalleries();
    //alert(JSON.stringify(response, null, 5))
    if (response.ok && response.data) {
      if (isMounted){
        let galleryitemsList = [];
        var web_url = "https://amarhaor.com/";
        response.data?.forEach(x => {
            let item = {
                src : web_url + x,
            }
            galleryitemsList.push(item);
            
        });
        setGalleryList(galleryitemsList);
      }
    }
    else{
      Alert.alert("",response.data.message?.error);
    }
    if (isMounted){
      setLoading(false);
    }
  };

  useEffect(() => {
    isMounted = true;
    loadGallery();
    return () => { isMounted = false };
  }, [navigation]);

  return (
    <>
      <Stack screenOptions={{headerShown:false}} />
      <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: '#ffffff'}}>
        <FlatList
          
          data={galleryList}
          keyExtractor={(item, index)=>{return item.src}}
          numColumns={3}
          renderItem={({item, index})=>(
              <Image style={{justifyContent: 'center', height: width/3 - 4, width: width/3 - 4, margin:2, backgroundColor: '#ccc'}} source={{uri:item.src}}/>

          )}
          />
      </View>
    </>
    
  )
}