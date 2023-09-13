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
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {useUserContext} from '@contexts/UserContext';
import useSignOut from '@hooks/useSignOut';
import BaseHeader from '@components/headers/BaseHeader';
import {changeUserProfileImage} from '@api/user';
import DefaultImage from '@assets/user.png';

const MoreScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useUserContext();
  const {setItem: setUserInfo} = useAsyncStorage('UserInfo');
  const [isLoading, signOut] = useSignOut();

  const {mutate: changeProfileImageMutate} = useMutation(
    changeUserProfileImage,
    {
      onSuccess: data => {
        setUser({
          ...user,
          profile_image_url: data.profile_image_url,
        });
        setUserInfo(JSON.stringify(user));
      },
    },
  );

  const onPressChangeImage = async () => {
    try {
      const image = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      });

      if (!image) {
        throw Error('None Selected Image');
      }

      const fileName = image.assets[0].fileName;
      const uploadImageRef = storage().ref('profile_image/' + fileName);

      await uploadImageRef.putFile(image.assets[0].uri);
      const downloadUrl = await uploadImageRef.getDownloadURL();

      changeProfileImageMutate({
        profile_image_url: downloadUrl,
      });
    } catch (e) {
      return;
    }
  };

  return (
    <View style={styles.block}>
      <BaseHeader title="더 보기"></BaseHeader>
      <View style={styles.profileBlock}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onPressChangeImage}>
          {user?.profile_image_url ? (
            <Image
              style={styles.profileImage}
              source={{uri: user?.profile_image_url}}></Image>
          ) : (
            <Image style={styles.profileImage} source={DefaultImage}></Image>
          )}
        </TouchableOpacity>
        <Text style={styles.helloText}>{`${user?.name} 님 안녕하세요!`}</Text>
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.menuBlock}>
          <Text style={styles.menuLabel}>닉네임 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBlock}>
          <Text style={styles.menuLabel}>앱 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBlock}
          onPress={() => {
            signOut();
            {
              isLoading && navigation.navigate('Splash');
            }
          }}>
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
