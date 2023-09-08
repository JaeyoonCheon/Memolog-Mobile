import React from 'react';
import {View} from 'react-native';
import Card from '../../../src/components/cards/Card';

const CardMeta = {
  title: 'Card',
  component: Card,
  argTypes: {
    onPress: {action: 'pressed the Card'},
  },
  decorators: [
    Story => (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Story />
      </View>
    ),
  ],
};

export default CardMeta;

export const Basic = {
  args: {
    item: {
      id: 1,
      title: 'string',
      form: 'string',
      nickname: 'string',
    },
  },
};
