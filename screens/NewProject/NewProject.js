import React, { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import firebase from "firebase/app";
import { Link, Redirect } from "react-router-native";

const window = Dimensions.get("window");

const NewProject = () => {
	const [projectName, setProjectName] = useState();
	const [projectCode, setProjectCode] = useState();
	const [projectNameInvalid, setProjectNameInvalid] = useState(false);
	const [currUserId, setCurrUserId] = useState();
	const [projectId, setProjectId] = useState();
	const [projectCreated, setProjectCreated] = useState(false);

	const handleProjectName = (name) => setProjectName(name.trim());
	const handleProjectCode = (code) => setProjectCode(code.trim());

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) setCurrUserId(user.uid);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const createProject = () => {
		if (projectName) {
			let projectsRef = firebase.database().ref().child("projects");
			let newProjectRef = projectsRef.push();

			if (
				!projectCode ||
				projectCode === "undefined" ||
				typeof projectCode === undefined ||
				projectCode.trim().length === 0
			) {
				newProjectRef.set({
					project_name: projectName,
					created_by: currUserId,
					status: "active",
					created_on: new Date().toLocaleString(),
					project_id: newProjectRef.key,
				});
			} else {
				newProjectRef.set({
					project_name: projectName,
					project_code: projectCode,
					created_by: currUserId,
					status: "active",
					created_on: new Date().toLocaleString(),
					project_id: newProjectRef.key,
				});
			}

			setProjectId(newProjectRef.key);
			setProjectCreated(true);
		} else setProjectNameInvalid(true);
	};

	return projectCreated ? (
		<Redirect to={"project/" + projectId + "/" + projectName} />
	) : (
		<View style={styles.container}>
			<Link to="/projects" style={styles.icon}>
				<Icon name="cross" size={45} color="#fff" />
			</Link>
			<View styles={styles.content}>
				<Text style={styles.title}>New Project</Text>
				{projectNameInvalid ? (
					<View style={styles.errors}>
						<Text style={[styles.errorText, { fontSize: 16 }]}>
							Project name is invalid!
						</Text>
					</View>
				) : null}
				<TextInput
					placeholder="Project Name"
					style={styles.input}
					placeholderTextColor="grey"
					onChangeText={handleProjectName}
				/>
				<TextInput
					placeholder="Project Code (Optional)"
					style={styles.input}
					placeholderTextColor="grey"
					onChangeText={handleProjectCode}
				/>
				<TouchableOpacity style={styles.button} onPress={createProject}>
					<Text style={styles.btnTxt}>Create</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default NewProject;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		flex: 1,
		paddingTop: 30,
		alignItems: "center",
	},
	icon: {
		alignSelf: "flex-end",
		padding: 15,
	},
	content: {
		alignSelf: "center",
	},
	title: {
		fontSize: 36,
		marginBottom: 80,
		marginTop: 60,
		color: "#fff",
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
		backgroundColor: "#fff",
		height: 50,
		width: window.width - 60,
		borderRadius: 6,
		justifyContent: "center",
		marginTop: 30,
	},
	btnTxt: {
		textAlign: "center",
		fontSize: 18,
		color: "#03989E",
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
