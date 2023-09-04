import React from 'react';
import {View} from 'react-native';
import Header from '../../../components/header/Header';

const HeaderMeta = {
  title: 'Header',
  component: Header,
  argTypes: {
    onPress: {action: 'pressed the Header'},
  },
  decorators: [
    Story => (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Story />
      </View>
    ),
  ],
};

export default HeaderMeta;

export const Basic = {
  args: {
    title: 'Header',
  },
};
