import { Box, Button, VStack, HStack, Text, Center, Image } from "native-base";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>

      <HStack>
        <Image
          source={require("../../assets/images/govlogo.png")}
          style={{width: 43, height: 42}}
        />
        <Box>
          <Text>Department of Bangladesh Haor and Wetlands Development</Text>
        </Box>
      </HStack>
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname == "/feed" ? "#fff" : "#000"}
          />
        )}
        label={"Feed"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/feed" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/feed" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/feed");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <AntDesign
            name="user"
            size={size}
            color={pathname == "/profile" ? "#fff" : "#000"}
          />
        )}
        label={"Profile"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/profile" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/profile" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/profile");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons
            name="favorite-outline"
            size={size}
            color={pathname == "/favourites" ? "#fff" : "#000"}
          />
        )}
        label={"Favourites"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/favourites" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/favourites" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/favourites");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="settings-outline"
            size={size}
            color={pathname == "/settings" ? "#fff" : "#000"}
          />
        )}
        label={"Settings"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/settings" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/settings" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/settings");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="favourites" options={{headerShown: true}} />
      <Drawer.Screen name="settings" options={{headerShown: true}} />
    </Drawer>
  );
}

