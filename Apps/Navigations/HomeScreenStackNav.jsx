import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';  // Your main Today screen
//import DetailsScreen from '../Screen/DetailsScreen';  // Optional if you have details

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Today" component={HomeScreen} options={{ headerShown: false }} />
      {/* If there are any detailed views or additional screens, add here */}
    </Stack.Navigator>
  );
}
