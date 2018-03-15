import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'
import OneSignal from 'react-native-onesignal';
import Main from './src/index'

class Login extends Component {
  state = {
    user: '',
    pass: ''
  }
  componentDidMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyB8O35rD0XEawZ6Uvhp1KgZOffT-xn0tTY",
      authDomain: "collegeapp-bedf9.firebaseapp.com",
      databaseURL: "https://collegeapp-bedf9.firebaseio.com",
      projectId: "collegeapp-bedf9",
      storageBucket: "collegeapp-bedf9.appspot.com",
      messagingSenderId: "498341476181"
    });
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }
  handleLogin(){
    const { user, pass } = this.state
    console.log(user, pass)
    firebase.database().ref('/users/' + user).once('value')
    .then(s => {
      if(s.val().password.toString() != pass){
        ToastAndroid.show("Worng password", ToastAndroid.LONG)
      }
      else{
        Actions.dashbaord(user)
        ToastAndroid.show("Logged", ToastAndroid.LONG)
      }
    })
    .catch(err => {
      ToastAndroid.show('No User Found', ToastAndroid.LONG)
    })
    
    
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
  }
  render(){
    return (
      <Main/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  btn: {
    width: '100%',
    paddingVertical:10,
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff'
  }
})


export default Login