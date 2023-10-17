import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppSelector} from '@redux/hooks';

import {RootStackParamList} from 'navigation';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {authState} = useAppSelector(state => state.user);

  useEffect(() => {
    if (authState === 'authorizing') {
      return;
    } else if (authState === 'authorized') {
      navigation.navigate('MainTab');
    } else {
      navigation.navigate('Welcome');
    }
  }, []);

  return (
    <View style={styles.block}>
      <View style={styles.logoBlock}>
        <Text style={styles.logo}>MemoLog</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  logoBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    color: '#000000',
  },
});
