import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTab from '@/screens/MainTab';

const Stack = createNativeStackNavigator();

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
