import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import Icon from "react-native-vector-icons/Entypo";
import "firebase/storage";
// import * as WebBrowser from "expo-web-browser";
import { getDocumentAsync } from "expo-document-picker";

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
	const [ref, setRef] = useState();
	const [fileName, setFileName] = useState();
	const [uploaded, setUploaded] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const mountedRef = useRef(true);

	let imagesList = [];

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

		let storageRef = firebase.storage().ref().child("images/");

		let urls = storageRef.listAll().then((result) => {
			result.items.forEach((imageRef) => {
				imageRef
					.getDownloadURL()
					.then((url) => {
						imagesList.push(url);

						setImages(imagesList);
					})
					.catch((error) => {
						console.log(error);
					});
			});
		});

		return () => {
			mountedRef.current = false;
		};
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

					{uploaded ? (
						<Text
							style={{
								marginTop: 20,
								alignSelf: "center",
							}}
						>
							{fileName}
						</Text>
					) : (
						<Text
							style={{
								marginTop: 20,
								alignSelf: "center",
							}}
						>
							No file uploaded
						</Text>
					)}
					<TouchableOpacity
						style={styles.uploadBtn}
						onPress={() => {
							getDocumentAsync().then(async (response) => {
								try {
									let storageRef = firebase
										.storage()
										.ref("/images");
									if (response.uri) {
										setRef(
											Platform.OS === "ios"
												? storageRef.child(
														response.uri.split(
															"/"
														)[14]
												  )
												: storageRef.child(
														response.uri.split(
															"/"
														)[11]
												  )
										);

										let fetchResponse = await fetch(
											response.uri
										);

										let blob = await fetchResponse.blob();
										let task = ref.put(blob);

										setFileName(response.name);
										setUploaded(true);

										task.on(
											"state_changed",
											(snapshot) => {
												let progress =
													(snapshot.bytesTransferred /
														snapshot.totalBytes) *
													100;

												if (
													firebase.storage.TaskState
														.RUNNING
												) {
													if (mountedRef.current)
														setUploadProgress(
															progress
														);
												}
											},
											(error) => {
												console.log(error);
											},
											() => {
												task.snapshot.ref
													.getDownloadURL()
													.then((downloadURL) => {
														imagesList.push(
															downloadURL
														);
														setImages(imagesList);
													});
											}
										);
									}
								} catch (error) {
									console.log(error);
								}
							});
						}}
					>
						<Icon name="upload" size={25} color="#333" />
						<Text>Upload Image</Text>
					</TouchableOpacity>
					{uploadProgress > 0 && uploadProgress < 100 ? (
						<Text>
							Upload Progress: {uploadProgress.toFixed(0)}%
						</Text>
					) : null}
					{uploadProgress === 100 ? <Text>Uploaded</Text> : null}
					<View style={styles.images}>
						{images.length > 0 ? (
							images.map((image) => {
								return (
									<Image
										key={image}
										source={{
											uri: image,
										}}
										style={{
											width: 300,
											height: 300,
											alignSelf: "center",
											marginTop: 20,
											resizeMode: "contain",
										}}
										onError={(error) => {
											console.log(error);
										}}
									/>
								);
							})
						) : (
							<Text style={styles.noPlan}>
								No images uploaded
							</Text>
						)}
					</View>
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
		alignSelf: "center",
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
	btnTxt: {
		textAlign: "center",
		fontSize: 18,
		color: "#03989E",
	},
	upBtnTxt: {
		alignSelf: "center",
	},
});
