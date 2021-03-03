import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import * as WebBrowser from "expo-web-browser";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Plan = (props) => {
	const [plan, setPlan] = useState([]);
	const [images, setImages] = useState([]);

	useEffect(() => {
		let plansRef = firebase.database().ref("plans");

		plansRef
			.orderByChild("plan_id")
			.equalTo(props.match.params.pid)
			.on("value", (snapshot) => {
				snapshot.forEach((plan) => {
					setPlan(plan.val());
				});
			});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<Header
				showBackLink
				to={"/project/" + props.match.params.id}
				title={props.match.params.name}
			/>
			<ScrollView style={styles.container}>
				<View style={styles.planSec}>
					<Text style={styles.planSecText}>Uploaded Plan</Text>
					{plan.file_url ? (
						<Text
							style={styles.planText}
							onPress={() => {
								WebBrowser.openBrowserAsync(plan.file_url);
							}}
						>
							{plan.plan_name}
						</Text>
					) : (
						<Text style={styles.noPlan}>No plan uploaded</Text>
					)}
				</View>
				<View style={styles.planSec}>
					<Text style={styles.planSecText}>Uploaded Images</Text>
					<TouchableOpacity style={styles.uploadBtn}>
						<Text>Upload Image</Text>
					</TouchableOpacity>
					{images.length > 0 ? (
						images.forEach((image) => {
							return (
								<View>
									<Image />
								</View>
							);
						})
					) : (
						<Text style={styles.noPlan}>No images uploaded</Text>
					)}
				</View>
			</ScrollView>
			<Footer projectid={props.match.params.id} />
		</View>
	);
};

export default Plan;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
	planSec: {
		alignSelf: "center",
		marginTop: 20,
	},
	planSecText: {
		fontSize: 20,
	},
	noPlan: {
		alignSelf: "center",
		marginTop: 15,
	},
	planText: {
		alignSelf: "center",
		marginTop: 10,
		backgroundColor: "#03989E",
		padding: 10,
	},
	uploadBtn: {
		alignSelf: "center",
		marginTop: 10,
		backgroundColor: "#03989E",
		padding: 10,
		width: 150,
		alignItems: "center",
	},
});
