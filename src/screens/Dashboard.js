import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableNativeFeedback,
	StyleSheet,
	ToastAndroid,
	TouchableOpacity,
	Dimensions
} from 'react-native'
import firebase from 'firebase'

import {Actions} from 'react-native-router-flux'
const width = Dimensions.get('window').width;

class Dashbaord extends Component {
	state = {
		stdId: ''
	}
	componentDidMount(){
		ToastAndroid.show(this.props.data.toString(), ToastAndroid.SHORT)
		this.setState({
			stdId: this.props.data
		})
	}
	handleStudent(){
		firebase.database().ref('studentNot/' + this.state.stdId).once('value')
		.then(s => {
			let k = []
			s.val().content.map(item => {
				k.push(item.toString())
			})
			Actions.notification(k)
				
			
		})
		.catch(s => {
			ToastAndroid.show('No network found' + this.state.stdId, ToastAndroid.SHORT)
		})
	}
	handleCollege(){
		firebase.database().ref('collegeNot').once('value')
		.then(s => {
			let k = []
			s.val().map(item => {
				k.push(item.toString())
			})
			Actions.notification(k)
				
			
		})
		.catch(s => {
			ToastAndroid.show('No network found' + this.state.stdId, ToastAndroid.SHORT)
		})
	}
	handleUni(){
		firebase.database().ref('uniNot').once('value')
		.then(s => {
			let k = []
			s.val().map(item => {
				k.push(item.toString())
			})
			Actions.notification(k)
				
			
		})
		.catch(s => {
			ToastAndroid.show('No network found' + this.state.stdId, ToastAndroid.SHORT)
		})
	}
	render(){
		return (
			<View style={styles.container}>
				<View style={{flex: 1}}>
					<Text style={styles.title}>Gems Note</Text>
					<TouchableNativeFeedback onPress={this.handleStudent.bind(this)}>
						<View style={styles.card}>
							<Text>Student Notification</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={this.handleCollege.bind(this)}>
						<View style={styles.card}>
							<Text>College Notification</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={this.handleUni.bind(this)}>
						<View style={styles.card}>
							<Text>University Notification</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={styles.bottomBar}>
					<TouchableOpacity onPress={() => null}>
						<View style={styles.item}>
							<Text style={styles.itemText}>Calander</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => null}>
						<View style={styles.item}>
							<Text style={styles.itemText}>Contact</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => Actions.login()}>
						<View style={styles.item}>
							<Text style={styles.itemText}>Logot</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
	},
	card: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingVertical: 50,
		backgroundColor: '#fff',
		marginBottom: 14,
		borderRadius: 10
	},
	title: {
		textAlign: 'center',
		fontSize: 24,
		marginBottom: 18,
		fontWeight: 'bold'
	},
	bottomBar:{
		position: 'absolute',
		bottom: 0,
		left: 0,
		width,
		flex: 1,
		padding: 12,
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#202020'
	},
	item: {
		width: 60,
		height: 60,
		borderRadius: 25,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	itemText: {
		fontSize: 10
	}
})

export default Dashbaord