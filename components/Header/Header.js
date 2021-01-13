import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "react-router-native";

const Header = (props) => {
	return (
		<View style={styles.container}>
			{props.showBackLink ? (
				<Link to={props.to} style={styles.backLink}>
					<Icon name="chevron-back-outline" color="#fff" size={30} />
				</Link>
			) : (
				<View style={{ width: 30 }}></View>
			)}
			<Text style={styles.loginTxt}>{props.title}</Text>
			<View />
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		height: 85,
		width: "100%",
		backgroundColor: "#03989E",
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 20,
	},
	backLink: {
		marginLeft: 10,
	},
	loginTxt: {
		marginRight: 44,
		textAlign: "center",
		fontSize: 20,
	},
});
