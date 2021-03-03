import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Logout from "./components/Logout/Logout";
import Plan from "./components/Plans/Plan";
import Calendar from "./screens/Calendar/Calendar";
import Login from "./screens/Login/Login";
import NewPlan from "./screens/NewPlan/NewPlan";
import NewProject from "./screens/NewProject/NewProject";
import NewTask from "./screens/NewTask/NewTask";
import Project from "./screens/Projects/Project";
import Projects from "./screens/Projects/Projects";
import Signup from "./screens/Signup/Signup";
import Tasks from "./screens/Tasks/Tasks";
import "./utils/firebaseConfig";

export default function App() {
	return (
		<NativeRouter>
			<View style={styles.container}>
				<Route path="/calendar/:id" component={Calendar} />
				<Route path="/new-task/:id" component={NewTask} />
				<Route path="/tasks/:id" component={Tasks} />
				<Route path="/new-plan/:id" component={NewPlan} />
				<Route path="/plan/:id/:pid/:name" component={Plan} />
				<Route exact path="/project/:id" component={Project} />
				<Route exact path="/project/:id/:name" component={Project} />
				<Route path="/new-project" component={NewProject} />
				<Route exact path="/projects" component={Projects} />
				<Route path="/logout" component={Logout} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/" component={Login} />
				<StatusBar style="auto" />
			</View>
		</NativeRouter>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
