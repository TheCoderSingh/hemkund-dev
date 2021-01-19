import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { range } from "lodash";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const weekdays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const Calendar = (props) => {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());
	const [selectedDate, setSelectedDate] = useState(new Date().getDate());
	const [selectedDay, setSelectedDay] = useState(new Date().getDay());
	const [dateChanged, setDateChanged] = useState(false);

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

		if (count === 1) {
			weeks_r.push([days[days.length - 1], 0, 0, 0, 0, 0, 0]);
		} else if (count === 2) {
			weeks_r.push([
				days[days.length - 2],
				days[days.length - 1],
				0,
				0,
				0,
				0,
				0,
			]);
		} else if (count === 3) {
			weeks_r.push([
				days[days.length - 3],
				days[days.length - 2],
				days[days.length - 1],
				0,
				0,
				0,
				0,
			]);
		} else if (count === 4) {
			weeks_r.push([
				days[days.length - 4],
				days[days.length - 3],
				days[days.length - 2],
				days[days.length - 1],
				0,
				0,
				0,
			]);
		} else if (count === 5) {
			weeks_r.push([
				days[days.length - 5],
				days[days.length - 4],
				days[days.length - 3],
				days[days.length - 2],
				days[days.length - 1],
				0,
				0,
			]);
		} else if (count === 6) {
			weeks_r.push([
				days[days.length - 6],
				days[days.length - 5],
				days[days.length - 4],
				days[days.length - 3],
				days[days.length - 2],
				days[days.length - 1],
				0,
			]);
		}

		return weeks_r;
	};

	const renderDays = (week_days) => {
		return week_days.map((day, index) => {
			if (day !== 0) {
				return day === selectedDate ? (
					<TouchableOpacity
						label={day}
						key={index}
						style={[
							styles.day,
							{
								borderWidth: 2,
								borderColor: "#03989E",
								backgroundColor: "#fff",
							},
						]}
						noDefaultStyles={true}
						onPress={() => {
							setSelectedDate(day);
							setSelectedDay(new Date(year, month, day).getDay());
						}}
					>
						<Text style={styles.day_text}>{day}</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						label={day}
						key={index}
						style={styles.day}
						noDefaultStyles={true}
						onPress={() => {
							setSelectedDate(day);
							setSelectedDay(new Date(year, month, day).getDay());
						}}
					>
						<Text style={styles.day_text}>{day}</Text>
					</TouchableOpacity>
				);
			} else {
				return (
					<TouchableOpacity
						label={day}
						key={index}
						style={styles.day}
						noDefaultStyles={true}
					/>
				);
			}
		});
	};

	const renderWeeks = () => {
		let past_month_days = [];

		let monthEnd = new Date(year, month + 1, 0).getDate();

		let this_month_days = range(1, monthEnd + 1);

		let startDay = new Date(year, month, 1).getDay();

		switch (startDay) {
			case 0:
				break;
			case 1:
				past_month_days.push(...new Array(5).fill(0));
				break;
			case 2:
				past_month_days.push(...new Array(2).fill(0));
				break;
			case 3:
				past_month_days.push(...new Array(3).fill(0));
				break;
			case 4:
				past_month_days.push(...new Array(4).fill(0));
				break;
			case 5:
				past_month_days.push(...new Array(5).fill(0));
				break;
			case 6:
				past_month_days.push(...new Array(6).fill(0));
				break;
			default:
				break;
		}

		let days = past_month_days.concat(this_month_days);
		let grouped_days = getWeeksArray(days);

		return grouped_days.map((week_days, index) => {
			return (
				<View key={index} style={styles.week_days}>
					{renderDays(week_days)}
				</View>
			);
		});
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={{ alignItems: "center" }}
			>
				<Header
					to={"/project/" + props.match.params.id}
					showBackLink
					title="Calendar"
				/>
				<View>
					<View style={styles.calendar_header}>
						<View style={styles.calendar_header_item}>
							<TouchableOpacity
								onPress={() => {
									setYear(year - 1);
									setDateChanged(true);
								}}
								style={{ padding: 10 }}
							>
								<Icon
									name="chevron-left"
									size={18}
									color="#333"
								/>
							</TouchableOpacity>
							<Text style={styles.calendar_header_text}>
								{year}
							</Text>
							<TouchableOpacity
								style={{ padding: 10 }}
								onPress={() => {
									setYear(year + 1);
									setDateChanged(true);
								}}
							>
								<Icon
									name="chevron-right"
									size={18}
									color="#333"
								/>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							style={styles.calendar_header_item}
							onPress={() => {
								let _date = new Date().getDate();
								let _month = new Date().getMonth();
								let _year = new Date().getFullYear();
								setSelectedDate(_date);
								setSelectedDay(
									new Date(_year, _month, _date).getDay()
								);

								setYear(new Date().getFullYear());
								setMonth(new Date().getMonth());
							}}
						>
							<Text style={{ fontSize: 20 }}>Today</Text>
						</TouchableOpacity>

						<View style={styles.calendar_header_item}>
							<TouchableOpacity
								style={{ padding: 10 }}
								onPress={() => {
									if (month === 0) setMonth(11);
									else setMonth(month - 1);
								}}
							>
								<Icon
									name="chevron-left"
									size={18}
									color="#333"
								/>
							</TouchableOpacity>
							<Text style={styles.calendar_header_text}>
								{months[month]}
							</Text>
							<TouchableOpacity
								style={{ padding: 10 }}
								onPress={() => {
									if (month === 11) setMonth(0);
									else setMonth(month + 1);
								}}
							>
								<Icon
									name="chevron-right"
									size={18}
									color="#333"
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.calendar_weekdays}>
						{renderWeekDays()}
					</View>
					<View style={styles.calendar_days}>{renderWeeks()}</View>
				</View>
				<View style={styles.notes}>
					<View style={styles.notes_notes}>
						<Text style={styles.notes_text}>
							Riding my bike around the neighborhood.
						</Text>
					</View>
					<View style={[styles.notes_selected_date]}>
						<Text style={styles.big_text}>{selectedDate}</Text>
						<Text style={styles.small_text}>
							{weekdays[selectedDay].toUpperCase()}
						</Text>
					</View>
				</View>
				<View style={styles.logs}>
					<View>
						<Text style={styles.log_text}>Create New Task</Text>
						<Text style={styles.log_subtext}>
							On {weekdays[selectedDay]}, {months[month]}{" "}
							{selectedDate}
						</Text>
					</View>
					<TouchableOpacity style={{ marginLeft: 10 }}>
						<Icon name="chevron-right" size={30} color="#CCC" />
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Footer />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	calendar_header: {
		flexDirection: "row",
		width: "100%",
	},
	calendar_header_item: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 20,
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
