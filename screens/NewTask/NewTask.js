import React, { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import firebase from "firebase/app";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link, Redirect } from "react-router-native";

const window = Dimensions.get("window");

const NewTask = (props) => {
	const [taskName, setTaskName] = useState();
	const [taskNameInvalid, setTaskNameInvalid] = useState(false);
	const [currUserId, setCurrUserId] = useState();
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [showDate, setShowDate] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [taskCreated, setTaskCreated] = useState(false);

	const handleTaskName = (name) => setTaskName(name.trim());

	const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	const handleTimeChange = (event, selectedTime) => {
		const currentTime = selectedTime || time;
		setTime(currentTime);
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) setCurrUserId(user.uid);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const showDatePicker = () => {
		setShowDate(true);
		setShowTime(false);
	};
	const showTimePicker = () => {
		setShowTime(true);
		setShowDate(false);
	};

	const createTask = () => {
		if (taskName) {
			setTaskNameInvalid(false);

			let tasksRef = firebase.database().ref().child("tasks");
			let newTaskRef = tasksRef.push();

			newTaskRef.set({
				task_name: taskName,
				created_by: currUserId,
				status: "active",
				created_on: new Date().toLocaleString(),
				project_id: props.match.params.id,
				task_id: newTaskRef.key,
				complete: false,
				due_date: date.toString().substr(0, 15),
				due_time: time.toString().substring(16, 24),
			});

			setTaskCreated(true);
		} else setTaskNameInvalid(true);
	};

	return taskCreated ? (
		<Redirect to={"/tasks/" + props.match.params.id} />
	) : (
		<View style={styles.container}>
			<Link to={"/tasks/" + props.match.params.id} style={styles.icon}>
				<Icon name="cross" size={45} color="#fff" />
			</Link>
			<View styles={styles.content}>
				<Text style={styles.title}>New Task</Text>
				{taskNameInvalid ? (
					<View style={styles.errors}>
						<Text style={[styles.errorText, { fontSize: 16 }]}>
							Task name is invalid!
						</Text>
					</View>
				) : null}
				<TextInput
					placeholder="Task Name"
					style={styles.input}
					placeholderTextColor="grey"
					onChangeText={handleTaskName}
				/>
				<TouchableOpacity
					onPress={showDatePicker}
					style={styles.dateTimeCont}
				>
					<Text>Choose Date</Text>
				</TouchableOpacity>
				{showDate && (
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode="date"
						display="spinner"
						onChange={handleDateChange}
					/>
				)}
				<TouchableOpacity
					onPress={showTimePicker}
					style={styles.dateTimeCont}
				>
					<Text>Choose Time</Text>
				</TouchableOpacity>
				{showTime && (
					<DateTimePicker
						testID="dateTimePicker"
						value={time}
						mode="time"
						display="spinner"
						onChange={handleTimeChange}
					/>
				)}
				<TouchableOpacity style={styles.button} onPress={createTask}>
					<Text style={styles.btnTxt}>Create</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default NewTask;

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
	dateTimeCont: {
		alignSelf: "center",
		marginTop: 20,
		height: 50,
		width: window.width - 60,
		backgroundColor: "#fff",
		paddingLeft: 20,
		borderRadius: 6,
		justifyContent: "center",
	},
});
