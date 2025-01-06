import { SafeAreaView } from "react-native";
import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import CardContainer from "@/components/screens/edit-exercises/CardContainer";
import { useCreatePostStore } from "@/stores/create-post.store";
import { useExercicesChoosedStore } from "@/stores/exercices-choosed.store";

export default function EditExercisesScreen() {
  const theme = useTheme();
  // const { exercicesChoosed } = useCreatePostStore();
  const { exercicesChoosed } = useExercicesChoosedStore();
  const updateExercicesChoosed = useCreatePostStore(
    (state) => state.setExercicesChoosed
  );

  const [exerciseIsOpen, setExerciseIsOpen] = useState(-1);

  const toggleTopic = useCallback((index: number) => {
    setExerciseIsOpen((prev) => (prev === index ? -1 : index));
  }, []);


  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background, flex: 1, padding: 12 }}
    >
      <DraggableFlatList
        data={exercicesChoosed}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => {
          updateExercicesChoosed(data);
        }}
        renderItem={({ item, getIndex, drag }) => {
          return <CardContainer item={item} drag={drag} index={getIndex()} />;
        }}
      />
    </SafeAreaView>
  );
}
