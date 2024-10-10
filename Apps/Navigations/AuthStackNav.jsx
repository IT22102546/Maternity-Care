import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding1 from '../Screen/Onboarding1';
import Onboarding2 from '../Screen/Onboarding2';
import LoginScreen from '../Screen/LoginScreen';

const Stack = createStackNavigator();

const AuthStackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding1">
      <Stack.Screen
        name="Onboarding1"
        component={Onboarding1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Onboarding2"
        component={Onboarding2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNav;
