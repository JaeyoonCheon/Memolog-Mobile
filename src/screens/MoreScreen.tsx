import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useMutation} from '@tanstack/react-query';
import storage from '@react-native-firebase/storage';

import Header from '@/components/headers/Header';

const MoreScreen = () => {
  return (
    <View style={styles.block}>
      <Header title="더 보기"></Header>
      <View style={styles.profileBlock}>
        <TouchableOpacity style={styles.profileButton}></TouchableOpacity>
        <Text style={styles.helloText}>{`test 님 안녕하세요!`}</Text>
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.menuBlock}>
          <Text style={styles.menuLabel}>닉네임 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBlock}>
          <Text style={styles.menuLabel}>앱 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBlock} onPress={() => {}}>
          <Text style={styles.menuLabel}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: '#FFFFFF'},
  profileBlock: {
    height: 200,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    marginVertical: 16,
    width: 150,
    height: 150,

    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#95F1FF',
    overflow: 'hidden',
  },
  profileImage: {
    width: 150,
    height: 150,
  },
  helloText: {
    fontSize: 28,
  },
  menuBlock: {
    height: 48,
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#9c9c9c',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
});
