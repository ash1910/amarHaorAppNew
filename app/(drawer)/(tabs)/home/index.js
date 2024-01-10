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

import {useNavigation} from '@react-navigation/native';
import { getHome } from "../../../../src/requests/User";
import {width, height} from '../../../../src/utils/validator';
import { ScrollView } from 'react-native-gesture-handler';

export default function Page() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState({});

  const homeIconNavList = [{
    name: 'List of Haors',
    icon: 'list',
    route: 'explore'
  },
  {
    name: 'Statistics',
    icon: 'insert-chart',
    route: '/home/statistics'
  },
  {
    name: 'Travel Essentials',
    icon: 'directions-bus',
    route: '/home/travel'
  },
  {
    name: 'Livelihoods',
    icon: 'rowing',
    route: '/home/pages/livelihoods'
  }];

  let isMounted = true;
  var web_url = "https://amarhaor.com/";

  const loadHome = async () => {
    setLoading(true);
    let response = await getHome();
    //alert(JSON.stringify(response, null, 5)) 
    if (response.ok && response.data) {
      if (isMounted){
        setHome(response.data);
        //console.log(JSON.stringify(response, null, 5))
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
    loadHome();
    return () => { isMounted = false };
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{justifyContent:'flex-start',alignItems:'center', backgroundColor: '#ffffff', paddingHorizontal: 16,}}>
      
      <View style={{width: '100%', marginVertical: 16,}}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={homeIconNavList}
          keyExtractor={(item, index)=>{return item.name}}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{width: 90, height: 90, alignItems:'center',}} activeOpacity={1} onPress={() => router.push(`${item.route}`)} >
              <View style={{width: 64, height: 64, backgroundColor: '#35B769', paddingHorizontal: 16, paddingVertical: 16, borderWidth: 1, borderColor: '#35B769', borderRadius: 32}}>
                <MaterialIcons name={item.icon} size={32} color={"#FFFFFF"}/>
              </View>
              <Text style={{fontSize: 11, color: '#49454F', fontWeight: 500, alignItems: 'center', paddingVertical: 8}}>{item.name}</Text>
            </TouchableOpacity>
          )}
          />
      </View>

      <View style={{width: '100%', marginVertical: 0,}}>
        <Text style={{fontSize: 16, color: '#49454F', fontWeight: 500, alignItems: 'flex-start', paddingVertical: 8}}>Explore the Haors</Text>
        <FlatList
          horizontal
          ItemSeparatorComponent={
            <View style={{width: 8, height: '100%', backgroundColor: '#ffffff'}} />
          }
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={home.home_featured_haors_items}
          keyExtractor={(item, index)=>{return item.title}}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{width: 241, height: 298, alignItems:'center', borderRadius: 6, overflow: 'hidden'}} activeOpacity={1} onPress={() => router.push("/home"+item.url)} >
              <Image style={{width: '100%', height: '100%', backgroundColor: '#ccc', resizeMode: 'cover'}} source={{uri:web_url+item.image}}/>
              <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,.1)' }}>
                <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 500, paddingHorizontal: 16, paddingBottom: 4}}>{item.title}</Text>
                <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 500, paddingHorizontal: 16, paddingBottom: 16}}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          )}
          />
      </View>

      <View style={{width: '100%', marginVertical: 16,}}>
        <Text style={{fontSize: 16, color: '#49454F', fontWeight: 500, paddingVertical: 8}}>Conservation Effects</Text>
        <FlatList
          horizontal
          ItemSeparatorComponent={
            <View style={{width: 8, height: '100%', backgroundColor: '#ffffff'}} />
          }
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={home.home_conservation_effects_items}
          keyExtractor={(item, index)=>{return item.title}}
          renderItem={({item, index})=>(
            <TouchableOpacity style={{width: 128, height: 205, alignItems:'center', borderRadius: 6, overflow: 'hidden'}} activeOpacity={1} onPress={() => router.push("/home"+item.url)} >
              <Image style={{width: '100%', height: '100%', backgroundColor: '#ccc', resizeMode: 'cover', }} source={{uri:web_url+item.image}}/>
              <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,.05)'}}>
                <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 500, paddingHorizontal: 16, paddingBottom: 16}}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          />
      </View>

      <View style={{width: '100%', marginVertical: 16,}}>
        <TouchableOpacity style={{width: '100%', height: 80, alignItems:'center', flexDirection: 'row', borderWidth: 1, borderColor: '#CAC4D0'}} activeOpacity={1} onPress={() => router.push("/home/map")} >
          <View style={{ width: width - 112, height: '100%', justifyContent: "center", backgroundColor: '#FEF7FF', padding: 16 }}>
            <Text style={{color: '#1D1B20', fontSize: 16, fontWeight: 500, paddingBottom: 8 }}>Haor Maps</Text>
            <Text style={{color: '#1D1B20', fontSize: 14, fontWeight: 400, }}>Interactive map of Haors</Text>
          </View>
          <Image style={{width: 75, height: 75, }} source={require("../../../../assets/media/map_icon.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', height: 80, alignItems:'center', flexDirection: 'row', borderWidth: 1, borderColor: '#CAC4D0', marginVertical: 16}} activeOpacity={1} onPress={() => router.push("/home/resort")} >
          <View style={{ width: width - 112, height: '100%', justifyContent: "center", backgroundColor: '#FEF7FF', padding: 16 }}>
            <Text style={{color: '#1D1B20', fontSize: 16, fontWeight: 500, paddingBottom: 8 }}>Resort List</Text>
            <Text style={{color: '#1D1B20', fontSize: 14, fontWeight: 400, }}>Locations and contacts</Text>
          </View>
          <Image style={{width: 75, height: 75, }} source={require("../../../../assets/media/resort_icon.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', height: 80, alignItems:'center', flexDirection: 'row', borderWidth: 1, borderColor: '#CAC4D0'}} activeOpacity={1} onPress={() => router.push("/home/travel")} >
          <View style={{ width: width - 112, height: '100%', justifyContent: "center", backgroundColor: '#FEF7FF', padding: 16 }}>
            <Text style={{color: '#1D1B20', fontSize: 16, fontWeight: 500, paddingBottom: 8 }}>Nearby Attractions</Text>
            <Text style={{color: '#1D1B20', fontSize: 14, fontWeight: 400, }}>Nearby Attractions</Text>
          </View>
          <Image style={{width: 75, height: 75, }} source={require("../../../../assets/media/travel_icon.png")}/>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  )
}