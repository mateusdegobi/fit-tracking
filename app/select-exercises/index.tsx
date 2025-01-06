import Button from "@/components/ui/Button/Button";
import { Text } from "@/components/ui/Text/Text";
import { Exercise } from "@/core/domains/entities/Workout";
import { useUserExerciceList } from "@/hooks/useUserExerciceList/useUserExerciceList";
import { useExercicesChoosedStore } from "@/stores/exercices-choosed.store";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import styled, { useTheme } from "styled-components/native";
import React from "react";

export default function SelectExercisesScreen() {
  const { getExercises } = useUserExerciceList();
  const { goBack } = useNavigation();
  const { exercicesChoosed, setExercicesChoosed } = useExercicesChoosedStore();
  const colors = useTheme();

  const [exercices, setExercices] = useState<Exercise[]>();
  const [selectedExercices, setSelectedExercices] = useState<{
    [key: string]: {
      isSelected: boolean;
    } & Exercise;
  }>({});

  useEffect(() => {
    async function loadExercices() {
      const data = await getExercises();
      setExercices(data);
    }

    loadExercices();
  }, [getExercises]);

  useEffect(() => {
    if (exercicesChoosed.length) {
      setSelectedExercices(
        exercicesChoosed.reduce((acc, item) => {
          acc[item.id] = {
            ...item,
            isSelected: true,
          };
          return acc;
        }, {})
      );
    }
  }, [exercicesChoosed]);

  const handleSelectExercice = useCallback((item: Exercise) => {
    setSelectedExercices((prevState) => ({
      ...prevState,
      [item.id]: {
        ...item,
        isSelected: !prevState[item.id]?.isSelected,
      },
    }));
  }, []);

  const handleConfirmSelectedExercices = useCallback(() => {
    const selecteds = Object.values(selectedExercices).filter((item) => item.isSelected);
    setExercicesChoosed(selecteds);
    goBack();
  }, [goBack, selectedExercices, setExercicesChoosed]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1 }}>
        <FlatList
          data={exercices}
          renderItem={({ item, index }) => (
            <Row
              style={{ flexDirection: 'row' }}
              isSelected={selectedExercices[item.id]?.isSelected}
              index={index}
              onPress={() => handleSelectExercice(item)}>
              <Text
                type={selectedExercices[item.id]?.isSelected ? 'h5' : 'p4'}
                color={selectedExercices[item.id]?.isSelected ? 'primary' : colors.text}>
                {item.name}
              </Text>
              <Text
                type={selectedExercices[item.id]?.isSelected ? 'h6' : 'p5'}
                color={selectedExercices[item.id]?.isSelected ? 'primary' : colors.text}>
                {item?.info?.weight}
                {item?.info?.weightUnit}
              </Text>
            </Row>
          )}
        />

        <Button title="Confirmar selecionados" onPress={handleConfirmSelectedExercices} />
      </Container>
    </SafeAreaView>
  );
}


export const Container = styled.View`
  flex: 1;
  padding: 12px;
  background-color: ${({ theme }) => theme.background};
`;

type RowProps = {
  index: number;
  isSelected?: boolean;
};

export const Row = styled.Pressable<RowProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: ${({ theme, index }) =>
    index % 2 === 0 ? theme.background : theme.backgroundContrast};

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background-color: ${theme.border};
  `}
`;
