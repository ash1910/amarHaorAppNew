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
import { getHaorList, getDistrictList, getUpazilaList } from "../../../../src/requests/User";
import {width, height} from '../../../../src/utils/validator';

export default function Page() {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [haorList, setHaorList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [upazilaList, setUpazilaList] = useState([]);
  const [upazilaListByDistrict, setUpazilaListByDistrict] = useState([]);
  const [haorFilterList, setHaorFilterList] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState();
  const [searchUpazila, setSearchUpazila] = useState();
  const [searchHaorName, onChangeSearchHaorName] = useState('');

  let isMounted = true;

  const loadHaor = async () => {
    setLoading(true);
    let response = await getHaorList();
    //alert(JSON.stringify(response, null, 5)) 
    if (response.ok && response.data) {
      if (isMounted){
        let response_dis = await getDistrictList();
        let response_upa = await getUpazilaList();

        setDistrictList(response_dis.data ? response_dis.data : []);
        setUpazilaList(response_upa.data ? response_upa.data: []);

        let itemsList = [];
        response.data?.forEach(x => {
            let item = {
                id : x.id,
                name : x.name,
                d_id : x.district_id,
                u_id : x.upazila_id,
                dis : response_dis.data.find(u => u.id === x.district_id).name,
                upa : response_upa.data.find(u => u.id === x.upazila_id).name ,
            }
            itemsList.push(item);
        });
        
        setHaorList(itemsList);
        setHaorFilterList(itemsList);
        //console.log(JSON.stringify(districtList, null, 5))
      }
    }
    else{
      Alert.alert("",response.data.message?.error);
    }
    if (isMounted){
      setLoading(false);
    }
  };

  const filterHaorListByDistrict = (id) => {
    onChangeSearchHaorName('');
    setSearchUpazila('');
    if( id === 'All' ){
      setHaorFilterList(haorList)
      return
    }
    let hL = haorList.filter(u => u.d_id === id)
    setHaorFilterList(hL)
  };

  const filterHaorListByUpazila = (id) => {
    if( id === 'All' ){
      filterHaorListByDistrict(searchDistrict)
      return
    }
    let hL = haorList.filter(u => u.u_id === id)
    setHaorFilterList(hL)
    onChangeSearchHaorName('');
  };

  const filterHaorListByName = (name) => {
    var hL = haorList;

    if( searchUpazila && searchUpazila !== 'All' ){
      hL = haorList.filter(u => u.u_id === searchUpazila && u.name.toLowerCase().includes(name.trim().toLowerCase()))
    }
    else if( searchDistrict && searchDistrict !== 'All' ){
      hL = haorList.filter(u => u.d_id === searchDistrict && u.name.toLowerCase().includes(name.trim().toLowerCase()))
    }
    else if( name && name !== '' ){
      hL = haorList.filter(u => u.name.toLowerCase().includes(name.trim().toLowerCase()))
    }
    
    setHaorFilterList(hL)
  };

  useEffect(() => {
    isMounted = true;
    loadHaor();
    return () => { isMounted = false };
  }, [navigation]);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: '#ffffff'}}>
      <View style={{width: '100%'}}>
        <TextInput
          style={{
            height: 40,
            margin: 8,
            borderWidth: 1,
            borderColor: '#cccccc',
            padding: 10,
          }}
          onChangeText={ (val) => {
            onChangeSearchHaorName(val);
            filterHaorListByName(val);
          }}
          value={searchHaorName}
          placeholder="Search Haor by Name"
          keyboardType="default"
          clearButtonMode="while-editing"
        />
      </View>
      <View style={{flexDirection: 'row', gap: 8, marginHorizontal: 8, marginBottom: 8}}>
          <View style={{width: width/2-12, borderWidth: 1, borderColor: '#cccccc'}}>
            <Text style={{color: '#cccccc', fontSize: 16, lineHeight: 24, textAlign: 'center'}}>Search District</Text>
            <Picker
              itemStyle={{fontSize: 16}}
              mode='dropdown'
              selectedValue={searchDistrict}
              onValueChange={(itemValue, itemIndex) => { setSearchDistrict(itemValue);
                  let upL = upazilaList.filter(u => u.district_id === itemValue)
                  setUpazilaListByDistrict(upL)
                  filterHaorListByDistrict(itemValue)
                }
              }>
              <Picker.Item label="All" value="All" key="All" />
              {districtList && districtList?.map((x, index) => 
                  <Picker.Item label={x.name} value={x.id} key={x.id} />
                )
              }
            </Picker>
          </View>
          <View style={{width: width/2-12, borderWidth: 1, borderColor: '#cccccc'}}>
            <Text style={{color: '#cccccc', fontSize: 16, lineHeight: 24, textAlign: 'center'}}>Search Upazila</Text>
            <Picker
              itemStyle={{fontSize: 16}}
              mode='dropdown'
              selectedValue={searchUpazila}
              onValueChange={(itemValue, itemIndex) => { setSearchUpazila(itemValue)
                  filterHaorListByUpazila(itemValue)
                }
              }>
                <Picker.Item label="All" value="All" key="All" />
                {upazilaListByDistrict && upazilaListByDistrict?.map((x, index) => 
                    <Picker.Item label={x.name} value={x.id} key={x.id} />
                  )
                }
            </Picker>
          </View>
      </View>

      <View style={{flex:1}}>
        <FlatList
          data={haorFilterList}
          keyExtractor={(item, index)=>{return item.id}}
          numColumns={1}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{flex:1,}} activeOpacity={1} onPress={() => router.push(`/explore/${item.id}`)} >
              <View style={{flex:1, width: width, backgroundColor: '#FEF7FF', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#CAC4D0'}}>
                <View><Text style={{color: '#1D1B20', fontSize: 18, lineHeight: 24}}>{item.name}</Text></View>
                <View style={{flexDirection: "row",}}><Text style={{color: '#49454F', fontSize: 14, lineHeight: 20, opacity: 0.5}}>{item.upa}, </Text><Text style={{color: '#49454F', fontSize: 14, lineHeight: 20, opacity: 0.5}}>{item.dis}</Text></View>
                <View style={{position: 'absolute', right: 12, top: '50%'}}><MaterialIcons name="arrow-forward-ios" size={16} color={"#1C1B1F"}/></View>
              </View>
            </TouchableOpacity>
          )}
          />
      </View>
    </View>
  )
}