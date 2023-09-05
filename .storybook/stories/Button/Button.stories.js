import React from 'react';
import {View} from 'react-native';
import {MyButton} from './Button';
import Button from '../../../src/components/buttons/Button';

const MyButtonMeta = {
  title: 'MyButton',
  component: Button,
  argTypes: {
    onPress: {action: 'pressed the button'},
  },
  args: {
    text: 'Hello world',
  },
  decorators: [
    Story => (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <View style={{width: 150, height: 40}}>
          <Story />
        </View>
      </View>
    ),
  ],
};

export default MyButtonMeta;

export const Basic = {};

export const AnotherExample = {
  args: {
    text: 'Another example',
  },
};
