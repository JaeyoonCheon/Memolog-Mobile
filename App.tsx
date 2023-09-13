import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import RootStack from '@/screens/RootStack';

const queryClient = new QueryClient();

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <RootStack></RootStack>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
// export {default} from './.storybook';
