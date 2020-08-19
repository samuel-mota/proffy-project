import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// PAGES
import Landing from './src/pages/Landing';


export default function App() {
  return (
    <Landing />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold'
  }
});
