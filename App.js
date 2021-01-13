import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Logout from "./components/Logout/Logout";
import Login from "./screens/Login/Login";
import NewProject from "./screens/NewProject/NewProject";
import Project from "./screens/Projects/Project";
import Projects from "./screens/Projects/Projects";
import Signup from "./screens/Signup/Signup";
import "./utils/firebaseConfig";

export default function App() {
	return (
		<NativeRouter>
			<View style={styles.container}>
				<Route exact path="/project/:id/:name" component={Project} />
				<Route path="/new-project" component={NewProject} />
				<Route exact path="/projects" component={Projects} />
				<Route path="/logout" component={Logout} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/" component={Login} />
				<StatusBar style="auto" />
			</View>
		</NativeRouter>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
