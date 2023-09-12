declare module 'stack' {
  import {NativeStackScreenProps} from '@react-navigation/native-stack';
  export type RootStackParamList = {
    MainTab: undefined;
    Splash: undefined;
    Welcome: undefined;
    MySearch: undefined;
    SignIn: undefined;
    SignUp: undefined;
    MakeProfile: undefined;
    Write: undefined;
    Modify: undefined;
    Detail: {id: number};
  };
}
