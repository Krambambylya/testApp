import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { DetailsScreen } from '@/pages/details-screen';
import { PostsScreen } from '@/pages/posts-screen';
import type { RootStackParamList } from '@/shared/config/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigation = React.memo(function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Post details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
