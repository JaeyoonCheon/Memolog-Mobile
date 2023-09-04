import React from 'react';
import {View} from 'react-native';

import Textfield from '../../../components/textfields/Textfield';

const TextfieldMeta = {
  title: 'Textfield',
  component: Textfield,
  argTypes: {
    onPress: {action: 'pressed the Textfield'},
  },
  decorators: [
    Story => (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Story />
      </View>
    ),
  ],
};

export default TextfieldMeta;

export const Basic = {
  args: {
    label: 'Textfield',
  },
};
