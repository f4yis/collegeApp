import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableNativeFeedback,
	StyleSheet
} from 'react-native'


class Notification extends Component {
	renderItems(){
		return this.props.data.map((item, index) => {
			return (
				<View key={index} style={styles.card}>
					<Text style={styles.cardText}>{item}</Text>
				</View>
			)
		})
	}
	render(){
		return (
			<View style={styles.container}>
				{this.renderItems()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	card: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingVertical: 20,
		backgroundColor: '#fff',
		elevation: 1,
		marginBottom: 10,
	}
})

export default Notification