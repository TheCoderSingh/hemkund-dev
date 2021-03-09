import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import firebase from "firebase/app";
import { Link } from "react-router-native";
import Header from "../../components/Header/Header";
import Plans from "../../components/Plans/Plans";
import Footer from "../../components/Footer/Footer";

const window = Dimensions.get("window");

const Project = (props) => {
	const [username, setUsername] = useState();
	const [usernameInvalid, setUsernameInvalid] = useState(false);
	const [memberAlreadyAdded, setMemberAlreadyAdded] = useState(false);
	const [members, setMembers] = useState([]);

	const mountedRef = useRef(true);

	let users = [];

	useEffect(() => {
		let projectsRef = firebase.database().ref("projects");

		projectsRef
			.orderByChild("project_id")
			.equalTo(props.match.params.id)
			.once(
				"value",
				(data) => {
					let temp = [];

					data.forEach((project) => {
						Object.keys(project.val()).map((key) => {
							if (key === "members") {
								temp.push(project.val()[key]);
							}
						});

						Object.keys(temp).map((key) => {
							Object.values(temp[key]).map((user) => {
								users.push(user);
							});
						});

						setMembers(users);
					});
				},
				(error) => {
					console.log("Error: " + error.code);
				}
			);

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const handleUsername = (_username) => setUsername(_username.trim());

	const addUserToProject = () => {
		if (username) {
			let usersRef = firebase.database().ref().child("users");

			usersRef
				.orderByChild("username")
				.equalTo(username)
				.once("value", (snapshot) => {
					if (snapshot.exists()) {
						setUsernameInvalid(false);

						if (members.includes(username)) {
							setMemberAlreadyAdded(true);
						} else {
							setMemberAlreadyAdded(false);
							addMember();
						}
					} else {
						setUsernameInvalid(true);
					}
				});
		} else setUsernameInvalid(true);
	};

	const addMember = () => {
		users.push(username);
		if (mountedRef.current) setMembers(users);

		let projectsRef = firebase
			.database()
			.ref("projects")
			.child(props.match.params.id)
			.child("members");

		for (i = 0; i < members.length; i++) {
			projectsRef.push(members[i]);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Header
				showBackLink
				to="/projects"
				title={props.match.params.name}
			/>
			<ScrollView
				style={styles.container}
				keyboardShouldPersistTaps={"handled"}
			>
				<Link
					to={"/new-plan/" + props.match.params.id}
					style={styles.newPlanBtn}
				>
					<Text style={styles.newPlanText}>New Plan</Text>
				</Link>
				{usernameInvalid ? (
					<View style={styles.errors}>
						<Text style={[styles.errorText, { fontSize: 16 }]}>
							Username is invalid!
						</Text>
					</View>
				) : null}
				{memberAlreadyAdded ? (
					<View style={styles.errors}>
						<Text style={[styles.errorText, { fontSize: 16 }]}>
							Username already exists!
						</Text>
					</View>
				) : null}
				<View style={styles.addUserArea}>
					<TextInput
						placeholder="Enter username to add people"
						textContentType="username"
						autoCompleteType="username"
						placeholderTextColor="#333"
						onChangeText={handleUsername}
						style={styles.input}
					/>
					<TouchableOpacity
						style={styles.addUserBtn}
						onPress={addUserToProject}
					>
						<Text style={styles.addUserTxt}>Add</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.members}>
					<Text style={{ textAlign: "center" }}>
						Project Members:
					</Text>
					<View style={styles.memberList}>
						{members.map((user, index) => {
							return (
								<Text key={index} style={styles.member}>
									{user}
								</Text>
							);
						})}
					</View>
				</View>
				<View style={styles.plans}>
					<Plans projectid={props.match.params.id} />
				</View>
			</ScrollView>
			<Footer projectid={props.match.params.id} />
		</View>
	);
};

export default Project;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
	newPlanBtn: {
		width: window.width - 60,
		backgroundColor: "#03989E",
		borderRadius: 6,
		height: 40,
		alignSelf: "center",
		marginTop: 40,
		marginBottom: 20,
		justifyContent: "center",
	},
	newPlanText: {
		textAlign: "center",
		color: "#fff",
	},
	input: {
		height: 50,
		width: window.width - 110,
		// backgroundColor: "#03989E",
		marginVertical: 5,
		paddingLeft: 20,
		alignSelf: "center",
		borderColor: "#03989E",
		borderWidth: 1,
	},
	addUserArea: {
		flexDirection: "row",
		alignSelf: "center",
	},
	addUserBtn: {
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 5,
		backgroundColor: "#333",
	},
	addUserTxt: {
		color: "#fff",
	},
	errors: {
		backgroundColor: "#333",
		borderRadius: 6,
		justifyContent: "center",
		width: window.width - 60,
		minHeight: 40,
		alignSelf: "center",
	},
	errorText: {
		textAlign: "center",
		fontSize: 18,
		color: "#fff",
	},
	plans: {
		alignItems: "center",
	},
	members: {
		alignSelf: "center",
		marginTop: 10,
	},
	memberList: {
		flexDirection: "row",
		marginTop: 5,
		width: 350,
		alignSelf: "center",
	},
	member: {
		padding: 3,
	},
});
