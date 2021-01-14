import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import api from "../../services/api";

import styles from "./styles";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

// function TeacherItem() {
const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited); // if something could change by the user, it needs to be in the useState

  function handleLinkToWhatsapp() {
    api.post('connections', { //add a conection when click on Entrar em Contato
      user_id: teacher.id,
    })

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`); // whatsapp deep link
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");

    
    let favoritesArray = [];
    
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }
    
    if (isFavorited) {
      // remove from favorites
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });
      
      favoritesArray.splice(favoriteIndex, 1);
      
      setIsFavorited(false);
    } else {
      // add to favorites
      favoritesArray.push(teacher);
      
      setIsFavorited(true);
    }

    
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
    //console.log(favorites);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleToggleFavorite}
          style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
        >
          {isFavorited ? (
            <Image source={unfavoriteIcon} />
          ) : (
            <Image source={heartOutlineIcon} />
          )}
        </RectButton>

        <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
          <Image source={whatsappIcon} />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default TeacherItem;