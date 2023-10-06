declare module 'navigation' {
  import {CardItemProps} from 'card';
  import {DocumentDetail} from 'document';
  export type RootStackParamList = {
    MainTab: undefined;
    Splash: undefined;
    Welcome: undefined;
    Search: undefined;
    SignIn: undefined;
    SignUp: undefined;
    MakeProfile: undefined;
    Write: undefined;
    Modify: {
      id: number;
      documentData: DocumentDetail;
    };
    Detail: {id: number};
  };
  export type RootTabParamList = {
    MyDocuments: undefined;
    Browse: undefined;
    Chart: undefined;
    More: undefined;
  };
}
