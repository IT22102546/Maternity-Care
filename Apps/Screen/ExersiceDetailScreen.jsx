import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Added setDoc to write to Firestore
import { firestore } from '../../firebaseConfig'; // Import Firestore instance from your config
import { Linking } from 'react-native'; // Import Linking to open URLs
import { useRoute } from '@react-navigation/native'; // To access route params
import { getAuth } from 'firebase/auth'; // To get current user
import tw from 'twrnc';
import { useUser } from '@clerk/clerk-expo';

export default function ExerciseDetailScreen() {
  const route = useRoute();
  const { exerciseId } = route.params; // Get the exerciseId from route params
  const [exerciseData, setExerciseData] = useState(null); // State to hold exercise details
  const auth = getAuth(); // Get Firebase Auth instance
  const { user } = useUser();


  // Fetch exercise details from Firestore based on the exerciseId
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const exerciseDocRef = doc(firestore, 'exercises', exerciseId);
        const exerciseDoc = await getDoc(exerciseDocRef);
        
        if (exerciseDoc.exists()) {
          setExerciseData(exerciseDoc.data());
        } else {
          console.log('No such exercise document!');
        }
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchExerciseData();
  }, [exerciseId]);

  // Function to handle opening the YouTube link
  const openYouTubeLink = () => {
    if (exerciseData && exerciseData.videoUrl) {
      Linking.openURL(exerciseData.videoUrl).catch((err) => 
        console.error('An error occurred while trying to open the URL', err)
      );
    } else {
      Alert.alert('No video URL available');
    }
  };

  // Function to add exercise to favorites
  // Function to add exercise to favorites
const addToFavourites = async () => {
  try {
    if (user && exerciseData) {
      // Use Clerk's user.id instead of Firebase auth.currentUser.uid
      const userId = user.id; // Clerk user ID
      
      // Define reference to the favorites document for the current user
      const favoritesDocRef = doc(firestore, 'favorites', userId);
      
      // Create or update the document with exercise data
      await setDoc(favoritesDocRef, {
        [exerciseId]: { // Use the exerciseId as a key to store multiple favorites
          exerciseName: exerciseData.exerciseName,
          description: exerciseData.description,
          duration: exerciseData.duration,
          ageRange: exerciseData.ageRange,
          intensity: exerciseData.intensity,
          pregnancyStage: exerciseData.pregnancyStage,
          imageUrl: exerciseData.imageUrl,
          videoUrl: exerciseData.videoUrl,
        }
      }, { merge: true }); // Merge the document so it doesn't overwrite existing favorites
      
      Alert.alert('Success', 'Exercise added to favorites!');
    } else {
      Alert.alert('Error', 'User not logged in or no exercise data available.');
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
    Alert.alert('Error', 'An error occurred while adding to favorites.');
  }
};


  // Render a loading spinner while data is being fetched
  if (!exerciseData) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{exerciseData.exerciseName}</Text>
      <Image 
        source={{ uri: exerciseData.imageUrl }} 
        style={styles.image} 
        resizeMode="contain"
      />

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.detailText}>{exerciseData.description}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.detailText}>{exerciseData.duration} minutes</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Age Range:</Text>
          <Text style={styles.detailText}>{exerciseData.ageRange}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Intensity:</Text>
          <Text style={styles.detailText}>{exerciseData.intensity}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Pregnancy Stage:</Text>
          <Text style={styles.detailText}>{exerciseData.pregnancyStage}</Text>
        </View>
      </View>

      {/* Button to open YouTube video */}
      <TouchableOpacity 
        style={styles.button}
        onPress={openYouTubeLink}
      >
        <Text style={styles.buttonText}>Watch Video</Text>
      </TouchableOpacity>

      {/* Button to add to favorites */}
      <TouchableOpacity 
        style={styles.button}
        onPress={addToFavourites}
      >
        <Text style={styles.buttonText}>Add to favorites</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#E91E63',
    borderWidth: 1,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10, // Add spacing between rows
  },
  detailText: {
    fontSize: 15,
    flex: 1, // Make text take the remaining space
    marginLeft: 10, // Add spacing between label and text
  },
  label: {
    fontWeight: 'bold',
    flexBasis: '30%', // Fixed width for labels
  },
  button: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
