import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainTab from '@/screens/MainTab';
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import SearchScreen from './SearchScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import MakeProfileScreen from './MakeProfileScreen';
import WriteScreen from './WriteScreen';
import ModifyScreen from './ModifyScreen';
import DocumentDetailScreen from './DocumentDetailScreen';
import {RootStackParamList} from 'navigation';
import useLoadEffect from '@/hooks/useLoadEffect';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  useLoadEffect();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="MakeProfile"
          component={MakeProfileScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Write"
          component={WriteScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Modify"
          component={ModifyScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Detail"
          component={DocumentDetailScreen}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default RootStack;
