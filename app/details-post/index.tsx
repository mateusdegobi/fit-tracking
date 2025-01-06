import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function DetailsExercisesScreen() {
  const { id, name } = useLocalSearchParams();

  return (
    <View>
      <Text style={{ color: "white" }}>{name}</Text>
    </View>
  );
}
