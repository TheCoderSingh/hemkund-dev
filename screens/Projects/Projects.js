import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import Header from "../../components/Header/Header";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const window = Dimensions.get("window");

const Projects = () => {
	return (
		<ScrollView style={styles.container}>
			<Header title="Projects" showBackLink={false} />
			<Link to="/new-project" style={styles.button}>
				<Text style={styles.buttonText}>New Project</Text>
			</Link>
			<View style={styles.projects}>
				<ProjectCard />
			</View>
		</ScrollView>
	);
};

export default Projects;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
	button: {
		alignSelf: "center",
		marginTop: 120,
		backgroundColor: "#03989E",
		borderRadius: 6,
		height: 40,
		width: window.width - 60,
		justifyContent: "center",
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
	},
	projects: {
		alignItems: "center",
	},
});
