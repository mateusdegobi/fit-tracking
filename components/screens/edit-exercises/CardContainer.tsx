import { Pressable, View } from "react-native";
import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import Button from "@/components/ui/Button/Button";
import TextInputWithLabel from "@/components/ui/form/TextInputWithLabel/TextInputWithLabel";
import { Text } from "@/components/ui/Text/Text";
import { SerieCardContainer } from "./styles";
import { Exercise, SeriesProps } from "@/core/domains/entities/Workout";
import { useCreatePostStore } from "@/stores/create-post.store";
import { useExercicesChoosedStore } from "@/stores/exercices-choosed.store";

export default function CardContainer({
  item,
  drag,
  index,
}: {
  item: Exercise;
  drag: () => void;
  index: number;
}) {
  // const { exercicesChoosed, setExercicesChoosed } = useCreatePostStore();
    const { exercicesChoosed, setExercicesChoosed } = useExercicesChoosedStore();
  
  const updateExercicesChoosed = useExercicesChoosedStore(
    (state) => state.setExercicesChoosed
  );

  const [exerciseIsOpen, setExerciseIsOpen] = useState(-1);

  const onChangeInfoSeries = useCallback(
    (
      info: Partial<SeriesProps>,
      indexExcercice: number,
      indexSeries: number
    ) => {
      const clone = JSON.parse(JSON.stringify([...exercicesChoosed]));
      clone[indexExcercice].info.series[indexSeries] = {
        ...clone[indexExcercice].info.series[indexSeries],
        ...info,
      };
      setExercicesChoosed(clone);
    },
    [exercicesChoosed, setExercicesChoosed]
  );

  const toggleTopic = useCallback((index: number) => {
    setExerciseIsOpen((prev) => (prev === index ? -1 : index));
  }, []);

  const handleAddSerie = useCallback(
    (itemID: string) => {
      const newState = JSON.parse(JSON.stringify([...exercicesChoosed]));
      const indexSerie = newState.findIndex((ex) => ex.id === itemID);

      if (!newState[indexSerie]?.info?.series) {
        newState[indexSerie].info = {
          ...newState[indexSerie]?.info,
          series: [],
        };
        console.log("indexSerie", newState[indexSerie].info);
      }

      newState[indexSerie].info.series?.push({ reps: 1, weight: 1 });
      updateExercicesChoosed(newState);
    },
    [exercicesChoosed, updateExercicesChoosed]
  );

  const tonelagem = item?.info?.series?.reduce((acc, serie) => {
    return acc + (serie.reps || 0) * (serie.weight || 0);
  }, 0);

  return (
    <Container>
      <Pressable
        onPress={() => toggleTopic(index)}
        onLongPress={drag}
        style={{
          flexDirection: "row",
          marginBottom: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text type="h4">
          <Text type="h6">{index + 1}.</Text> {item?.name}
        </Text>

        <Text type="p5">
          {item?.info?.series?.length
            ? ` (${item?.info?.series?.length} séries)`
            : ""}
        </Text>

        {/* <TouchableOpacity
                        style={{
                          backgroundColor: '#35509f',
                          borderRadius: 5,
                          paddingVertical: 3,
                          paddingHorizontal: 8,
                        }}>
                        <Text type="h6" style={{ color: 'white' }}>
                          INFO
                        </Text>
                      </TouchableOpacity> */}
      </Pressable>

      {tonelagem && tonelagem > 0 && (
        <Text type="p5" style={{ marginBottom: 10, textAlign: "center" }}>
          Tonelagem: {tonelagem} kg
        </Text>
      )}

      {exerciseIsOpen === index && (
        <>
          {item?.info?.series?.map((serie, indexSeries) => (
            <SerieCardContainer index={indexSeries}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text type="h6" style={{ fontSize: 16, fontWeight: 600 }}>
                  Série {indexSeries + 1}:
                </Text>
                <Button
                  title="Remover"
                  type="secondary"
                  onPress={() => {
                    const newState = [...exercicesChoosed];
                    newState[index].info.series?.splice(indexSeries, 1);
                    updateExercicesChoosed(newState);
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 150,
                  }}
                >
                  <Button
                    title=" - "
                    type="secondary"
                    onPress={() => {
                      if ((Number(serie.reps) || 0) > 0) {
                        onChangeInfoSeries(
                          { reps: Number((serie.reps || 0) - 1) },
                          index,
                          indexSeries
                        );
                      }
                    }}
                  />
                  <TextInputWithLabel
                    label="Repetições"
                    value={String(serie.reps) === "0" ? "" : String(serie.reps)}
                    onChangeText={(reps) => {
                      if (reps === "") {
                        return onChangeInfoSeries(
                          { reps: 0 },
                          index,
                          indexSeries
                        );
                      }
                      if (Number(reps)) {
                        onChangeInfoSeries(
                          { reps: Number(reps) },
                          index,
                          indexSeries
                        );
                      }
                    }}
                  />
                  <Button
                    title=" + "
                    type="secondary"
                    onPress={() =>
                      onChangeInfoSeries(
                        { reps: Number((serie.reps || 0) + 1) },
                        index,
                        indexSeries
                      )
                    }
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    title=" - "
                    type="secondary"
                    onPress={() => {
                      if ((Number(serie.weight) || 0) > 0) {
                        onChangeInfoSeries(
                          { weight: Number((serie.weight || 0) - 1) },
                          index,
                          indexSeries
                        );
                      }
                    }}
                  />

                  <TextInputWithLabel
                    label="Carga"
                    style={{ width: 70 }}
                    value={serie.weight === 0 ? "" : String(serie.weight)}
                    onChangeText={(weight) => {
                      if (weight === "") {
                        return onChangeInfoSeries(
                          { weight: 0 },
                          index,
                          indexSeries
                        );
                      }
                      if (Number(weight)) {
                        onChangeInfoSeries(
                          { weight: Number(weight) },
                          index,
                          indexSeries
                        );
                      }
                    }}
                  />

                  <Button
                    title=" + "
                    type="secondary"
                    onPress={() =>
                      onChangeInfoSeries(
                        { weight: Number((serie.weight || 0) + 1) },
                        index,
                        indexSeries
                      )
                    }
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: "center",
                }}
              >
                <TextInputWithLabel
                  label="Descanso"
                  value={serie.rest ? String(serie.rest) : ""}
                  onChangeText={(segs: string) => {
                    if (segs === "") {
                      return onChangeInfoSeries(
                        { rest: Number(segs) },
                        index,
                        indexSeries
                      );
                    }
                    if (Number(segs)) {
                      onChangeInfoSeries(
                        { rest: Number(segs) },
                        index,
                        indexSeries
                      );
                    }
                  }}
                />
              </View>
            </SerieCardContainer>
          ))}

          <Button
            title="Adicionar série"
            type="secondary"
            onPress={() => handleAddSerie(item.id)}
          />
        </>
      )}
    </Container>
  );
}

export const Container = styled.View`
  margin: 10px 0;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.backgroundContrast};
  padding: 10px 10px;
  border-radius: 12px;
`;
