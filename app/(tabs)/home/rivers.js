import { View, Text, Button, Alert, Image, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react';
import { Stack } from 'expo-router'

import {useNavigation} from '@react-navigation/native';
import { getRivers } from "@/src/requests/User";
import {width, height} from '@/src/utils/validator';

export default function Page() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [riverList, setRiverList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  let isMounted = true;

  const loadRivers = async () => {
    setLoading(true);
    let response = await getRivers();
    if (response.ok && response.data) {
      if (isMounted){
            let riverItemsList = response.data.rivers;
            const a = riverItemsList.reduce((acc,curr)=> {
                if(!acc[curr.region]){
                    acc[curr.region] = new Set();
                }
                
                acc[curr.region].add(curr.name)
            
                return acc;
            },{})
          
          let result = Object.entries(a).map((el) => ({region: el[0],names:[...el[1]]}))
          setRiverList(result);
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
    loadRivers();
    return () => { isMounted = false };
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 32 }}>
      <Text style={{color: '#49454F', fontSize: 28, fontWeight: 500, marginVertical: 32}}>{item.region}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {item.names.map((riverName, index) => (
          <Text 
            key={riverName}
            style={{
              color: '#49454F', 
              fontSize: 14, 
              fontWeight: 500, 
              width: width/2 - 16, 
              marginVertical: 4
            }}
          >
            {riverName}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      data={riverList}
      renderItem={renderItem}
      keyExtractor={(item) => item.region}
      contentContainerStyle={{
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingBottom: 32
      }}
    />
  )
}