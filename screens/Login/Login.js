import React from "react";
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
import { Link } from "react-router-native";
import backgroundImage from "../../assets/background.jpg";
import logo from "../../assets/logo-green.png";

const window = Dimensions.get("window");

const Login = () => {
	return (
		<ImageBackground source={backgroundImage} style={styles.image}>
			<KeyboardAvoidingView
				style={styles.containerInner}
				behavior="padding"
			>
				<Image source={logo} style={styles.logo} />
				<TextInput placeholder="Email" style={styles.input} />
				<TextInput placeholder="Password" style={styles.input} />

				<TouchableOpacity style={styles.button}>
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
});
