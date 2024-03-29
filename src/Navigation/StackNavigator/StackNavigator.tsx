import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../Screens/HomeScreen/HomeScreen";
import CreateNewPostScreen from "../../Screens/CreateNewPostScreen/CreateNewPostScreen";
import { Platform } from "react-native";

function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const navigationRef: any = createRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          animation: Platform.OS === "android" ? "fade_from_bottom" : "default",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateNewPost" component={CreateNewPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
