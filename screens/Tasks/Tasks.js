import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

const window = Dimensions.get("window");

const Tasks = (props) => {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<Header title="Tasks" />
				<Link
					to={"/new-task/" + props.match.params.id}
					style={styles.button}
				>
					<Text style={styles.buttonText}>New Task</Text>
				</Link>
			</ScrollView>
			<Footer projectid={props.match.params.id} />
		</View>
	);
};

export default Tasks;

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
});
