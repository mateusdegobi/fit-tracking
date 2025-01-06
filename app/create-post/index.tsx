import { View, SafeAreaView, FlatList, ScrollView } from "react-native";
import React, { useCallback } from "react";
import TextInputWithLabel from "@/components/ui/form/TextInputWithLabel/TextInputWithLabel";
import { useTheme } from "styled-components/native";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/Text/Text";
import { useCreatePostStore } from "@/stores/create-post.store";
import { useExercicesChoosedStore } from "@/stores/exercices-choosed.store";

export default function CreatePostScreen() {
  const theme = useTheme();
  const { navigate } = useRouter();
  // const { exercicesChoosed } = useCreatePostStore();
  const { exercicesChoosed, setExercicesChoosed } = useExercicesChoosedStore();


  console.log(exercicesChoosed[0]);

  const handleEditExercises = useCallback(() => {
    navigate("/edit-exercises");
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.background, flex: 1, padding: 12 }}
    >
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <TextInputWithLabel label="Título" />

        <Text type="h5">Exercícios</Text>
        <Button title="Editar" type="secondary" onPress={handleEditExercises} />

        <FlatList
          data={exercicesChoosed}
          renderItem={({ item, index }) => (
            <View
              key={item?.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text type="p3">
                {index + 1}. {item?.name}{" "}
                {item?.info?.series?.length && `(${item.info.series.length}s)`}
              </Text>
            </View>
          )}
        />

        <Button
          title="Adicionar Exercício"
          type="secondary"
          onPress={() => navigate("/select-exercises")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
