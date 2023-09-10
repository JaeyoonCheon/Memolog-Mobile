import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from '@/screens/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack></RootStack>
    </NavigationContainer>
  );
};

// export default App;
export {default} from './.storybook';
