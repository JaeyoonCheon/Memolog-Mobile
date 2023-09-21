import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import store from '@/redux/store';
import RootStack from '@/screens/RootStack';
import {Interceptor} from '@/api/interceptor';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Interceptor>
            <RootStack></RootStack>
          </Interceptor>
        </QueryClientProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
// export {default} from './.storybook';
