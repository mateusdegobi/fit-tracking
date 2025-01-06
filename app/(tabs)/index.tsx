import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View, Text, Button } from "react-native";
import { get, getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const uid = getAuth().currentUser?.uid;
    const path = `/userPosts/${uid}/full`;
    const dbRef = ref(getDatabase(), path);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([key, value]) => ({
            ...value,
            id: key,
          }));
          setPosts(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30, backgroundColor: "black" }}>
      <Text style={{ color: "white", fontSize: 21 }}>Treinos</Text>

      <Link href="/create-post">
        <View
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            alignSelf: "center",
          }}
        >
          <Text>Criar postagem</Text>
        </View>
      </Link>

      

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Link href="/details-post?id=123&name=John">
            <View>
              <Text style={{ color: "white" }}>{item?.title}</Text>
              <Text style={{ color: "white" }}>{item?.description}</Text>
            </View>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
