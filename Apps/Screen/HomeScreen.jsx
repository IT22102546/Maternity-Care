import React from 'react';
import { View, Text, Image, ProgressBarAndroid, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'; // For nativewind styling
import Header from '../Components/HomeScreen/Header';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <>
    <ScrollView style={tw`p-6 flex-1 bg-rose-50`}>
    <Header/>

      {/* Large Today Card */}
      <TouchableOpacity style={tw`bg-white rounded-xl shadow-lg mt-5 p-5`}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300' }} // Replace with your actual image URL
          style={tw`w-full h-52 rounded-lg`}
        />
        <View style={tw`absolute top-3 left-3`}>
          <Text style={tw`text-white text-xl font-bold`}>Today</Text>
        </View>
        <View style={tw`absolute bottom-3 left-3`}>
          <Text style={tw`text-white text-lg font-bold`}>Day 102</Text>
        </View>
      </TouchableOpacity>

      {/* Progress Section */}
      <View style={tw`bg-white rounded-xl shadow-lg mt-5 p-5`}>
        <Text style={tw`text-lg font-bold mb-1`}>25 weeks, 3 days to go!</Text>
        <Text style={tw`text-sm text-gray-500 mb-1`}>Second trimester</Text>
        <Text style={tw`text-sm text-gray-500 mb-2`}>Due 22 Mar</Text>
        
        {/* Progress Bar */}
        <ProgressBarAndroid 
          styleAttr="Horizontal" 
          indeterminate={false} 
          progress={0.75} 
          color="#E91E63"
        />
      </View>

      {/* Weeks Card */}
      <View style={tw`bg-white rounded-xl shadow-lg mt-5 p-5 flex-row justify-between items-center`}>
        <View>
          <Text style={tw`text-3xl font-bold`}>14</Text>
          <Text style={tw`text-base text-gray-500`}>Weeks</Text>
        </View>
        <View style={tw`w-16 h-16 bg-pink-100 rounded-full items-center justify-center`}>
          <Text style={tw`text-pink-500 text-xl`}>🎉</Text>
        </View>
      </View>
      
    </ScrollView>
    </>
  );
}
