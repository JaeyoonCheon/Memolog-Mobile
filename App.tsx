import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import store from '@redux/store';
import RootStack from '@screens/RootStack';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <RootStack></RootStack>
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
// export {default} from './.storybook';
