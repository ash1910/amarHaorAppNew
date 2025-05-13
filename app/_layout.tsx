import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, usePathname } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CustomDrawerContent = (props: any) => {
  const pathname = usePathname();
  const itemHoverColor = "#35B769";
  const itemHoverRevereColor = "#FFFFFF";

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
    style={{ backgroundColor: 'white', paddingBottom: 20 }}>

      <View style={styles.userInfoWrapper}>
        <Image
          source={require("@/assets/images/govlogo.png")}
          style={{width: 43, height: 42}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={{color: 'black', fontSize: 12, fontWeight: '400', maxWidth: 180}}>Department of Bangladesh Haor and Wetlands Development</Text>
        </View>
      </View>

      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={20}
            color={pathname == "/feed" ? "#fff" : "#000"}
          />
        )}
        label={"LIST OF HAORS"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/feed" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/feed" ? itemHoverColor : itemHoverRevereColor }}
        onPress={() => {
          router.push("/home/district");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome5
            name="building"
            size={20}
            color={pathname == "/profile" ? "#fff" : "#000"}
          />
        )}
        label={"HAOR BUILDING"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/profile" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/profile" ? itemHoverColor : itemHoverRevereColor }}
        onPress={() => {
          router.push("/home/pages/haor_building");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome5
            name="water"
            size={20}
            color={pathname == "/settings" ? "#fff" : "#000"}
          />
        )}
        label={"RIVERS"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/favourites" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/favourites" ? itemHoverColor : itemHoverRevereColor }}
        onPress={() => {
          router.push("/home/rivers");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="users"
            size={20}
            color={pathname == "/settings" ? "#fff" : "#000"}
          />
        )}
        label={"ABOUT US"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/settings" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/settings" ? itemHoverColor : itemHoverRevereColor }}
        onPress={() => {
          router.push("/home/pages/about-us");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="mail"
            size={20}
            color={pathname == "/feed" ? "#fff" : "#000"}
          />
        )}
        label={"CONTACT US"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/settings" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/settings" ? itemHoverColor : itemHoverRevereColor }}
        onPress={() => {
          router.push("/home/pages/contact-us");
        }}
      />
      
      <View style={{marginLeft: 10, flex: 1, justifyContent: 'flex-end'}}>
        <Text style={{color: 'black', opacity: .5, fontSize: 10, fontWeight: '400'}}>2023 Copyright Amar Haor. All rights reserved. Developed by Technomole Creations ltd</Text>
      </View>

    </DrawerContentScrollView>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
          <Drawer.Screen name="(tabs)" options={{headerShown: false}} />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    fontSize: 14,
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 20,
  }
});
