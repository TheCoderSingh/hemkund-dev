import React, { useState } from "react";
import {
	Alert,
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import firebase from "firebase/app";
import { Redirect } from "react-router-native";

const window = Dimensions.get("window");

const ProjectCard = (props) => {
	const [projectSelected, setProjectSelected] = useState(false);
	const [removed, setRemoved] = useState(false);

	const showDeleteAlert = () => {
		Alert.alert(
			"Delete Project",
			"Are you sure you want to delete this project?",
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: () => {
						let projectRef = firebase
							.database()
							.ref()
							.child("projects");

						projectRef
							.child(props.id)
							.update({ status: "deleted" });

						setRemoved(true);
					},
				},
			],
			{ cancelable: true }
		);
	};

	return projectSelected ? (
		<Redirect to={"/project/" + props.id + "/" + props.name} />
	) : removed ? null : (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.project}
				onPress={() => {
					setProjectSelected(true);
				}}
			>
				<Text style={styles.projectTitle}>{props.name}</Text>
				<Text style={styles.date}>Created on {props.date}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					showDeleteAlert(props.id);
				}}
				style={styles.iconCont}
			>
				<Icon name="trash-alt" size={20} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

export default ProjectCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	project: {
		backgroundColor: "#03989E",
		width: window.width - 105,
		alignItems: "center",
		marginVertical: 20,
		paddingTop: 15,
	},
	projectTitle: {
		fontSize: 20,
	},
	iconCont: {
		backgroundColor: "#333",
		height: Platform.OS === "ios" ? 76 : 81,
		justifyContent: "center",
		alignItems: "center",
		width: 45,
	},
	date: {
		paddingVertical: 10,
		color: "#FFF",
	},
});
