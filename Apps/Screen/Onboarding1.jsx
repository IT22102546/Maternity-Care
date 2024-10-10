import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const Onboarding1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/onboarding/onboarding1.png')} style={styles.image} />
      <Text style={styles.title}>Maternity Mate</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#8a4fff',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    width: '80%',
  },
});

export default Onboarding1;
