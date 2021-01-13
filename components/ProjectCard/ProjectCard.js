import React, { useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Redirect } from "react-router-native";

const window = Dimensions.get("window");

const ProjectCard = (props) => {
	const [projectSelected, setProjectSelected] = useState(false);

	return projectSelected ? (
		<Redirect to={"/project/" + props.id + "/" + props.name} />
	) : (
		<TouchableOpacity
			style={styles.project}
			onPress={() => {
				setProjectSelected(true);
			}}
		>
			<Text style={styles.projectTitle}>{props.name}</Text>
			<Icon name="trash-alt" size={20} color="#fff" style={styles.icon} />
			<Text style={styles.date}>Created on {props.date}</Text>
		</TouchableOpacity>
	);
};

export default ProjectCard;

const styles = StyleSheet.create({
	project: {
		backgroundColor: "#03989E",
		width: window.width - 60,
		alignItems: "center",
		borderRadius: 6,
		marginVertical: 20,
		paddingTop: 15,
	},
	projectTitle: {
		fontSize: 20,
	},
	icon: {
		position: "absolute",
		right: 15,
		top: "50%",
	},
	date: {
		paddingVertical: 10,
		color: "#ccc",
	},
});
