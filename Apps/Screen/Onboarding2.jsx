import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Onboarding2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/onboarding/onboarding2.png')} style={styles.image} />
      <Text style={styles.title}>Maternity Mate</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.button}>Get Started</Text>
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

export default Onboarding2;
