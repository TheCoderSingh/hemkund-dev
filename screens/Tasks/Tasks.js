import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import firebase from "firebase/app";
import {
	Alert,
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FIcon from "react-native-vector-icons/FontAwesome5";

const window = Dimensions.get("window");

const Tasks = (props) => {
	const [tasks, setTasks] = useState([]);
	const [taskChanged, setTaskChanged] = useState(false);
	const [removed, setRemoved] = useState(false);

	const mountedRef = useRef(true);

	useEffect(() => {
		getTasks();

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const toggleCheckbox = (taskid, isComplete) => {
		let tasksRef = firebase.database().ref().child("tasks");

		tasksRef.child(taskid).update({ complete: isComplete });

		getTasks();

		setTaskChanged(!taskChanged);
	};

	const showDeleteAlert = (taskid) => {
		Alert.alert(
			"Delete Project",
			"Are you sure you want to delete this task?",
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Yes",
					onPress: () => {
						let taskRef = firebase.database().ref().child("tasks");

						taskRef.child(taskid).update({ status: "deleted" });

						getTasks();

						setRemoved(true);
					},
				},
			],
			{ cancelable: true }
		);
	};

	const getTasks = () => {
		setTasks([]);
		let tasksRef = firebase.database().ref("tasks");

		tasksRef
			.orderByChild("project_id")
			.equalTo(props.match.params.id)
			.on(
				"value",
				(snapshot) => {
					snapshot.forEach((task) => {
						if (mountedRef.current)
							setTasks((tasks) => [...tasks, task.val()]);
					});
				},
				(error) => {
					console.log("Error: " + error.code);
				}
			);
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<Header
					title="Tasks"
					showBackLink
					to={"/project/" + props.match.params.id}
				/>
				<Link
					to={"/new-task/" + props.match.params.id}
					style={styles.button}
				>
					<Text style={styles.buttonText}>New Task</Text>
				</Link>
				<View style={styles.tasks}>
					{tasks.map((task, index) => {
						if (task.status === "active") {
							return task.complete ? (
								<View style={styles.task} key={index}>
									<View style={styles.checkArea}>
										<TouchableOpacity
											style={styles.checkbox}
											onPress={() => {
												toggleCheckbox(
													task.task_id,
													!task.complete
												);

												task.complete = !task.complete;
											}}
										>
											<Icon
												name="check"
												color="#03989E"
												size={30}
												style={styles.ficon}
											/>
										</TouchableOpacity>
									</View>
									<View style={styles.cardContent}>
										<Text style={styles.taskTxtCpltd}>
											{task.task_name}
										</Text>
										<Text>
											Due by: {task.due_date} -{" "}
											{task.due_time}
										</Text>
									</View>
									<TouchableOpacity
										onPress={() => {
											showDeleteAlert(task.task_id);
										}}
										style={styles.iconCont}
									>
										<FIcon
											name="trash-alt"
											size={20}
											color="#fff"
										/>
									</TouchableOpacity>
								</View>
							) : (
								<View style={styles.task} key={index}>
									<TouchableOpacity
										style={styles.checkbox}
										onPress={() => {
											toggleCheckbox(
												task.task_id,
												!task.complete
											);

											task.complete = !task.complete;
										}}
									/>
									<View style={styles.cardContent}>
										<Text style={styles.taskTxt}>
											{task.task_name}
										</Text>
										<Text>
											Due by: {task.due_date} -{" "}
											{task.due_time}
										</Text>
									</View>
									<TouchableOpacity
										onPress={() => {
											showDeleteAlert(task.task_id);
										}}
										style={styles.iconCont}
									>
										<FIcon
											name="trash-alt"
											size={20}
											color="#fff"
										/>
									</TouchableOpacity>
								</View>
							);
						}
					})}
				</View>
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
		marginTop: 40,
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
	tasks: {
		marginTop: 20,
		alignItems: "center",
	},
	task: {
		marginBottom: 15,
		flexDirection: "row",
		backgroundColor: "#eee",
		paddingLeft: 10,
		height: 80,
		width: window.width - 60,
		alignItems: "center",
		justifyContent: "space-between",
	},
	checkbox: {
		height: 25,
		width: 25,
		borderWidth: 1,
		borderRadius: 6,
		position: "relative",
		alignSelf: "center",
		marginRight: 10,
	},
	iconCont: {
		backgroundColor: "#333",
		height: 75,
		justifyContent: "center",
		alignItems: "center",
		width: 50,
	},
	checkArea: {
		position: "relative",
	},
	ficon: {
		position: "absolute",
	},
});
