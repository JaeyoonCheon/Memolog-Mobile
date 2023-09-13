import {View, Text} from 'react-native';
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BrowseScreen from './BrowseScreen';
import MyDocumentsScreen from './MyDocumentsScreen';
import {BottomTabParamList} from 'tab';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const MainTab = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="MyDocuments"
        component={MyDocumentsScreen}
        options={{
          headerShown: false,
          tabBarLabel: '내 기록',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="search"
              color={color}
              size={size}></MaterialIcons>
          ),
          tabBarActiveTintColor: '#22BCCE',
        }}></BottomTab.Screen>
      <BottomTab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          headerShown: false,
          tabBarLabel: '탐색',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="search"
              color={color}
              size={size}></MaterialIcons>
          ),
          tabBarActiveTintColor: '#22BCCE',
        }}></BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

export default MainTab;
