import React, {Component} from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'

import Login from './screens/Login'
import Dashbaord from './screens/Dashboard'
import Notification from './screens/Notifications'

export default class Main extends Component {
	render(){
		return (
			<Router>
				<Stack key="main-stack">
					<Scene key="login" component={Login} hideNavBar/>
					<Scene key="dashbaord" component={Dashbaord} hideNavBar/>
					<Scene key="notification" component={Notification} title={"Notification"}/>
				</Stack>
			</Router>
		)
	}
}