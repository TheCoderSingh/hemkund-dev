import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import Header from "../../components/Header/Header";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const window = Dimensions.get("window");

const Projects = () => {
	const [projects, setProjects] = useState([]);

	const mountedRef = useRef(true);

	useEffect(() => {
		let unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				let projectsRef = firebase.database().ref("projects");

				projectsRef
					.orderByChild("created_by")
					.equalTo(user.uid)
					.on(
						"value",
						(snapshot) => {
							snapshot.forEach((project) => {
								if (mountedRef.current)
									setProjects((projects) => [
										...projects,
										project.val(),
									]);
							});
						},
						(error) => {
							console.log("Error: " + error.code);
						}
					);
			}
		});

		return () => {
			mountedRef.current = false;
			unsubscribe();
		};
	});

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<Header title="Projects" showLogoutIcon />
			<Link to="/new-project" style={styles.button}>
				<Text style={styles.buttonText}>New Project</Text>
			</Link>
			<View style={styles.projects}>
				{projects.map((project) => {
					return (
						<ProjectCard
							key={project.project_id}
							id={project.project_id}
							name={project.project_name}
							date={project.created_on}
						/>
					);
				})}
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
