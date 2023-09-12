import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainTab from '@/screens/MainTab';
import {RootStackParamList} from 'stack';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default RootStack;
