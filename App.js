import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";

export default function App() {
	return (
		<NativeRouter>
			<View style={styles.container}>
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
