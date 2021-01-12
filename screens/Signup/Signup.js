import React, { useState } from "react";
import {
	Dimensions,
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
	const [errorOccurred, setErrorOccurred] = useState(false);
	const [usernameInvalid, setUsernameInvalid] = useState(false);
	const [usernameInUse, setUsernameInUse] = useState(false);
	const [firstNameInvalid, setFirstNameInvalid] = useState(false);
	const [lastNameInvalid, setLastNameInvalid] = useState(false);
	const [emailInvalid, setEmailInvalid] = useState(false);
	const [emailInUse, setEmailInUse] = useState(false);
	const [passwordInvalid, setPasswordInvalid] = useState(false);
	const [passwordsUnmatch, setPasswordsUnmatch] = useState(false);

	return (
		<ImageBackground source={backgroundImage} style={styles.image}>
			<Header />
			<KeyboardAvoidingView
				style={styles.containerInner}
				behavior="padding"
			>
				{errorOccurred ? (
					<View style={styles.errors}>
						{usernameInvalid ? (
							<Text style={styles.errorText}>
								Username is invalid!
							</Text>
						) : null}
						{usernameInUse ? (
							<Text style={styles.errorText}>
								Username already in use!
							</Text>
						) : null}
						{firstNameInvalid ? (
							<Text style={styles.errorText}>
								First Name is invalid!
							</Text>
						) : null}
						{lastNameInvalid ? (
							<Text style={styles.errorText}>
								Last Name is invalid!
							</Text>
						) : null}
						{emailInvalid ? (
							<Text style={styles.errorText}>
								Email is invalid!
							</Text>
						) : null}
						{emailInUse ? (
							<Text style={styles.errorText}>
								Email already in use!
							</Text>
						) : null}
						{passwordInvalid ? (
							<Text
								style={[
									styles.errorText,
									{
										fontSize: 16,
									},
								]}
							>
								Password must contain at least 8 characters, a
								number and both lower and uppercase letters and
								special characters!
							</Text>
						) : null}
						{passwordsUnmatch ? (
							<Text style={styles.errorText}>
								Passwords do not match!
							</Text>
						) : null}
					</View>
				) : null}
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
	errors: {
		backgroundColor: "#333",
		borderRadius: 6,
		justifyContent: "center",
		width: window.width - 60,
		minHeight: 40,
	},
	errorText: {
		textAlign: "center",
		fontSize: 18,
		color: "#fff",
	},
});
