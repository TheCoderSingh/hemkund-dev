import React from "react";
import {
	Dimensions,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import backgroundImage from "../../assets/background.jpg";
import Header from "../../components/Header/Header";

const window = Dimensions.get("window");

const Signup = () => {
	return (
		<ImageBackground source={backgroundImage} style={styles.image}>
			<Header />
			<KeyboardAvoidingView
				style={styles.containerInner}
				behavior="padding"
			>
				<TextInput
					placeholder="Choose a Username"
					textContentType="username"
					autoCompleteType="username"
					placeholderTextColor="grey"
					style={styles.input}
				/>
				<TextInput
					placeholder="First Name"
					textContentType="givenName"
					autoCompleteType="name"
					placeholderTextColor="grey"
					style={styles.input}
				/>
				<TextInput
					placeholder="Last Name"
					textContentType="familyName"
					autoCompleteType="name"
					placeholderTextColor="grey"
					style={styles.input}
				/>
				<TextInput
					placeholder="Email"
					textContentType="emailAddress"
					autoCompleteType="email"
					keyboardType="email-address"
					placeholderTextColor="grey"
					style={styles.input}
				/>
				<TextInput
					placeholder="Password"
					secureTextEntry
					textContentType="password"
					autoCompleteType="password"
					placeholderTextColor="grey"
					style={styles.input}
				/>
				<TextInput
					placeholder="Confirm Password"
					secureTextEntry
					textContentType="newPassword"
					autoCompleteType="password"
					placeholderTextColor="grey"
					style={styles.input}
				/>
				<View style={styles.button}>
					<Text style={styles.buttonText}>Sign Up</Text>
				</View>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

export default Signup;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: "cover",
		alignItems: "center",
	},
	containerInner: {
		marginTop: 120,
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
	buttonText: {
		textAlign: "center",
		color: "#fff",
	},
	extra: {
		height: 40,
	},
});
