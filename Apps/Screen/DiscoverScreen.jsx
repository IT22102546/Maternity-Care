import React from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc"; // For nativewind styling
import Header from "../Components/HomeScreen/Header";

export default function DiscoverScreen() {
  const navigation = useNavigation();

  // Sample function to handle category press
  const handleCategoryPress = (category) => {
    navigation.navigate("CategoryDetail", { category });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-rose-50`}>
      <ScrollView style={tw`p-6`}>
        <Header />

        <Text style={tw`text-2xl font-bold mb-4 text-left mt-5 text-rose-600`}>
          Discover Content
        </Text>

        <View style={tw`pb-10`}>
          {/* Category Cards */}
          <TouchableOpacity
            onPress={() => handleCategoryPress("Week by week")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Week by week
            </Text>
            <Text style={tw`text-gray-500`}>
              Track the progress of your pregnancy week by week.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Nutrition")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Nutrition
            </Text>
            <Text style={tw`text-gray-500`}>
              Learn about healthy eating during pregnancy.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Body")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>Body</Text>
            <Text style={tw`text-gray-500`}>
              Understand how your body changes during pregnancy.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Exercise")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Exercise
            </Text>
            <Text style={tw`text-gray-500`}>
              Discover safe exercises for each trimester.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Baby")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>Baby</Text>
            <Text style={tw`text-gray-500`}>
              Learn about baby’s development during pregnancy.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Relationships")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Relationships
            </Text>
            <Text style={tw`text-gray-500`}>
              Tips for maintaining healthy relationships.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Labour")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>Labour</Text>
            <Text style={tw`text-gray-500`}>
              Prepare yourself for labor and delivery.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Multiples")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Multiples
            </Text>
            <Text style={tw`text-gray-500`}>
              Advice for expecting twins, triplets, or more.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Lifestyle")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Lifestyle
            </Text>
            <Text style={tw`text-gray-500`}>
              Maintain a balanced lifestyle during pregnancy.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCategoryPress("Fertility")}
            style={tw`bg-white p-4 rounded-lg shadow-md mt-4`}
          >
            <Text style={tw`text-lg font-semibold text-gray-800`}>
              Fertility
            </Text>
            <Text style={tw`text-gray-500`}>
              Understand fertility and pregnancy health.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
