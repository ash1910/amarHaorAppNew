import { View, Text, Button, Alert, Image, FlatList, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native'
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
import { getHome } from "@/src/requests/User";
import {width, height} from '@/src/utils/validator';

import HTML, { useInternalRenderer, HTMLElementModel, HTMLContentModel } from "react-native-render-html";
import WebView from "react-native-webview";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
import ImageViewer from 'react-native-image-zoom-viewer';

export default function Page() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState({});

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

  function CustomImageRenderer(props) {
    const { Renderer, rendererProps } = useInternalRenderer('img', props);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onPress = () => setIsModalOpen(true);
    const onModalClose = () => setIsModalOpen(false);
    const uri = rendererProps.source.uri;
    const thumbnailSource = {
      ...rendererProps.source,
    };
    return (
      <View style={{ alignItems: 'center' }}>
        <Renderer {...rendererProps} source={thumbnailSource} onPress={onPress} />
        <Modal visible={isModalOpen} onRequestClose={onModalClose}>
          <ImageViewer imageUrls={[{url: uri}]} index={0} />
          <TouchableOpacity style={styles.closeBtn} onPress= {onModalClose}>
            <MaterialIcons name='cancel' size={32} color={"rgb(175,175,175)"} />
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'rgba(0,0,0,0.8)',
      fontSize: 18,
    },
    h1: {
      fontSize: '2.0em',
      color: 'rgb(46,46,46)'
    },
    h2: {
      fontSize: '1.7em',
      color: 'rgb(46,46,46)'
    },
    h3: {
      fontSize: '1.67em',
      color: 'rgb(46,46,46)'
    },
    h4: {
      fontSize: '1.5em',
      color: 'rgb(46,46,46)'
    },
    a: {
      color: '#964010',
      textDecorationLine: 'none',
    },
    p: {
      marginBottom: '10px',
      marginTop: 0,
      lineHeight: '2.1em',
    },
    span: {
    }, 
    img: { 
      marginVertical: 10,
    },
    ul:{
      marginBottom: '10px',
    },
    li:{
      marginBottom: '10px',
    },
    iframe: {
      marginTop: 0,
      borderRadius: 0,
      marginHorizontal: 0,
    },
  };

  const customHTMLElementModels = {
    'center': HTMLElementModel.fromCustomModel({
      tagName: 'center',
      mixedUAStyles: {
        flex: 1,
      },
      contentModel: HTMLContentModel.block
    }),
    iframe: iframeModel
  };

  const renderers = {
    //img: CustomImageRenderer,
    iframe: IframeRenderer,
  };

  return (
    <>
        <ScrollView contentContainerStyle={{paddingBottom: 10, backgroundColor: '#fff'}}>
          <View>
            <Image style={{justifyContent: 'center', height: 220, width: width, backgroundColor: '#ccc'}} source={{uri:web_url+home.travel_page_header_image}}/>
            <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,.3)' }}>
              <Text style={{color: '#FFFFFF', fontSize: 28, fontWeight: 500, marginBottom: 10}}>{home.travel_page_title}</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', left: 12, top: 12}}><MaterialIcons name="arrow-back" size={28} color={"#F2F2F2"}/></TouchableOpacity>
          </View>

          <Image style={{justifyContent: 'center', height: 320, width: width, marginVertical: 16}} source={{uri:web_url+home.travel_page_how_to_go_image}}/>
          <HTML 
            baseStyle={{paddingHorizontal: '5%'}}
            WebView={WebView} 
            tagsStyles={tagsStyles} 
            source={{ html: home.travel_page_how_to_go_content || '<p>&nbsp</p>' }} 
            contentWidth={width * .9} 
            defaultWebViewProps={{}} 
            renderers={renderers} 
            customHTMLElementModels={customHTMLElementModels} 
            staticContentMaxWidth= {width}
            renderersProps={{
              iframe: {
                scalesPageToFit: false,
                webViewProps: {
                  allowsFullscreenVideo: true,
                },
              },
            }}
          />
            <Image style={{justifyContent: 'center', height: 320, width: width, marginVertical: 16}} source={{uri:web_url+home.travel_page_where_to_stay_image}}/>

            <HTML 
            baseStyle={{paddingHorizontal: '5%'}}
            WebView={WebView} 
            tagsStyles={tagsStyles} 
            source={{ html: home.travel_page_where_to_stay_content || '<p>&nbsp</p>' }} 
            contentWidth={width * .9} 
            defaultWebViewProps={{}} 
            renderers={renderers} 
            customHTMLElementModels={customHTMLElementModels} 
            staticContentMaxWidth= {width}
            renderersProps={{
              iframe: {
                scalesPageToFit: false,
                webViewProps: {
                  allowsFullscreenVideo: true,
                },
              },
            }}
          />
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 30, 
    height: 30, 
    justifyContent: 'center'
  },

});