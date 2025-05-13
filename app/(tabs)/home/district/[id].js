import { View, Text, Button, Alert, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, {useEffect, useState, useRef} from 'react';
import { useLocalSearchParams, router, Stack } from "expo-router";
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
  const { id, name } = useLocalSearchParams();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [districtList, setDistrictList] = useState([]);

  let isMounted = true;
  var web_url = "https://amarhaor.com/";

  const loadDistrictDetail = async () => {
    setLoading(true);
    let response = await getDistrictDetail(id);
    //alert(JSON.stringify(response, null, 5)) 
    if (response.ok && response.data) {
      if (isMounted){
        setDistrictList(response.data ? response.data : []);
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
    loadDistrictDetail();
    return () => { isMounted = false };
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#ffffff'}}>
      <View style={{alignItems:'center', width: '100%'}}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: 500, margin: 10,}}>{name} District</Text>
        <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', left: 0, top: 12}}><MaterialIcons name="arrow-back" size={28} color={"#49454F"}/></TouchableOpacity>
      </View>
      {districtList && districtList?.map((x, index) => 
      <View style={{paddingBottom: 16, }} key={index}>
        <Text style={{fontSize: 20, color: '#49454F', fontWeight: 500, alignItems: 'flex-start', paddingVertical: 12}}  key={index}>{x.name}</Text>
        <FlatList
          horizontal
          ItemSeparatorComponent={
            <View style={{width: 8, height: '100%', backgroundColor: '#ffffff'}} />
          }
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={x.haors}
          keyExtractor={(item, index)=>{return item.id}}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{width: 128, height: 124, alignItems:'center', borderRadius: 4, overflow: 'hidden'}} activeOpacity={1} onPress={() => router.push("/home/haor-detail/"+item.id)} >
              <Image style={{width: '100%', height: '100%', backgroundColor: '#ccc', resizeMode: 'cover'}} source={{uri:web_url+item.thumb_img}}/>
              <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,.2)' }}>
                <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 500, paddingHorizontal: 16, paddingBottom: 16}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          />
      </View>
      )}
    </ScrollView>
  )
}