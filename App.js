import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClerkProvider, SignedOut, SignedIn } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';
import AuthStackNavigator from './Apps/Navigations/AuthStackNavigator'; // Assuming this handles authentication flow

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    // Check if it's the first time the app is launched
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');  // Set a flag to mark that the user has seen onboarding
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // Avoid rendering until first launch state is determined
  }

  return (
    <ClerkProvider publishableKey='pk_test_d2FudGVkLWdyYWNrbGUtNjkuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <View className="flex-1 bg-white">
        <StatusBar style="auto" />

        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>

        <SignedOut>
          <AuthStackNavigator /> {/* Renders the auth stack when user is signed out */}
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}
