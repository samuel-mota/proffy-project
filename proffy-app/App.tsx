import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppLoading } from 'expo';

// one of them has to import 'useFonts'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

// PAGES
// import Landing from './src/pages/Landing';

// ROUTES
import AppStack from "./src/routes/AppStack";


export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular, 
    Archivo_700Bold,
    Poppins_400Regular, 
    Poppins_600SemiBold
  });

  // while fonts are not loaded, shows the main page (AppLoading)
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      // fragment, it's like a div but it's not send to html <> </>
      <> 
        <AppStack />
        <StatusBar style="inverted" />
      </>
    );
  }
}