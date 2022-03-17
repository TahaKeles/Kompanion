import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Login(props) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const login = async () => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response) {
        console.log(response);
        props.navigation.navigate('MainScreen');
      }
    } catch (e) {
      console.log(e);
    }
  };

  function gotoRegister() {
    props.navigation.navigate('Register');
  }

  return (
    <SafeAreaView style={entry_screen.wholeScreen}>
      <View>
        <Image
          style={entry_screen.logoImage}
          source={require('./assets/instagram.jpg')}></Image>
      </View>
      <View style={{marginTop: '2%'}}>
        <Text style={entry_screen.text}> Kompanion </Text>
      </View>
      <View style={{flex: 1, marginTop: '12%'}}>
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
            marginTop: '5%',
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
        <TouchableOpacity onPress={() => login()}>
          <View style={entry_screen.loginWrapper}>
            <Text style={entry_screen.loginText}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => gotoRegister()}>
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
  loginWrapper: {
    marginHorizontal: 57,
    backgroundColor: 'black',
    borderRadius: 69,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
  },
  loginText: {
    paddingVertical: 4,
    fontSize: 18,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerWrapper: {
    marginTop: '5%',
    marginHorizontal: 57,
    backgroundColor: 'white',
    borderRadius: 69,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderColor: 'black',
    borderWidth: 2,
  },
  registerText: {
    paddingVertical: 4,
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoImage: {
    marginTop: '5%',
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
});

export {Login};

/*<SafeAreaView
      style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
      <TextInput
        style={{
          color: 'black',
        }}
        onChangeText={onChangeEmail}
        value={email}
        placeholderTextColor="#6F6F6F"
        placeholder="E Mail"></TextInput>

      <TextInput
        style={{
          color: 'black',
        }}
        onChangeText={onChangePassword}
        value={password}
        placeholderTextColor="#6F6F6F"
        placeholder="Şifre"></TextInput>

      <Button onPress={login} title="Giriş" color="#841584" />
      <Button onPress={gotoRegister} title="Kaydol" color="#841584" />
    </SafeAreaView>*/
