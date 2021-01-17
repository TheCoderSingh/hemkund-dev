import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import firebase from "firebase/app";
import {
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

	const mountedRef = useRef(true);

	useEffect(() => {
		if (mountedRef.current) setTasks([]);
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

		return () => {
			mountedRef.current = false;
		};
	}, [taskChanged]);

	const toggleCheckbox = (taskid, isComplete) => {
		let tasksRef = firebase.database().ref().child("tasks");

		tasksRef.child(taskid).update({ complete: isComplete });

		setTaskChanged(!taskChanged);
	};

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
				<View style={styles.tasks}>
					{tasks.map((task, index) => {
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
										<FIcon
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
								<Icon
									name="trash"
									size={20}
									color="#333"
									style={styles.icon}
								/>
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
								<Icon
									name="trash"
									size={20}
									color="#333"
									style={styles.icon}
								/>
							</View>
						);
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
		paddingBottom: 10,
		display: "flex",
		flexDirection: "row",
		backgroundColor: "#eee",
		padding: 10,
		height: 80,
		borderRadius: 6,
		width: window.width - 60,
		alignItems: "center",
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
	icon: {
		marginLeft: 30,
		alignSelf: "center",
	},
	checkArea: {
		position: "relative",
	},
	ficon: {
		position: "absolute",
	},
});
