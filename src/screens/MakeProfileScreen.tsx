import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useMutation} from '@tanstack/react-query';
import storage from '@react-native-firebase/storage';

import {RootStackParamList} from 'navigation';
import TextField from '@components/textFields/TextField';
import Button from '@components/buttons/Button';
import {updateUser} from '@api/user';
import UserImage from '@assets/user.png';

const MakeProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [profileImage, setProfileImage] = useState<Asset | null>(null);
  const [nickname, setNickname] = useState('');

  const {mutate: updateUserMutate} = useMutation(updateUser, {
    onError: () => {
      setProfileImage(null);
      setNickname('');
    },
    onSuccess: data => {
      console.log(data);
      navigation.navigate('MainTab');
    },
  });

  const onPressChangeImage = async () => {
    const image = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: Platform.OS === 'android',
    });

    if (image.assets) {
      setProfileImage(image.assets[0]);
    }
  };
  const onChangeNickname = (text: string) => {
    setNickname(text);
  };
  const onPressConfirm = async () => {
    const fileNameRegex = /\/([^/]+)$/;

    if (!profileImage) {
      updateUserMutate({
        nickname,
        profile_image_url: '',
      });
      return;
    }
    const fileName = profileImage.fileName;

    if (!profileImage.fileName) return;
    const uploadImageRef = storage().ref('profile_image/' + fileName);

    if (!profileImage.uri) return;
    await uploadImageRef.putFile(profileImage.uri);
    const downloadUrl = await uploadImageRef.getDownloadURL();

    updateUserMutate({
      nickname,
      profile_image_url: downloadUrl,
    });
  };

  return (
    <View style={styles.block}>
      <View style={styles.profileImageBlock}>
        <TouchableOpacity
          style={styles.profileImageButton}
          onPress={onPressChangeImage}>
          <View style={styles.profileImage}>
            {profileImage ? (
              <Image
                style={styles.image}
                source={{uri: profileImage.uri}}></Image>
            ) : (
              <Image style={styles.image} source={UserImage}></Image>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.messageBlock}>
        <Text
          style={
            styles.message
          }>{`사용하실 프로필 이미지와\n닉네임을 입력해주세요`}</Text>
      </View>
      <View style={styles.nicknameBlock}>
        <TextField
          label="닉네임"
          value={nickname}
          onChange={onChangeNickname}></TextField>
        <View style={styles.confirmButton}>
          <Button label="확인" onPress={onPressConfirm}></Button>
        </View>
      </View>
    </View>
  );
};

export default MakeProfileScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileImageBlock: {
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageButton: {},
  profileImage: {
    width: 200,
    height: 200,

    borderRadius: 100,
    borderColor: '#22BCCE',
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 200,
  },
  messageBlock: {
    flexGrow: 1,
    marginVertical: 32,
    marginHorizontal: 16,

    justifyContent: 'center',
  },
  message: {
    fontSize: 24,
  },
  nicknameBlock: {
    marginHorizontal: 16,
  },
  confirmButton: {
    height: 48,
    marginVertical: 32,
  },
});
