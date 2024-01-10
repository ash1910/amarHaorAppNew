import { View, Text, Button, Alert, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, {useEffect, useState, useRef} from 'react';
import { router } from 'expo-router'
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';

import {useNavigation} from '@react-navigation/native';
import { getDistrictDetailList } from "../../../../src/requests/User";
import {width, height} from '../../../../src/utils/validator';

export default function Page() {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [districtList, setDistrictList] = useState([]);

  let isMounted = true;
  var web_url = "https://amarhaor.com/";

  const loadDistrict = async () => {
    setLoading(true);
    let response = await getDistrictDetailList();
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
    loadDistrict();
    return () => { isMounted = false };
  }, [navigation]);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: '#ffffff'}}>
      <View style={{flex:1}}>
        <FlatList
          data={districtList}
          keyExtractor={(item, index)=>{return item.id}}
          numColumns={1}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,}} activeOpacity={1} onPress={() => router.push(`/district/${item.id}`)} >
              <View style={{flex:1, flexDirection: "row", width: width, backgroundColor: '#FEF7FF', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#CAC4D0'}}>
                <View style={{}}><Image style={{width: '100%', height: '100%', backgroundColor: '#ccc', resizeMode: 'contain', }} source={{uri:web_url+item.header_img}}/></View>
                <View><Text style={{color: '#1D1B20', fontSize: 18, lineHeight: 24}}>{item.name}</Text></View>
                <View style={{position: 'absolute', right: 12, top: '50%'}}><MaterialIcons name="arrow-forward-ios" size={16} color={"#1C1B1F"}/></View>
              </View>
            </TouchableOpacity>
          )}
          />
      </View>
    </View>
  )
}