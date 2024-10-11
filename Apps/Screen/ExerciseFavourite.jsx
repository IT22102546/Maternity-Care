import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore'; // Import deleteField
import { firestore } from '../../firebaseConfig'; // Firestore config
import { useUser } from '@clerk/clerk-expo'; // Clerk for user authentication
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native'; // Import navigation

export default function FavouriteExercisesScreen() {
  const [favoriteExercises, setFavoriteExercises] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useUser(); // Get the logged-in user from Clerk
  const navigation = useNavigation(); // Access navigation

  // Function to fetch user's favorite exercises
  const fetchFavoriteExercises = async () => {
    try {
      if (!user) {
        throw new Error('User not logged in');
      }

      // Get the user's favorite document from Firestore
      const userId = user.id; // Clerk user ID
      const favoritesDocRef = doc(firestore, 'favorites', userId);
      const favoritesDoc = await getDoc(favoritesDocRef);

      if (favoritesDoc.exists()) {
        const favoriteExerciseIds = Object.keys(favoritesDoc.data()); // Extract exercise IDs from user's favorites

        // Fetch each exercise's details from the 'exercises' collection
        const exerciseDataPromises = favoriteExerciseIds.map(async (exerciseId) => {
          const exerciseDocRef = doc(firestore, 'exercises', exerciseId);
          const exerciseDoc = await getDoc(exerciseDocRef);
          return exerciseDoc.exists() ? { id: exerciseId, ...exerciseDoc.data() } : null;
        });

        const exerciseData = await Promise.all(exerciseDataPromises);
        const validExercises = exerciseData.filter(exercise => exercise !== null); // Filter out any null values

        setFavoriteExercises(validExercises); // Update state with the fetched exercises
      } else {
        Alert.alert('No Favorites', 'You have no favorite exercises yet.');
      }

    } catch (error) {
      console.error('Error fetching favorite exercises:', error);
      Alert.alert('Error', 'An error occurred while fetching your favorite exercises.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Function to delete an exercise from favorites
  const removeFromFavorites = async (exerciseId) => {
    try {
      if (!user) {
        throw new Error('User not logged in');
      }

      // Get reference to the user's favorites document
      const userId = user.id;
      const favoritesDocRef = doc(firestore, 'favorites', userId);

      // Update the document by removing the specific exercise
      await updateDoc(favoritesDocRef, {
        [exerciseId]: deleteField(), // Correct function to delete the field
      });

      // Remove the deleted exercise from local state
      setFavoriteExercises(prevFavorites => prevFavorites.filter(exercise => exercise.id !== exerciseId));

      Alert.alert('Success', 'Exercise removed from favorites.');
    } catch (error) {
      console.error('Error removing favorite:', error);
      Alert.alert('Error', 'An error occurred while removing the exercise from favorites.');
    }
  };

  // Fetch favorite exercises when the component mounts
  useEffect(() => {
    fetchFavoriteExercises();
  }, []);

  // Render loading spinner if data is still being fetched
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  // Render the list of favorite exercises
  return (
    <ScrollView style={styles.container}>
      {favoriteExercises.length > 0 ? (
        favoriteExercises.map((exercise, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.exerciseCard}
            onPress={() =>
              navigation.navigate("ExerciseDetail", { // Navigate to ExerciseDetail
                exerciseId: exercise.id, // Pass exerciseId as a parameter
              })
            }
          >
            <Text style={styles.title}>{exercise.exerciseName}</Text>
            <Image 
              source={{ uri: exercise.imageUrl }} 
              style={styles.image} 
              resizeMode="contain"
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.detailText}>{exercise.description}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Duration:</Text>
              <Text style={styles.detailText}>{exercise.duration} minutes</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Intensity:</Text>
              <Text style={styles.detailText}>{exercise.intensity}</Text>
            </View>

            {/* Button to remove exercise from favorites */}
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeFromFavorites(exercise.id)}
            >
              <Text style={styles.buttonText}>Remove from Favorites</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={tw`text-center mt-10`}>You have no favorite exercises.</Text>
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffff',
  },
  exerciseCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#E91E63',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
