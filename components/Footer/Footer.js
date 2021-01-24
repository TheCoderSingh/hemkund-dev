import React from "react";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Link } from "react-router-native";

const Footer = (props) => {
	return (
		<View style={styles.footer}>
			<Link to="/projects" style={styles.item}>
				<Icon name="home" size={30} color="#fff" />
			</Link>
			<Link to={"/tasks/" + props.projectid} size={30}>
				<Icon name="tasks" size={30} color="#fff" />
			</Link>
			<Link to={"/calendar/" + props.projectid} style={styles.item}>
				<Icon name="calendar" size={30} color="#fff" />
			</Link>

			<Link to="/logout">
				<MIcon name="logout" size={30} color="#fff" />
			</Link>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "#333",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		height: Platform.OS === "ios" ? 90 : 60,
		alignItems: "flex-start",
		paddingTop: 10,
		width: "100%",
	},
});
