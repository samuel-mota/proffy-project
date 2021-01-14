import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import api from "../../services/api";

import styles from "./styles";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        //console.log(favoritedTeachers);
        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    // executes when screen is focused
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <PageHeader title="Meus proffys favoritos" />

        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {favorites.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
            // "favorited"  empty means true
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default Favorites;
