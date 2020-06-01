/* eslint-disable react-native/no-inline-styles */
/**
 * @flow strict-local
 */

import React, {useState} from 'react';
import Meteor, {withTracker, NetInfo} from 'react-native-meteor';
import {Text, View, TextInput, Button, Alert} from 'react-native';

//Replace the 1.13 part of below with your IP
Meteor.connect('ws://192.168.1.13:3000/websocket');

const App = props => {
  const [currInfo, setCurrInfo] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [paygrade, setPaygrade] = useState('');

  const handleSubmit = () => {
    Meteor.call('submitInfo', [firstName, lastName, title, paygrade]);
  };

  //No handling of employees with same name -> Give them a role designation "Dev 2"
  const handleUpdate = () => {
    Meteor.call('updateInfo', [firstName, lastName, title, paygrade]);
  };

  const handleRemove = () => {
    Meteor.call('removeInfo', {
      firstName: firstName,
      lastName: lastName,
    });
  };

  const handleView = () => {
    let enteredData = props.in.find(docObject => {
      return (
        docObject.firstName === firstName && docObject.lastName === lastName
      );
    });
    if (enteredData === undefined) {
      Alert.alert(
        'No Employee with that name.',
        'Please verify the information entered is correct',
      );
    } else {
      setCurrInfo({
        firstName: enteredData.firstName,
        lastName: enteredData.lastName,
        title: enteredData.title,
        paygrade: enteredData.paygrade,
      });
    }
  };

  return (
    <View>
      <Text />
      <Text />
      <Text> HR Employee Dashboard</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder=" First Name"
        //onChange={event => handleFirstName(event)}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder=" Last Name"
        //onChange={event => handleLastName(event)}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder=" Job Title"
        //onChange={event => handleTitle(event)}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray'}}
        placeholder=" Current Pay Grade"
        //onChange={event => handlePaygrade(event)}
        onChangeText={text => setPaygrade(text)}
      />
      <Button title="Add Employee" onPress={() => handleSubmit()} />
      <Button title="Update Info" onPress={() => handleUpdate()} />
      <Button title="Remove Employee" onPress={() => handleRemove()} />
      <Button title="View Employee" onPress={() => handleView()} />
      <View>
        <Text>{`First Name: ${currInfo?.firstName ?? 'n/a'}`}</Text>
        <Text>{`Last Name: ${currInfo?.lastName ?? 'n/a'}`}</Text>
        <Text>{`Title: ${currInfo?.title ?? 'n/a'}`}</Text>
        <Text>{`Paygrade: ${currInfo?.paygrade ?? 'n/a'}`}</Text>
      </View>
    </View>
  );
};

const infoContainer = withTracker(() => {
  const view = Meteor.subscribe('All_Info');
  const loading = !view.ready();
  return {
    loading,
    in: Meteor.collection('Info').find(),
  };
})(App);
export default infoContainer;
