import { Text, Button } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputWithLabel from "@/components/ui/form/TextInputWithLabel/TextInputWithLabel";

export default function index() {
  const { navigate } = useRouter();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(async () => {
    try {
      const sign = await signInWithEmailAndPassword(
        getAuth(),
        email.toLowerCase().trim(),
        password
      );
      if (sign) {
        navigate("/(tabs)");
      }
    } catch (error) {
      console.error(error);
    }
  }, [signInWithEmailAndPassword, email, password]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (uid) {
        navigate("/(tabs)");
      }
    }
  }, [mounted, getAuth]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30, backgroundColor: "black" }}>
      <Text style={{ color: "white" }}>Login</Text>

      <TextInputWithLabel
        label="Email"
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInputWithLabel
        label="Password"
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button title="Sign in" onPress={handleLogin} />
    </SafeAreaView>
  );
}
