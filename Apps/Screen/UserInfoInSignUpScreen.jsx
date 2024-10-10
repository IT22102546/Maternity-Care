import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';

const UserInfoInSignUpScreen = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [firstTimeMom, setFirstTimeMom] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  const handleSubmit = () => {
    // Logic to save user info in database (e.g., Firebase)
    navigation.navigate('Home');  // Redirect to home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add your Info</Text>
      <Text style={styles.subtitle}>Tell us about you!</Text>
      
      <Picker selectedValue={age} onValueChange={(itemValue) => setAge(itemValue)} style={styles.input}>
        <Picker.Item label="Age" value="" />
        <Picker.Item label="20-25" value="20-25" />
        <Picker.Item label="26-30" value="26-30" />
        <Picker.Item label="31-35" value="31-35" />
      </Picker>

      <Picker selectedValue={firstTimeMom} onValueChange={(itemValue) => setFirstTimeMom(itemValue)} style={styles.input}>
        <Picker.Item label="First time mom?" value="" />
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      <TextInput
        placeholder="Expected Date"
        style={styles.input}
        value={dueDate}
        onChangeText={(text) => setDueDate(text)}
      />

      <Picker selectedValue={createdBy} onValueChange={(itemValue) => setCreatedBy(itemValue)} style={styles.input}>
        <Picker.Item label="Account created by" value="" />
        <Picker.Item label="Mother" value="Mother" />
        <Picker.Item label="Father" value="Father" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#8a4fff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserInfoInSignUpScreen;
