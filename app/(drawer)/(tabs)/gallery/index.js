import { View, Text, Button, Alert, Image, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react';
import { useLocalSearchParams, router, Stack } from "expo-router";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";

import {useNavigation} from '@react-navigation/native';
import { getGalleries } from "../../../../src/requests/User";
import {width, height} from '../../../../src/utils/validator';

export default function Page() {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [galleryList, setGalleryList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

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
          keyExtractor={(item, index)=>{return index}}
          numColumns={3}
          renderItem={({item, index})=>(
            <TouchableOpacity onPress={() => {setModalVisible(true); setSelectedImage(item.src);} } >
              <Image style={{justifyContent: 'center', height: width/3 - 4, width: width/3 - 4, margin:2, backgroundColor: '#ccc'}} source={{uri:item.src}}/>
            </TouchableOpacity>
          )}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image style={{width: width-32, height: 400, resizeMode: 'contain',}} source={{uri: selectedImage}}/>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      </View>
    </>
    
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: width,
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: "#35B769",
    marginTop: 16,
    paddingHorizontal: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});