import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import * as firebase from "firebase";

import "firebase/firestore";
import serviceAccount from "./serviceAccountKey.json";
// Initialize Firebase
const firebaseConfig = {
  apiKey: serviceAccount.private_key,
  projectId: serviceAccount.project_id,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
console.log(db);

export default function App() {
  const [users, setUsers] = React.useState([]);

  const logUsers = () => console.log(users);

  React.useEffect(() => {
    db.collection("user")
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        console.log("useEffect");
        let list = [];
        docs.forEach((doc) => list.push(doc.data()));

        setUsers(list);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>できたよ</Text>
      <Button title="セット" onPress={() => logUsers()} />
      {/* <Button title="セット" onPress={() => setData()} /> */}
      {users.map((user) => (
        <Text>{user.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
