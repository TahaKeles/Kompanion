import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Register(props) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const __doSignUp = () => {
    if (!email) {
      Alert.alert('Error', 'Email required *');
      return;
    } else if (!password && password.trim() && password.length > 6) {
      Alert.alert('Error', 'Weak password, minimum 6 chars');
      return;
    } else {
      __doCreateUser();
      return;
    }
  };
  const __doCreateUser = async () => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response) {
        console.log(response);
        firestore()
          .collection('Users')
          .add({
            user_email: email,
            user_password: password,
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={entry_screen.wholeScreen}>
      <View
        style={{
          flex: 1,
          marginTop: '40%',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          style={entry_screen.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholderTextColor="#1D1D1D"
          placeholder="Eposta"
          autoCapitalize="none"
        />
        <View
          style={{
            marginTop: '10%',
            marginLeft: '10%',
            height: 50,
            width: 300,
            flexDirection: 'row',
            borderColor: '#1D1D1D',
          }}>
          <TextInput
            style={{
              flex: 1,
              color: '#1D1D1D',
            }}
            onChangeText={onChangePassword}
            value={password}
            placeholderTextColor="#1D1D1D"
            placeholder="Password"
            secureTextEntry={true}></TextInput>
        </View>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => __doSignUp()}>
          <View style={entry_screen.registerWrapper}>
            <Text style={entry_screen.registerText}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const entry_screen = StyleSheet.create({
  input: {
    color: '#1D1D1D',
    marginHorizontal: 40,
    height: 50,
    width: 300,
    borderColor: 'black',
  },
  wholeScreen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  registerWrapper: {
    marginHorizontal: 57,
    backgroundColor: 'white',
    borderRadius: 69,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderColor: 'black',
    borderWidth: 1.5,
  },
  registerText: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Register};
