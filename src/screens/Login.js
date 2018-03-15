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
import {  Form, Item, Input, Label, Button } from 'native-base';

class Login extends Component {
	state = {
		user: '',
		pass: ''
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
	render(){
		return (
			<View style={styles.container}>


				<Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={text => this.setState({user : text})} values={this.state.user}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={text => this.setState({pass : text})} values={this.state.pass}/>
            </Item>
            <Button block dark rounded success onPress={this.handleLogin.bind(this)} style={{marginTop: 20}}>
            <Text>Login</Text>
          </Button>
          </Form>
				
				
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 50,
		flex: 1,
		justifyContent: 'center'
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