import {View, Text} from 'react-native';
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MyDocumentsScreen from './MyDocumentsScreen';
import BrowseScreen from './BrowseScreen';
import ChartScreen from './ChartScreen';
import MoreScreen from './MoreScreen';
import {RootTabParamList} from 'navigation';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

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
      <BottomTab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          headerShown: false,
          tabBarLabel: '통계',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="bar-chart"
              color={color}
              size={size}></MaterialIcons>
          ),
          tabBarActiveTintColor: '#22BCCE',
        }}></BottomTab.Screen>
      <BottomTab.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
          tabBarLabel: '더 보기',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="keyboard-control"
              color={color}
              size={size}></MaterialIcons>
          ),
          tabBarActiveTintColor: '#22BCCE',
        }}></BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

export default MainTab;
