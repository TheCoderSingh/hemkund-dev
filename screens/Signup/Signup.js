import React, { useState } from "react";
import {
	Dimensions,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import backgroundImage from "../../assets/background.jpg";
import Header from "../../components/Header/Header";
import { Redirect } from "react-router-native";

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
	const [username, setUsername] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confPassword, setConfPassword] = useState();
	const [signedUp, setSignedUp] = useState(false);

	const handleUsername = (_username) => {
		setUsername(_username.trim());
	};

	const handleFirstName = (_firstName) => {
		setFirstName(_firstName.trim());
	};

	const handleLastName = (_lastName) => {
		setLastName(_lastName.trim());
	};

	const handleEmail = (_email) => {
		setEmail(_email.trim());
	};

	const handlePassword = (_password) => {
		setPassword(_password);
	};

	const handleConfPassword = (_confPassword) => {
		setConfPassword(_confPassword);
	};

	const validateForm = () => {
		const usernameRegex = /^[a-z0-9_-]{3,16}$/i;
		const nameRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;

		if (username && usernameRegex.test(username)) {
			setErrorOccurred(false);
			setUsernameInvalid(false);

			usernameExists().then((exists) => {
				if (!exists) {
					setErrorOccurred(false);
					setUsernameInUse(false);

					if (firstName && nameRegex.test(firstName)) {
						setErrorOccurred(false);
						setFirstNameInvalid(false);

						if (lastName && nameRegex.test(lastName)) {
							setErrorOccurred(false);
							setLastNameInvalid(false);

							if (email && emailRegex.test(email)) {
								setErrorOccurred(false);
								setEmailInvalid(false);

								if (password && passwordRegex.test(password)) {
									setErrorOccurred(false);
									setPasswordInvalid(false);

									if (password === confPassword) {
										setErrorOccurred(false);
										setPasswordsUnmatch(false);

										registerUser();
									} else {
										setErrorOccurred(true);
										setPasswordsUnmatch(true);
									}
								} else {
									setErrorOccurred(true);
									setPasswordInvalid(true);
								}
							} else {
								setErrorOccurred(true);
								setEmailInvalid(true);
							}
						} else {
							setErrorOccurred(true);
							setLastNameInvalid(true);
						}
					} else {
						setErrorOccurred(true);
						setFirstNameInvalid(true);
					}
				} else {
					setErrorOccurred(true);
					setUsernameInUse(true);
				}
			});
		} else {
			setErrorOccurred(true);
			setUsernameInvalid(true);
		}
	};

	const usernameExists = async () => {
		let exists = false;
		let usersRef = firebase.database().ref().child("users");

		await usersRef
			.orderByChild("username")
			.equalTo(username)
			.once("value", (snapshot) => {
				if (snapshot.exists()) exists = true;
				else exists = false;
			});

		return exists;
	};

	const registerUser = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				createUser(user);
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use")
					setEmailInUse(true);
			});
	};

	const createUser = (user) => {
		let usersRef = firebase.database().ref().child("users");
		let newUserRef = usersRef.push();

		newUserRef.set({
			uid: user.user.uid,
			username: username,
			first_name: firstName,
			last_name: lastName,
			email: email,
			status: "active",
			registered_on: new Date().toLocaleString(),
		});

		setSignedUp(true);
	};

	return signedUp ? (
		<Redirect to="/projects" />
	) : (
		<ImageBackground source={backgroundImage} style={styles.image}>
			<Header title="Signup" to="/" showBackLink />
			{Platform.OS === "ios" ? (
				<KeyboardAvoidingView
					style={styles.containerInner}
					behavior="padding"
				>
					{errorOccurred ? (
						<View style={styles.errors}>
							{usernameInvalid ? (
								<Text
									style={[styles.errorText, { fontSize: 16 }]}
								>
									Username must be at least 3 characters and
									must contain only letters, dashes and
									underscores!
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
									style={[styles.errorText, { fontSize: 16 }]}
								>
									Password must contain at least 8 characters,
									a number and both lower and uppercase
									letters and special characters!
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
						onChangeText={handleUsername}
					/>
					<TextInput
						placeholder="First Name"
						textContentType="givenName"
						autoCompleteType="name"
						placeholderTextColor="grey"
						style={styles.input}
						onChangeText={handleFirstName}
					/>
					<TextInput
						placeholder="Last Name"
						textContentType="familyName"
						autoCompleteType="name"
						placeholderTextColor="grey"
						style={styles.input}
						onChangeText={handleLastName}
					/>
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
					<TextInput
						placeholder="Confirm Password"
						secureTextEntry
						textContentType="newPassword"
						autoCompleteType="password"
						placeholderTextColor="grey"
						style={styles.input}
						onChangeText={handleConfPassword}
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={validateForm}
					>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			) : (
				<ScrollView
					style={styles.containerInner}
					behavior="padding"
					contentContainerStyle={{ alignItems: "center" }}
				>
					{errorOccurred ? (
						<View style={styles.errors}>
							{usernameInvalid ? (
								<Text
									style={[styles.errorText, { fontSize: 16 }]}
								>
									Username must be at least 3 characters and
									must contain only letters, dashes and
									underscores!
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
									style={[styles.errorText, { fontSize: 16 }]}
								>
									Password must contain at least 8 characters,
									a number and both lower and uppercase
									letters and special characters!
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
						onChangeText={handleUsername}
					/>
					<TextInput
						placeholder="First Name"
						textContentType="givenName"
						autoCompleteType="name"
						placeholderTextColor="grey"
						style={styles.input}
						onChangeText={handleFirstName}
					/>
					<TextInput
						placeholder="Last Name"
						textContentType="familyName"
						autoCompleteType="name"
						placeholderTextColor="grey"
						style={styles.input}
						onChangeText={handleLastName}
					/>
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
					<TextInput
						placeholder="Confirm Password"
						secureTextEntry
						textContentType="newPassword"
						autoCompleteType="password"
						placeholderTextColor="grey"
						style={styles.input}
						onChangeText={handleConfPassword}
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={validateForm}
					>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
				</ScrollView>
			)}
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
		marginTop: Platform.OS === "ios" ? 70 : 20,
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
