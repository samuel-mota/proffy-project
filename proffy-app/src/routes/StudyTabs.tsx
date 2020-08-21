import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // many icons packages

// PAGES
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';


const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    // there is no NavigationContainer tag, because it's already in AppStack where it will be called 
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0, // same as box-shadow Android
          shadowOpacity: 0, // same as box-shadow iOS
          height: 64, // tabs height
        },
        tabStyle: { // style each tab
          flexDirection: 'row', // to add an icon and they be beside
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: { 
          flex: 0, // not occupy max possible size
          width: 20,
          height: 20,
        },
        labelStyle: { // text inside tabs
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc', // tab color when is not selected
        activeBackgroundColor: '#ebebf5', // tab color selected
        inactiveTintColor: '#c1bccc', // text tab color when is not selected
        activeTintColor: '#32264d', // tab text selected
      }}
    
    >
      <Screen 
        name="TeacherList" 
        component={TeacherList} 
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => { // color (active and inactive) and size (iconStyle) are defined above
            return (
              <Ionicons name='ios-easel' size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }}
      />
      <Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => { // color (active and inactive) and size (iconStyle) are defined above
            return (
              <Ionicons name='ios-heart' size={size} color={focused ? '#8257e5' : color} />
            )
          }
        }}  
      />
    </Navigator>
  );
}

export default StudyTabs;