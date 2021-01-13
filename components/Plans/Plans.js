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
		return plan.file_url ? (
			<TouchableOpacity
				style={styles.container}
				key={plan.plan_id}
				onPress={() => {
					WebBrowser.openBrowserAsync(plan.file_url);
				}}
			>
				<Text style={styles.planText}>{plan.plan_name}</Text>
			</TouchableOpacity>
		) : (
			<View style={styles.container} key={plan.plan_id}>
				<Text style={styles.planText}>{plan.plan_name}</Text>
			</View>
		);
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
