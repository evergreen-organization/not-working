import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DropdownModalPicker, Header, PrimaryBottomButton } from 'molecules';
import ShakeHandIcon from '../../../../assets/icon/shakehand.png';
import SignIcon from '../../../../assets/icon/sign.png';
import useApi from '../../../../hooks/useApi';
import {
	getLeave,
	fetchApproverList,
	fetchLeaveBalance,
	fetchLeaveRecord,
	fetchOffDates,
	fetchReliefList,
	submitApplyLeave,
} from '../../../../stores/leave';
import { AvoidKeyboard, Loading, Screen, Space, Text } from 'atoms';
import Calendar from '../components/Calendar';
import {
	formatApplyLeaveRecord,
	formatEmergencyLeave,
	formatOffDates,
	formatReliefLeaveRecord,
} from '../utils/formatLeaveRecord';
import { formatApplyLeave, formatApplyLeaveOnCalendar } from '../utils/formatApplyLeave';
import { colors } from '../../../../configs/colors';
import routes from '../../../../navigations/routes';
import { showFailure, showSuccess } from '../../../../utils/message';
import { Typography } from 'styles';

const ApplyLeave = ({ navigation }) => {
	const user = useSelector((state) => state.user);
	const { reliefList, savedRelief, approverList, savedApprover } = useSelector(getLeave);
	const fetchReliefListApi = useApi(fetchReliefList);
	const fetchApproverListApi = useApi(fetchApproverList);
	const fetchLeaveRecordApi = useApi(fetchLeaveRecord);
	const fetchOffDatesApi = useApi(fetchOffDates);
	const fetchLeaveBalanceApi = useApi(fetchLeaveBalance);
	const submitApplyLeaveApi = useApi(submitApplyLeave);
	const [dayTypeIndex, setDayTypeIndex] = useState(0);
	const [leaveRecord, setLeaveRecord] = useState(null);
	const [userLeaveRecord, setUserLeaveRecord] = useState({});
	const [reliefLeaveRecord, setReliefLeaveRecord] = useState({});
	const [offDates, setOffDates] = useState({});
	const [emergencyLeave, setEmergencyLeave] = useState({});
	const [selectedRelief, setSelectedRelief] = useState({});
	const [selectedApprover, setSelectedApprover] = useState({});
	const [selectedDays, setSelectedDays] = useState({});
	const [selectedDaysOnCalendar, setSelectedDaysOnCalendar] = useState({});
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [reason, setReason] = useState('');
	const [currentDate, setCurrentDate] = useState(Moment().add(7, 'day').format('YYYY-MM-DD'));
	const [minDate, setMinDate] = useState(Moment().format('YYYY-MM-DD'));
	const [maxDate, setMaxDate] = useState(Moment().format('YYYY') + '-12-31');
	const [isNextYearAvailable, setIsNextYearAvailable] = useState(false);
	const isReliefOptional =
		user.isRelief === 'Y' || user.gradeCode <= 200070 || user.jobCode === 'R032';
	const currentYear = new Date().getFullYear();

	useEffect(() => {
		createEmergencyLeave();
		loadReliefList();
		loadApproverList();
		loadLeaveRecord(user.staffId);
		loadOffDates();
		loadNextYearLeaveBalance(currentYear);
	}, []);

	useEffect(() => {
		if (selectedRelief.Id) {
			loadLeaveRecord(selectedRelief.Id);
		}
	}, [selectedRelief]);

	useEffect(() => {
		let combinedRecord = {};
		Object.assign(
			combinedRecord,
			userLeaveRecord,
			reliefLeaveRecord,
			emergencyLeave,
			offDates,
			selectedDaysOnCalendar,
		);
		if (Object.keys(combinedRecord).length > 0) {
			setLeaveRecord(combinedRecord);
		}
	}, [userLeaveRecord, reliefLeaveRecord, selectedDaysOnCalendar]);

	const loadReliefList = async () => {
		const response = await fetchReliefListApi.request();
		if (response.problem) {
			return showFailure(response.problem);
		}
		setSelectedRelief(savedRelief);
	};

	const loadApproverList = async () => {
		const response = await fetchApproverListApi.request();
		if (response.problem) {
			return showFailure(response.problem);
		}
		setSelectedApprover(savedApprover);
	};

	const loadLeaveRecord = async (staffId) => {
		const response = await fetchLeaveRecordApi.request({
			staffNo: staffId,
			stYearMth: Moment(currentDate).format('YYYYMM'),
			edYearMth: Moment().format('YYYY') + '12',
		});
		const { data, problem } = response || {};
		if (problem) {
			return showFailure(problem);
		}
		if (staffId === user.staffId) {
			return setUserLeaveRecord(formatApplyLeaveRecord(data));
		}
		setReliefLeaveRecord(formatReliefLeaveRecord(data));
	};

	const loadOffDates = async () => {
		const response = await fetchOffDatesApi.request({
			staffNo: user.staffId,
			stYearMth: Moment(currentDate).format('YYYYMM'),
			edYearMth: Moment().format('YYYY') + '12',
		});
		const { data, problem } = response || {};
		if (problem) {
			return showFailure(problem);
		}
		setOffDates(formatOffDates(data));
	};

	const loadNextYearLeaveBalance = async (year) => {
		const response = await fetchLeaveBalanceApi.request({
			staffNo: user.staffId,
			year: (year + 1).toString(),
		});
		const { data, problem } = response || {};
		if (problem) {
			return showFailure(problem);
		}
		if (data.length > 0) {
			return setIsNextYearAvailable(true);
		}
	};

	const createEmergencyLeave = () =>
		setEmergencyLeave(formatEmergencyLeave(Moment().format('YYYY-MM-DD')));

	const onDayPress = (day) => {
		let object1 = {};
		let object2 = {};
		object1 = formatApplyLeaveOnCalendar(selectedDaysOnCalendar, leaveRecord, day, dayTypeIndex);
		object2 = formatApplyLeave(selectedDays, day, dayTypeIndex);
		if (object1.problem) {
			return showFailure('Error', object1.problem);
		}
		setSelectedDays(object2);
		setSelectedDaysOnCalendar(object1);
	};

	const onSelectYear = (year) => {
		if (Object.keys(selectedDays).length > 0) {
			return showFailure('Error', 'Cross year leave application is not allowed!');
		}
		setSelectedYear(year);
		if (year === currentYear) {
			setCurrentDate(Moment().add(7, 'day').format('YYYY-MM-DD'));
			setMinDate(Moment().format('YYYY-MM-DD'));
			setMaxDate(Moment().format('YYYY') + '-12-31');
		} else {
			setCurrentDate(currentYear + 1 + '-01-01');
			setMinDate(currentYear + 1 + '-01-01');
			setMaxDate(currentYear + 1 + '-12-31');
		}
	};

	const handleSubmit = async () => {
		if (Object.keys(selectedApprover).length === 0) {
			return showFailure('Error', 'Approver is not optional');
		}
		if (Object.keys(selectedRelief).length === 0 && !isReliefOptional) {
			return showFailure('Error', 'Relief is not optional');
		}
		let selectedDatesList = [];
		Object.entries(selectedDays).forEach(([key, item]) => {
			selectedDatesList.push({
				leaveDate: key,
				dayType: item.dayType,
			});
		});
		if (selectedDatesList.length === 0) {
			showFailure('Error', 'No date has been selected');
		} else {
			const response = await submitApplyLeaveApi.request({
				reliefId: selectedRelief.Id,
				approverId: selectedApprover.Id,
				leaveDates: selectedDatesList,
				remarks: reason,
			});
			const { data, problem } = response || {};
			if (problem) {
				showFailure('Error', problem);
			} else {
				showSuccess('Success', data?.status);
				navigation.navigate(routes.LEAVE);
			}
		}
	};

	return (
		<Screen>
			<AvoidKeyboard>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
					}}
					centerComponent={{
						text: 'Apply Leave',
						style: Typography.H6,
					}}
				/>
				<View style={styles.container}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.content}>
							{isNextYearAvailable && (
								<View style={styles.yearContainer}>
									<TouchableOpacity
										style={[
											styles.yearButton,
											selectedYear === currentYear && {
												backgroundColor: colors.primary,
											},
										]}
										onPress={() => onSelectYear(currentYear)}
									>
										<Text
											style={[
												styles.yearButtonText,
												selectedYear === currentYear && { color: colors.white },
											]}
										>
											{currentYear}
										</Text>
									</TouchableOpacity>
									<Space width={8} />
									<TouchableOpacity
										style={[
											styles.yearButton,
											selectedYear === currentYear + 1 && {
												backgroundColor: colors.primary,
											},
										]}
										onPress={() => onSelectYear(currentYear + 1)}
									>
										<Text
											style={[
												styles.yearButtonText,
												selectedYear === currentYear + 1 && {
													color: colors.white,
												},
											]}
										>
											{currentYear + 1}
										</Text>
									</TouchableOpacity>
								</View>
							)}
							{!isReliefOptional && (
								<DropdownModalPicker
									label={'Choose your relief...'}
									enableSearch
									style={[styles.dropdown, styles.reliefDowndown]}
									dropdownData={reliefList}
									selectedItem={selectedRelief}
									setSelectedItem={(item) => setSelectedRelief(item)}
									icon={ShakeHandIcon}
								/>
							)}
							<View style={styles.calendarSection}>
								<View style={styles.dayTypeContainer}>
									<TouchableOpacity
										onPress={() => setDayTypeIndex(1)}
										style={[
											styles.dayTypeButton,
											dayTypeIndex === 1 && { backgroundColor: colors.primary },
										]}
									>
										<Text
											style={[styles.dayTypeText, dayTypeIndex === 1 && { color: colors.white }]}
										>
											1st
										</Text>
									</TouchableOpacity>
									<Space width={8} />
									<TouchableOpacity
										onPress={() => setDayTypeIndex(0)}
										style={[
											styles.dayTypeButton,
											dayTypeIndex === 0 && { backgroundColor: colors.primary },
										]}
									>
										<Text
											style={[styles.dayTypeText, dayTypeIndex === 0 && { color: colors.white }]}
										>
											Full
										</Text>
									</TouchableOpacity>
									<Space width={8} />
									<TouchableOpacity
										onPress={() => setDayTypeIndex(2)}
										style={[
											styles.dayTypeButton,
											dayTypeIndex === 2 && { backgroundColor: colors.primary },
										]}
									>
										<Text
											style={[styles.dayTypeText, dayTypeIndex === 2 && { color: colors.white }]}
										>
											2nd
										</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.calendarContainer}>
									{leaveRecord && (
										<Calendar
											style={styles.calendar}
											leaveRecord={leaveRecord}
											current={currentDate}
											minDate={minDate}
											maxDate={maxDate}
											onDayPress={onDayPress}
										/>
									)}
									<Text style={styles.note}>Note: No short notice and emergency leave</Text>
								</View>
								<DropdownModalPicker
									label={'Choose your approver...'}
									enableSearch
									style={styles.dropdown}
									dropdownData={approverList}
									selectedItem={selectedApprover}
									setSelectedItem={(item) => setSelectedApprover(item)}
									icon={SignIcon}
								/>
							</View>
							<View style={styles.optionalContainer}>
								<Text bold style={styles.label}>
									Optional
								</Text>
								{isReliefOptional && (
									<DropdownModalPicker
										enableSearch
										label={'Choose your relief...'}
										style={[styles.dropdown]}
										dropdownData={reliefList}
										selectedItem={selectedRelief}
										setSelectedItem={(item) => setSelectedRelief(item)}
										icon={ShakeHandIcon}
									/>
								)}
								<View style={styles.longInputContainer}>
									<TextInput
										style={styles.input}
										placeholder={'Enter reason..'}
										multiline
										value={reason}
										onChangeText={(e) => setReason(e)}
									/>
								</View>
							</View>
						</View>
					</ScrollView>

					{(fetchReliefListApi.loading ||
						fetchApproverListApi.loading ||
						fetchLeaveRecordApi.loading ||
						fetchOffDatesApi.loading ||
						fetchLeaveBalanceApi.loading ||
						submitApplyLeaveApi.loading) && <Loading />}
				</View>
			</AvoidKeyboard>
			<PrimaryBottomButton onPress={handleSubmit} title="Submit" />
		</Screen>
	);
};

export default ApplyLeave;

const styles_ = StyleSheet.create({
	inputContainer: {
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		marginBottom: 12,
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingVertical: 12,
		marginBottom: 10,
	},
	calendarContainer: {
		marginTop: 12,
		marginBottom: 15,
	},
	calendar: {
		borderWidth: 1,
		borderColor: '#D8D8D8',
		marginHorizontal: -1,
	},
	optionalContainer: {
		marginTop: 10,
	},
	dayTypeContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
	},
	dayTypeButton: {
		minWidth: 55,
		alignItems: 'center',
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: colors.medium,
	},
	dayTypeText: {
		fontSize: 12,
	},
	note: {
		fontSize: 11,
		color: colors.secondaryFont,
		marginLeft: 5,
		marginTop: 8,
	},
	label: {
		fontSize: 15,
		marginBottom: 10,
	},
	input: {
		fontSize: 13,
		height: '100%',
		paddingHorizontal: 10,
	},
	dropdown: {
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#D8D8D8',
	},
	longInputContainer: {
		...styles_.inputContainer,
		height: 120,
		paddingVertical: 3,
		marginTop: 10,
	},
	yearContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 12,
	},
	yearButton: {
		minWidth: 100,
		paddingVertical: 8,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		backgroundColor: colors.medium,
	},
	yearButtonText: {
		fontSize: 14,
	},
	reliefDowndown: {
		marginBottom: 10,
	},
});
