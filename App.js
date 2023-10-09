import 'react-native-gesture-handler';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import Appwraper from "./src/nav/AppWrapper";

import React from "react";
import { AuthProvider } from './src/context/AuthContext';
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    Cairo: require("./assets/fonts/Cairo.ttf"),
    Alexandria: require("./assets/fonts/Alexandria.ttf"),
    ElMessiri: require("./assets/fonts/ElMessiri.ttf"),
    Marhey: require("./assets/fonts/Marhey.ttf"),
  });
  if (fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return null;
  }
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Appwraper />
    </AuthProvider>
  );
}
