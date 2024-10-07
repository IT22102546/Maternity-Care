import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons
import Header from '../Components/HomeScreen/Header';
import tw from 'twrnc';

export default function ToolsScreen() {
  const navigation = useNavigation(); // Get navigation instance

  return (
    <ScrollView style={tw`p-6 bg-pink-100 flex-1 `}>
      {/* Buttons for Tools */}
      <Header/>
      <Text style={tw`text-xl mt-5 mb-5`}>Tools for you.</Text>
        <ToolButton icon="fitness-outline" label="Exercise" onPress={() => navigation.navigate('Exercise')} />
        <ToolButton icon="medkit-outline" label="Symptom Tracking" onPress={() => navigation.navigate('Symptom Tracking')} />
        <ToolButton icon="nutrition-outline" label="Nutrition Tracking" onPress={() => navigation.navigate('Nutrition Tracking')} />
        <ToolButton icon="scale-outline" label="My Weight" onPress={() => navigation.navigate('My Weight')} />
        <ToolButton icon="calendar-outline" label="Appointments" onPress={() => navigation.navigate('Appointments')} />
        <ToolButton icon="bag-outline" label="Hospital Bag" onPress={() => navigation.navigate('Hospital Bag')} />
        {/* <ToolButton icon="calendar-outline" label="Make an appointment" onPress={() => navigation.navigate('Navigate to Make an appointment')} /> */}
      
    </ScrollView>
  );
}

// Helper component for buttons
function ToolButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="#E91E63" style={{ marginRight: 15 }} />
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
}
