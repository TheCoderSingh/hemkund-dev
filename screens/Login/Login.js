import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import firebase from "firebase/app";
import { Link, Redirect } from "react-router-native";
import backgroundImage from "../../assets/background.jpg";
import logo from "../../assets/logo-green.png";

const window = Dimensions.get("window");

const Login = () => {
	const [loggedIn, setLoggedIn] = useState();
	const [invalidEmailOrPass, setInvalidEmailOrPass] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleEmail = (_email) => setEmail(_email.trim().toLowerCase());
	const handlePassword = (_password) => setPassword(_password);

	useEffect(() => {
		let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) setLoggedIn(true);
			else setLoggedIn(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const login = () => {
		if (email && password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					setInvalidEmailOrPass(false);
					setLoggedIn(true);
				})
				.catch((error) => {
					console.log(error);
					setInvalidEmailOrPass(true);
				});
		} else setInvalidEmailOrPass(true);
	};

	return loggedIn ? (
		<Redirect to="/projects" />
	) : (
		<ImageBackground source={backgroundImage} style={styles.image}>
			<KeyboardAvoidingView
				style={styles.containerInner}
				behavior="padding"
			>
				<Image source={logo} style={styles.logo} />
				{invalidEmailOrPass ? (
					<View style={styles.errors}>
						<Text style={[styles.errorText, { fontSize: 16 }]}>
							Invalid email or password!
						</Text>
					</View>
				) : null}
				<TextInput
					placeholder="Email"
					textContentType="emailAddress"
					autoCompleteType="email"
					keyboardType="email-address"
					placeholderTextColor="grey"
					style={styles.input}
					onChangeText={handleEmail}
				/>
				<TextInput
					placeholder="Password"
					secureTextEntry
					textContentType="password"
					autoCompleteType="password"
					placeholderTextColor="grey"
					style={styles.input}
					onChangeText={handlePassword}
				/>

				<TouchableOpacity style={styles.button} onPress={login}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<Link to="/signup" style={[styles.button, styles.buttonSignup]}>
					<Text style={styles.buttonText}>Sign Up</Text>
				</Link>
				<View style={styles.extra}></View>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

export default Login;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: "cover",
		alignItems: "center",
		justifyContent: "center",
	},
	containerInner: {
		marginTop: 70,
		alignItems: "center",
	},
	input: {
		height: 50,
		width: window.width - 60,
		backgroundColor: "#fff",
		marginVertical: 5,
		paddingLeft: 20,
		borderRadius: 6,
	},
	button: {
		backgroundColor: "#03989E",
		height: 50,
		width: window.width - 60,
		borderRadius: 6,
		marginTop: 20,
		justifyContent: "center",
	},
	buttonSignup: {
		marginTop: 10,
	},
	buttonText: {
		textAlign: "center",
		color: "#fff",
	},
	errors: {
		backgroundColor: "#333",
		borderRadius: 6,
		justifyContent: "center",
		width: window.width - 60,
		minHeight: 40,
		marginTop: 10,
	},
	errorText: {
		textAlign: "center",
		fontSize: 18,
		color: "#fff",
	},
});
