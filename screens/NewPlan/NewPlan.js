import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { Link, Redirect } from "react-router-native";
import { getDocumentAsync } from "expo-document-picker";

const window = Dimensions.get("window");

const NewPlan = (props) => {
	const [planName, setPlanName] = useState();
	const [planNameInvalid, setPlanNameInvalid] = useState(false);
	const [currUserId, setCurrUserId] = useState();
	const [uploadProgress, setUploadProgress] = useState(0);
	const [blob, setBlob] = useState({});
	const [ref, setRef] = useState();
	const [planCreated, setPlanCreated] = useState(false);
	const [fileName, setFileName] = useState();
	const [uploaded, setUploaded] = useState(false);

	const mountedRef = useRef(true);

	const handlePlanName = (name) => setPlanName(name.trim());

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) setCurrUserId(user.uid);
		});

		return () => {
			mountedRef.current = false;
			unsubscribe();
		};
	}, []);

	const createPlan = () => {
		if (planName) {
			setPlanNameInvalid(false);
			if (Object.keys(blob).length !== 0) uploadFile();
			else addPlan();
		} else setPlanNameInvalid(true);
	};

	const uploadFile = () => {
		let task = ref.put(blob);

		task.on(
			"state_changed",
			(snapshot) => {
				let progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				if (firebase.storage.TaskState.RUNNING) {
					if (mountedRef.current) setUploadProgress(progress);
				}
			},
			(error) => {
				console.log(error);
			},
			() => {
				task.snapshot.ref.getDownloadURL().then((downloadURL) => {
					addPlan(downloadURL);
				});
			}
		);
	};

	const addPlan = (url) => {
		let plansRef = firebase.database().ref().child("plans");
		let newPlanRef = plansRef.push();

		newPlanRef.set({
			plan_id: newPlanRef.key,
			plan_name: planName,
			created_by: currUserId,
			project_id: props.match.params.id,
			status: "active",
			file_url: url || "",
		});

		setPlanCreated(true);
	};

	return planCreated ? (
		<Redirect to={"/project/" + props.match.params.id} />
	) : (
		<View style={styles.container}>
			<Link to={"/project/" + props.match.params.id} style={styles.icon}>
				<Icon name="cross" size={45} color="#fff" />
			</Link>
			<View styles={styles.content}>
				<Text style={styles.title}>New Plan</Text>
				{planNameInvalid ? (
					<View style={styles.errors}>
						<Text style={[styles.errorText, { fontSize: 16 }]}>
							Plan name is invalid!
						</Text>
					</View>
				) : null}
				{uploadProgress > 0 && uploadProgress < 100 ? (
					<Text style={{ color: "#fff" }}>
						Upload Progress: {uploadProgress.toFixed(0)}%
					</Text>
				) : null}
				<TextInput
					placeholder="Plan Name"
					style={styles.input}
					placeholderTextColor="grey"
					onChangeText={handlePlanName}
				/>
				{uploaded ? (
					<Text
						style={{
							color: "#fff",
							marginTop: 20,
							alignSelf: "center",
						}}
					>
						{fileName}
					</Text>
				) : (
					<Text
						style={{
							color: "#fff",
							marginTop: 20,
							alignSelf: "center",
						}}
					>
						No file uploaded
					</Text>
				)}
				<TouchableOpacity
					style={[
						styles.button,
						{ backgroundColor: "#ddd", alignItems: "center" },
					]}
					onPress={() => {
						getDocumentAsync().then(async (response) => {
							try {
								let storageRef = firebase.storage().ref();
								if (response.uri) {
									setRef(
										Platform.OS === "ios"
											? storageRef.child(
													response.uri.split("/")[14]
											  )
											: storageRef.child(
													response.uri.split("/")[11]
											  )
									);

									let fetchResponse = await fetch(
										response.uri
									);
									let blob = await fetchResponse.blob();

									if (mountedRef.current) setBlob(blob);
									setFileName(response.name);
									setUploaded(true);
								}
							} catch (error) {
								console.log(error);
							}
						});
					}}
				>
					<Icon name="upload" size={25} color="#333" />
					<Text style={styles.buttonText}>Upload Plan</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={createPlan}>
					<Text style={styles.btnTxt}>Create</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default NewPlan;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		flex: 1,
		paddingTop: 30,
		alignItems: "center",
	},
	icon: {
		alignSelf: "flex-end",
		padding: 15,
	},
	content: {
		alignSelf: "center",
	},
	title: {
		fontSize: 36,
		marginBottom: 80,
		marginTop: 60,
		color: "#fff",
	},
	input: {
		height: 50,
		width: window.width - 60,
		backgroundColor: "#fff",
		marginVertical: 5,
		paddingLeft: 20,
		borderRadius: 6,
	},
	button: {
		backgroundColor: "#fff",
		height: 50,
		width: window.width - 60,
		borderRadius: 6,
		justifyContent: "center",
		marginTop: 30,
	},
	btnTxt: {
		textAlign: "center",
		fontSize: 18,
		color: "#03989E",
	},
	errors: {
		backgroundColor: "#333",
		borderRadius: 6,
		justifyContent: "center",
		width: window.width - 60,
		minHeight: 40,
	},
	errorText: {
		textAlign: "center",
		fontSize: 18,
		color: "#fff",
	},
});
