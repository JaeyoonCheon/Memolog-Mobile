import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from 'stack';
import Header from '@components/headers/Header';
import TextField from '@/components/textFields/TextField';
import Button from '@components/buttons/Button';
import useSignIn from '@hooks/useSignIn';
import {MaterialIconButton} from '@components/buttons/IconButton';
import {SignInPayload} from 'auth';

const SignInScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isRemember, setIsRemember] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {mutate: signInMutate, isLoading} = useSignIn(isRemember);

  const onSubmit = (data: SignInPayload) => {
    if (isLoading) {
      return;
    }

    signInMutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <View style={styles.block}>
      <Header
        leftButtons={
          <MaterialIconButton
            iconName="arrow-back"
            size={24}
            color="#000000"
            onPress={() => navigation.goBack()}></MaterialIconButton>
        }></Header>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>로그인 정보를 입력해주세요</Text>
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <View>
          <Controller
            control={control}
            rules={{
              required: '이메일을 입력해주세요!',
            }}
            render={({field: {onChange, value}}) => (
              <TextField
                label="이메일"
                indicator={errors.email?.message}
                onChange={onChange}
                value={value}></TextField>
            )}
            name="email"></Controller>
          <Controller
            control={control}
            rules={{
              required: '비밀번호를 입력해주세요!',
            }}
            render={({field: {onChange, value}}) => (
              <TextField
                label="비밀번호"
                indicator={errors.password?.message}
                isPassword
                onChange={onChange}
                value={value}></TextField>
            )}
            name="password"></Controller>
          <BouncyCheckbox
            style={styles.checkbox}
            size={20}
            fillColor="#22BCCE"
            text="자동로그인"
            iconStyle={{borderRadius: 5}}
            innerIconStyle={{borderRadius: 5}}
            textStyle={{textDecorationLine: 'none', fontSize: 12}}
            textContainerStyle={{marginLeft: 8}}
            isChecked={isRemember}
            onPress={() => setIsRemember(!isRemember)}></BouncyCheckbox>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#22BCCE"></ActivityIndicator>
        ) : (
          <View style={styles.button}>
            <Button
              label="로그인하기"
              onPress={handleSubmit(onSubmit)}></Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  titleBlock: {
    marginVertical: 32,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  form: {
    flexGrow: 1,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  checkbox: {
    marginVertical: 4,
    alignSelf: 'flex-end',
  },
  button: {
    height: 48,
    marginVertical: 32,
  },
});
