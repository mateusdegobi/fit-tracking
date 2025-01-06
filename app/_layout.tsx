import { useFonts } from "expo-font";
import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { app } from "@/constants/firebaseConfig";
import { ThemeProvider } from "styled-components/native";
import { useAppearance } from "@/hooks/useAppearance/useAppearance";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme, currentTheme } = useAppearance();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    app;
  }, [app]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style={currentTheme} animated />
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.backgroundContrast,
            },
            headerTintColor: theme.text,
            statusBarBackgroundColor: theme.backgroundContrast,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="edit-exercises/index" />
          <Stack.Screen name="select-exercises/index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="create-post"
            options={{
              title: "Criar Post",
            }}
          />
          <Stack.Screen
            name="details-post/index"
            options={{
              title: "Detalhes",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
