import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "react-router-native";

const Logout = () => {
	const [loggedOut, setLoggedOut] = useState(false);

	useEffect(() => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				setLoggedOut(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return loggedOut ? (
		<Redirect to="/" />
	) : (
		<View style={styles.container}>
			<Text style={{ fontSize: 24 }}>Logging out...</Text>
		</View>
	);
};

export default Logout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 80,
		alignItems: "center",
	},
});
