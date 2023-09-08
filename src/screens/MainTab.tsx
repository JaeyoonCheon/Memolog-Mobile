import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BrowseScreen from './BrowseScreen';

const BottomTab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <BottomTab.Navigator>
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
