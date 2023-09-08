import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <Text>App</Text>
      </View>
    </NavigationContainer>
  );
};

// export default App;
export {default} from './.storybook';
