import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {Controller, useForm, FormProps} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AxiosError} from 'axios';

import {RootStackParamList} from 'stack';
import Header from '@components/headers/Header';
import TextField from '@/components/textFields/TextField';
import Button from '@components/buttons/Button';
import useSignUp from '@hooks/useSignUp';
import useModal from '@/hooks/useModal';
import {MaterialIconButton} from '@components/buttons/IconButton';
import {verifyEmail} from '@api/auth';
import {commonResponse} from 'api';

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const {
    trigger,
    getValues,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const {mutate: signUp, isLoading: signUpLoading} = useSignUp();

  const {
    mutate: checkMutate,
    isSuccess: isEmailCheckSuccess,
    isError: isEmailCheckError,
  } = useMutation(verifyEmail, {
    onSuccess: data => {
      setIsEmailChecked(true);
    },
    onError: error => {
      const alertMsg = `동일한 이메일이 이미 등록되어있습니다.\n다른 이메일로 등록해주세요.`;
      enableModal({
        modalType: 'ConfirmModal',
        modalProps: {
          innerText: alertMsg,
        },
      });
    },
  });

  const {enableModal, disableModal} = useModal();

  const onPressCheck = async () => {
    const result = await trigger('email');

    if (result) {
      const email = getValues('email');

      checkMutate({
        email: email,
      });
    }
  };
  const onSubmit = (data: SignUpFormData) => {
    if (!isEmailChecked) {
      const alertMsg = `이메일 중복 확인이 진행되지 않았습니다.`;
      enableModal({
        modalType: 'ConfirmModal',
        modalProps: {
          innerText: alertMsg,
        },
      });

      return;
    }

    signUp({
      name: data.name,
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
        <Text style={styles.title}>회원 정보를 입력해주세요</Text>
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        <View>
          <Controller
            control={control}
            rules={{
              required: '이름을 입력해주세요!',
              pattern: {
                value: /^[가-힣]{2,4}|[a-zA-Z]{2,10}$/,
                message: '한글이나 영문으로 입력해주세요',
              },
            }}
            render={({field: {onChange, value}}) => (
              <TextField
                label="이름"
                indicator={errors.name?.message}
                onChange={onChange}
                value={value}></TextField>
            )}
            name="name"></Controller>
          <Controller
            control={control}
            rules={{
              required: '이메일을 입력해주세요!',
              pattern: {
                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: '이메일 형식에 맞게 입력해주세요',
              },
            }}
            render={({field: {onChange, value}}) => (
              <TextField
                label="이메일"
                indicator={errors.email?.message}
                onChange={onChange}
                value={value}></TextField>
            )}
            name="email"></Controller>
          <View style={styles.availButton}>
            <Button label="중복 확인" onPress={onPressCheck}></Button>
          </View>
          <Controller
            control={control}
            rules={{
              required: '비밀번호를 입력해주세요!',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/,
                message:
                  '비밀번호는 8자 이상 15자 미만, 숫자와 특수문자를 포함한 영문이어야 합니다',
              },
            }}
            render={({field: {onChange, value}}) => (
              <TextField
                label="비밀번호"
                isPassword
                indicator={errors.password?.message}
                onChange={onChange}
                value={value}></TextField>
            )}
            name="password"></Controller>
          <Controller
            control={control}
            rules={{
              required: '비밀번호 확인을 입력해주세요!',
              validate: {
                isExact: (value, values) => {
                  return (
                    values.password === values.passwordConfirm ||
                    '입력하신 비밀번호와 일치하지 않습니다!'
                  );
                },
              },
            }}
            render={({field: {onChange, value}}) => (
              <TextField
                label="비밀번호 확인"
                isPassword
                indicator={errors.passwordConfirm?.message}
                onChange={onChange}
                value={value}></TextField>
            )}
            name="passwordConfirm"></Controller>
        </View>
        {signUpLoading ? (
          <ActivityIndicator size="large" color="#22BCCE"></ActivityIndicator>
        ) : (
          <View style={styles.button}>
            <Button
              label="회원 가입하기"
              onPress={handleSubmit(onSubmit)}></Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

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
  availButton: {
    alignSelf: 'flex-end',
    width: 120,
    height: 30,
  },
  button: {
    height: 48,
    marginVertical: 32,
  },
});
