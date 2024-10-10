import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "@clerk/clerk-expo"; // Import Clerk for user details
import { auth, firestore } from "../../firebaseConfig"; // Firebase Auth and Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import tw from "twrnc";

export default function ProfileScreen({ navigation }) {
  const { user } = useUser(); // Fetch user data from Clerk
  const [age, setAge] = useState("");
  const [firstTimeMom, setFirstTimeMom] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const userId = auth.currentUser?.uid; // Get the current user's ID

  const handleSubmit = async () => {
    if (!userId) return; // Ensure user is logged in

    try {
      // Update user document with additional information
      await setDoc(
        doc(firestore, "users", userId),
        {
          age,
          firstTimeMom,
          dueDate,
          createdBy,
          pregnancyStage: calculatePregnancyStage(dueDate), // Automatically calculate pregnancy stage from due date
        },
        { merge: true }
      ); // Use merge to avoid overwriting existing fields

      // Navigate to the home screen after submitting info
      Alert.alert("Success", "Profile updated successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Error", "There was an issue updating your profile.");
    }
  };

  // Helper function to calculate pregnancy stage from due date
  const calculatePregnancyStage = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const weeks = Math.floor((due - now) / (7 * 24 * 60 * 60 * 1000)); // Convert to weeks

    if (weeks <= 13) return "firstTrimester";
    if (weeks <= 27) return "secondTrimester";
    return "thirdTrimester";
  };

  return (
    <ScrollView style={tw`p-6 flex-1`}>
      <View style={styles.container}>
        {/* Profile Image and Name */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
          <Text style={styles.profileName}>{user?.fullName}</Text>
          <Text style={styles.profileEmail}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        {/* Form Section */}
        <Text style={styles.title}>Update Your Profile</Text>

        {/* Age Picker */}
        <Picker
          selectedValue={age}
          onValueChange={(itemValue) => setAge(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select your age" value="" />
          <Picker.Item label="20-25" value="20-25" />
          <Picker.Item label="26-30" value="26-30" />
          <Picker.Item label="31-35" value="31-35" />
        </Picker>

        {/* First Time Mom Picker */}
        <Picker
          selectedValue={firstTimeMom}
          onValueChange={(itemValue) => setFirstTimeMom(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="First time mom?" value="" />
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </Picker>

        {/* Due Date Input */}
        <TextInput
          placeholder="Expected Due Date (YYYY-MM-DD)"
          style={styles.input}
          value={dueDate}
          onChangeText={(text) => setDueDate(text)}
        />

        {/* Created By Picker */}
        <Picker
          selectedValue={createdBy}
          onValueChange={(itemValue) => setCreatedBy(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Account created by" value="" />
          <Picker.Item label="Mother" value="Mother" />
          <Picker.Item label="Father" value="Father" />
        </Picker>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 16,
    color: "#555",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#E91E63",
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#E91E63",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
