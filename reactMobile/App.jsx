import React, { useState } from "react";
import Meteor, { withTracker, MeteorListView } from "react-native-meteor";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

Meteor.connect("ws://192.168.X.X:3000/websocket");

export default function App() {
  return (
    <View>
      <Text></Text>
      <Text></Text>
      <Text>Employee Dashboard</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        defaultValue=" First Name"
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        defaultValue=" Last Name"
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        defaultValue=" Job Title"
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        defaultValue=" Current Pay Grade"
      />
      <Button title="Add Employee" onPress={() => Alert.alert("Submitted")} />
      <Button title="Update Info" onPress={() => Animation} />
      <Button
        title="Remove Employee"
        onPress={() => Alert.alert("Are you sure?")}
      />
      <Button title="View Employee" onPress={() => Animation} />
    </View>
  );
}
NetInfo.fetch().then((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

/* componentDidMount() {
          NetInfo.addEventListener(this.handleConnectivityChange);

          // The fetch is not needed as the listen will send the current state when you subscribe to it
      }

    componentWillUnmount() {
      NetInfo.removeEventListener(this.handleConnectivityChange);
    } */

handleConnectivityChange = (state) => {
  if (state.isConnected) {
    Alert.alert("online");
    this.setState({ connection_Status: "Online" });
  } else {
    Alert.alert("offline");
    this.setState({ connection_Status: "Offline" });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
