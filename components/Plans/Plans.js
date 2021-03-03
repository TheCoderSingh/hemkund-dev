import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import * as WebBrowser from "expo-web-browser";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Link } from "react-router-native";

const window = Dimensions.get("window");

const Plans = (props) => {
	const [plans, setPlans] = useState([]);

	const mountedRef = useRef(true);

	useEffect(() => {
		let plansRef = firebase.database().ref("plans");

		plansRef
			.orderByChild("project_id")
			.equalTo(props.projectid)
			.on(
				"value",
				(snapshot) => {
					snapshot.forEach((plan) => {
						if (mountedRef.current)
							setPlans((plans) => [...plans, plan.val()]);
					});
				},
				(error) => {
					console.log(error);
				}
			);

		return () => {
			mountedRef.current = false;
		};
	}, []);

	return plans.map((plan) => {
		// return plan.file_url ? (
		return (
			<Link
				to={
					"/plan/" +
					props.projectid +
					"/" +
					plan.plan_id +
					"/" +
					plan.plan_name
				}
				style={styles.container}
				key={plan.plan_id}
			>
				<Text style={styles.planText}>{plan.plan_name}</Text>
			</Link>
		);
		// ) : (
		// 	<View style={styles.container} key={plan.plan_id}>
		// 		<Text style={styles.planText}>{plan.plan_name}</Text>
		// 	</View>
		// );
	});
};

export default Plans;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		width: window.width - 120,
		alignItems: "center",
		borderRadius: 6,
		marginVertical: 20,
		height: 40,
		justifyContent: "center",
	},
	planText: {
		color: "#fff",
	},
});
