import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons"; // For play button icon
import WavyBackground from "../Components/WavyBackground"; // Import WavyBackground
import tw from "twrnc"; // Tailwind for React Native styling
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"; // Firestore imports
import { useUser } from "@clerk/clerk-expo"; // Clerk for user management
import { firestore } from "../../firebaseConfig"; // Import Firestore instance from Firebase config

export default function ExerciseScreen() {
  const { user } = useUser(); // Get current user details from Clerk
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]); // State to store exercises
  const [loading, setLoading] = useState(true); // Loading state
  const [userData, setUserData] = useState(null); // Store fetched user data from Firestore

  // No need to call getFirestore(firestore), directly use firestore from the config

  // Fetch user data from Firestore using Clerk's user.id
  const fetchUserData = async () => {
    try {
      const userDocRef = doc(firestore, "users", user.id); // Use Clerk's user.id for Firestore lookup
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data()); // Store user data
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch exercises based on user's pregnancy stage
  const fetchExercises = async (pregnancyStage) => {
    try {
      const exercisesRef = collection(firestore, "exercises"); // Reference to the 'exercises' collection

      // Query exercises by pregnancy stage if defined
      let exerciseQuery;
      if (pregnancyStage) {
        exerciseQuery = query(
          exercisesRef,
          where("pregnancyStage", "==", pregnancyStage)
        );
      } else {
        exerciseQuery = query(exercisesRef); // Fetch all exercises if no stage is provided
      }

      const querySnapshot = await getDocs(exerciseQuery);
      const fetchedExercises = [];

      querySnapshot.forEach((doc) => {
        fetchedExercises.push({ id: doc.id, ...doc.data() });
      });

      setExercises(fetchedExercises); // Store fetched exercises
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setLoading(false); // Stop loading on error
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      await fetchUserData(); // Fetch user data

      if (userData?.pregnancyStage) {
        // Fetch exercises based on user’s pregnancy stage
        await fetchExercises(userData.pregnancyStage);
      } else {
        // Fetch all exercises if no pregnancy stage is available
        await fetchExercises();
      }

      setLoading(false); // End loading
    };

    fetchData();
  }, [userData?.pregnancyStage]);

  // Render each exercise item
  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={tw`flex-row items-center bg-white rounded-lg p-4 my-2 shadow`}
      onPress={() =>
        navigation.navigate("ExerciseDetail", { exerciseId: item.id })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={tw`w-16 h-16 rounded-lg`} />
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-lg font-bold`}>{item.exerciseName}</Text>
        <Text style={tw`text-sm text-gray-500`}>{item.description}</Text>
      </View>
      <Ionicons name="play-circle" size={30} color="#E91E63" />
    </TouchableOpacity>
  );

  // Render a loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  return (
    <WavyBackground>
      <View style={tw`flex-1 px-5 pt-2`}>
        <Text style={tw`text-xl font-semibold mt-5 text-pink-600`}>
          Recommended for you
        </Text>

        {/* Featured exercise card */}
        {exercises.length > 0 && (
          <TouchableOpacity
            style={tw`bg-white rounded-2xl p-5 mb-5 shadow-lg relative mt-5`}
            onPress={() =>
              navigation.navigate("ExerciseDetail", {
                exerciseId: exercises[0].id,
              })
            }
          >
            <Image
              source={{ uri: exercises[0].imageUrl }}
              style={tw`w-full h-48 rounded-xl`}
            />
            <View style={tw`mt-4`}>
              <Text style={tw`text-sm text-gray-500`}>
                Let’s Continue, Where you left off!!
              </Text>
              <Text style={tw`text-lg font-bold`}>
                {exercises[0].exerciseName}
              </Text>
            </View>
            <Ionicons
              name="play-circle"
              size={50}
              color="#E91E63"
              style={tw`absolute bottom-5 right-5`}
            />
          </TouchableOpacity>
        )}

        {/* List of exercises */}
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`pb-20`}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExerciseFavourite')}>
          <Text style={styles.buttonText}>My favorites</Text>
        </TouchableOpacity>
        {/* <Text style={tw`text-xl font-semibold mt-5 text-pink-600`}>Recommended for you</Text> */}
      </View>
    </WavyBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});