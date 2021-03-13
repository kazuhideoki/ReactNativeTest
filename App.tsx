import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import serviceAccount from "./serviceAccountKey.json";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

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
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");

  const setUser = async () => {
    await db.collection("user").doc().set({
      name: name,
      age: age,
    });
  };
  const getUser = () =>
    db
      .collection("user")
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        console.log("useEffect");
        let list = [];
        docs.forEach((doc) => list.push(doc.data()));

        setUsers(list);
      });

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>できたよ</Text>
      {users.map((user, index) => (
        <Text key={index}>
          {user.name} {user.age}
        </Text>
      ))}
      <View style={styles.textInputView}>
        <Text>名前</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.textInput}
        />
      </View>
      <View style={styles.textInputView}>
        <Text>年齢</Text>
        <TextInput value={age} onChangeText={setAge} style={styles.textInput} />
      </View>
      <Button
        title="追加"
        onPress={() => {
          setUser();
          getUser();
          setName("");
          setAge("");
        }}
      />
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
  textInputView: {
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    borderWidth: 1,
    width: 200,
    // marginTop: "20px",
  },
});
