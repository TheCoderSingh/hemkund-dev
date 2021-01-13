import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { range } from "lodash";

const renderWeekDays = () => {
	let weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

	return weekdays.map((day) => {
		return (
			<Text key={day} style={styles.calendar_weekdays_text}>
				{day.toUpperCase()}
			</Text>
		);
	});
};

const getWeeksArray = (days) => {
	var weeks_r = [];
	var seven_days = [];
	var count = 0;
	days.forEach((day) => {
		count += 1;
		seven_days.push(day);
		if (count == 7) {
			weeks_r.push(seven_days);
			count = 0;
			seven_days = [];
		}
	});
	return weeks_r;
};

const renderDays = (week_days) => {
	return week_days.map((day, index) => {
		return (
			<TouchableOpacity
				label={day}
				key={index}
				style={styles.day}
				noDefaultStyles={true}
			>
				<Text style={styles.day_text}>{day}</Text>
			</TouchableOpacity>
		);
	});
};

const renderWeeks = () => {
	let past_month_days = range(27, 31);
	let this_month_days = range(1, 30);

	let days = past_month_days.concat(past_month_days, this_month_days);
	let grouped_days = getWeeksArray(days);

	return grouped_days.map((week_days, index) => {
		return (
			<View key={index} style={styles.week_days}>
				{renderDays(week_days)}
			</View>
		);
	});
};

const Calendar = () => {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ alignItems: "center" }}
		>
			<View style={styles.header}>
				<TouchableOpacity style={styles.header_item}>
					<View style={styles.header_button}>
						<Icon name="chevron-left" size={30} color="#FFF" />
						<Text style={[styles.header_text]}> Menu</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.header_item}>
					<Text
						style={[
							styles.header_text,
							styles.text_center,
							styles.bold_text,
						]}
					>
						Calendar
					</Text>
				</View>
				<View style={styles.header_item}>
					<Text style={[styles.header_text, styles.text_right]}>
						Today
					</Text>
				</View>
			</View>
			<View>
				<View style={styles.calendar_header}>
					<View style={styles.calendar_header_item}>
						<TouchableOpacity>
							<Icon name="chevron-left" size={18} color="#333" />
						</TouchableOpacity>
						<Text style={styles.calendar_header_text}>2013</Text>
						<TouchableOpacity>
							<Icon name="chevron-right" size={18} color="#333" />
						</TouchableOpacity>
					</View>

					<View style={styles.calendar_header_item}>
						<TouchableOpacity>
							<Icon name="chevron-left" size={18} color="#333" />
						</TouchableOpacity>
						<Text style={styles.calendar_header_text}>
							November
						</Text>
						<TouchableOpacity>
							<Icon name="chevron-right" size={18} color="#333" />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.calendar_weekdays}>{renderWeekDays()}</View>
				<View style={styles.calendar_days}>{renderWeeks()}</View>
			</View>
			<View style={styles.notes}>
				<View style={styles.notes_notes}>
					<Text style={styles.notes_text}>
						Riding my bike around the neighborhood.
					</Text>
				</View>
				<View style={[styles.notes_selected_date]}>
					<Text style={styles.small_text}>8:23 PM</Text>
					<Text style={styles.big_text}>14</Text>
					<View style={styles.inline}>
						<Icon name="bicycle" size={20} color="#CCC" />
						<Text style={styles.small_text}> THURSDAY</Text>
					</View>
				</View>
			</View>
			<View style={styles.logs}>
				<View>
					<Text style={styles.log_text}>Create New Entry</Text>
					<Text style={styles.log_subtext}>
						On Thursday, November 14
					</Text>
				</View>
				<TouchableOpacity>
					<Icon name="chevron-right" size={30} color="#CCC" />
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		backgroundColor: "#03989E",
		flexDirection: "row",
		padding: 20,
		paddingTop: 50,
	},
	header_item: {
		flex: 1,
	},
	header_button: {
		flexDirection: "row",
	},
	text_center: {
		textAlign: "center",
	},
	text_right: {
		textAlign: "right",
	},
	header_text: {
		color: "#fff",
		fontSize: 20,
	},
	bold_text: {
		fontWeight: "bold",
	},
	calendar_header: {
		flexDirection: "row",
		width: "100%",
	},
	calendar_header_item: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 20,
		paddingRight: 40,
		paddingLeft: 40,
	},
	calendar_header_text: {
		fontWeight: "bold",
		fontSize: 20,
	},
	calendar_weekdays: {
		flexDirection: "row",
		marginTop: 15,
	},
	calendar_weekdays_text: {
		flex: 1,
		color: "#C0C0C0",
		textAlign: "center",
	},
	week_days: {
		flexDirection: "row",
	},
	day: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		padding: 10,
		margin: 2,
	},
	day_text: {
		textAlign: "center",
		color: "#A9A9A9",
		fontSize: 25,
	},
	notes: {
		marginTop: 10,
		padding: 20,
		borderColor: "#F5F5F5",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		flexDirection: "row",
		backgroundColor: "#FAFAFA",
	},
	notes_notes: {
		flex: 3,
	},
	notes_text: {
		fontSize: 18,
	},
	notes_selected_date: {
		flex: 1,
		alignItems: "flex-end",
		flexDirection: "column",
	},
	small_text: {
		fontSize: 15,
	},
	big_text: {
		fontSize: 50,
		fontWeight: "bold",
	},
	inline: {
		flexDirection: "row",
	},
	logs: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		borderColor: "#F5F5F5",
		borderBottomWidth: 1,
	},
	log_text: {
		fontSize: 25,
	},
	log_subtext: {
		fontSize: 18,
	},
});

export default Calendar;
