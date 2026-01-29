import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import useApi from '../../../hooks/useApi';
import {
	fetchLeaveBalance,
	fetchLeaveRecord,
	fetchStaffList,
	fetchWorkFromHomeSchedule,
	getLeave,
} from '../../../stores/leave';
import routes from '../../../navigations/routes';
import Calendar from './components/Calendar';
import BalanceWidget from './components/BalanceWidget';
import { colors } from '../../../configs/colors';
import { formatLeaveRecord } from './utils/formatLeaveRecord';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import WorkFromHomeWidget from './components/WorkFromHomeWidget';
import { showFailure } from '../../../utils/message';
import { getModulesAvailable } from '../../../stores/login';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Loading, Screen, Text } from 'atoms';
import { DropdownModalPicker, Header } from 'molecules';
import { commonStyles, initialBottom, Typography } from 'styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Leave = ({ navigation }) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const user = useSelector((state) => state.user);
	const { staffList, leaveBalance, leaveRecord, wfhRecord } = useSelector(getLeave);
	const fetchStaffListApi = useApi(fetchStaffList);
	const fetchLeaveBalanceApi = useApi(fetchLeaveBalance);
	const fetchLeaveRecordApi = useApi(fetchLeaveRecord);
	const fetchWorkFromHomeScheduleApi = useApi(fetchWorkFromHomeSchedule);
	const balanceViewable =
		Number(user?.gradeCode) <= 300010 || user.division?.substring(0, 3) !== 'ITD';
	const [visibleRecord, setVisibleRecord] = useState(null);
	const modulesAvailable = useSelector(getModulesAvailable);
	const [displayDetail, setDisplayDetail] = useState(balanceViewable);
	const [selectedStaff, setSelectedStaff] = useState({
		Name: user.name,
		Id: user.staffId,
	});
	const [currentDate, setCurrentDate] = useState(new Date());
	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(
		useCallback(() => {
			handleDetailsChange();
		}, [selectedStaff, currentDate.getFullYear()]),
	);

	useEffect(() => {
		loadStaffList();
	}, []);

	useEffect(() => {
		if (leaveRecord || wfhRecord) {
			const formatted = formatLeaveRecord([wfhRecord, leaveRecord].flat(1));
			setVisibleRecord(formatted);
		}
	}, [wfhRecord, leaveRecord]);

	const loadStaffList = async () => {
		const response = await fetchStaffListApi.request();
		if (response.problem) {
			return showFailure(response.problem);
		}
	};

	const loadLeaveBalance = async (year) => {
		const response = await fetchLeaveBalanceApi.request({
			staffNo: selectedStaff.Id,
			year: year?.toString(),
		});
		if (response.problem) {
			return showFailure(response.problem);
		}
	};

	const loadLeaveRecord = async () => {
		const response = await fetchLeaveRecordApi.request({
			staffNo: selectedStaff.Id,
			stYearMth: currentDate.getFullYear() + '01',
			edYearMth: currentDate.getFullYear() + '12',
		});
		if (response.problem) {
			return showFailure(response.problem);
		}
	};

	const loadWorkFromHome = async () => {
		const response = await fetchWorkFromHomeScheduleApi.request({
			staffNo: selectedStaff.Id,
			monthYearStart: currentDate.getFullYear() + '01',
			monthYearEnd: currentDate.getFullYear() + '12',
		});
		if (response.problem) {
			return showFailure(response.problem);
		}
	};

	const handleDetailsChange = () => {
		loadLeaveBalance(currentDate.getFullYear());
		loadLeaveRecord();
		setDisplayDetail(balanceViewable || selectedStaff.Id === user.staffId); // For ITD, staff only can view own balance, except managers, other division can view others

		if (modulesAvailable.workFromHome) {
			loadWorkFromHome();
		}
	};

	const handleRefresh = () => {
		loadStaffList();
		loadLeaveBalance(currentDate.getFullYear());
		loadLeaveRecord();
	};

	const onRefresh = () => {
		setRefreshing(true);
		handleRefresh();
		setRefreshing(false);
	};

	const handleActionSheet = () => {
		showActionSheetWithOptions(
			{
				title: '',
				options:
					user.gradeCode <= 500010
						? ['Cancel', 'Apply Annual Leave', 'Approve Leave']
						: ['Cancel', 'Apply Annual Leave'],
				cancelButtonIndex: 0,
				userInterfaceStyle: 'light',
				containerStyle: {
					paddingBottom: initialBottom,
				},
			},
			(index) => {
				if (index === 1) {
					navigation.navigate(routes.APPLY_LEAVE);
				} else if (index === 2) {
					navigation.navigate(routes.PENDING_LEAVE);
				}
			},
		);
	};

	const onVisibleMonthsChange = (date) => {
		const visibleMonth = new Date(date[0].timestamp);
		setCurrentDate(visibleMonth);
	};

	const handleTodayButton = () => {
		const today = new Date();
		setCurrentDate(today);
	};

	return (
		<SafeAreaView style={[commonStyles.fill]}>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Leave',
					style: Typography.H6,
				}}
				rightComponent={
					<TouchableOpacity style={styles.headerIconContainer} onPress={handleActionSheet}>
						<Entypo name="plus" style={styles.headerIcon} />
					</TouchableOpacity>
				}
			/>

			<View style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainer}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					<View style={styles.dropdownContainer}>
						<DropdownModalPicker
							enableSearch
							dropdownData={staffList}
							selectedItem={selectedStaff}
							setSelectedItem={(item) => setSelectedStaff(item)}
						/>
					</View>
					<View style={styles.overviewHeaderContainer}>
						<Text style={styles.headerText}>Overview</Text>
						<TouchableOpacity
							style={styles.todayButtonContainer}
							onPress={() => handleTodayButton()}
						>
							<Text style={styles.headerText}>Today</Text>
							<EvilIcons name="clock" style={styles.todayIcon} />
						</TouchableOpacity>
					</View>
					<View>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.carouselContainer}
						>
							{modulesAvailable.workFromHome && wfhRecord && (
								<WorkFromHomeWidget
									days={wfhRecord.length}
									color={'#ffdac0'}
									displayDetail={displayDetail}
								/>
							)}
							{leaveBalance.map((item, index) => {
								return <BalanceWidget key={item.code} item={item} displayDetail={displayDetail} />;
							})}
						</ScrollView>
					</View>
					<View style={styles.calendarContainer}>
						{leaveRecord && (
							<Calendar
								leaveRecord={visibleRecord}
								current={currentDate}
								onVisibleMonthsChange={onVisibleMonthsChange}
							/>
						)}
					</View>
				</ScrollView>
				{(fetchStaffListApi.loading ||
					fetchLeaveBalanceApi.loading ||
					fetchLeaveRecordApi.loading) && <Loading />}
			</View>
		</SafeAreaView>
	);
};

export default Leave;

const styles = StyleSheet.create({
	container: { flex: 1 },
	contentContainer: { paddingVertical: 10 },
	dropdownContainer: { marginBottom: 20, marginHorizontal: 20 },
	overviewHeaderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 5,
		marginHorizontal: 20,
	},
	headerText: {
		fontSize: 13,
	},
	headerIconContainer: {
		padding: 6,
		backgroundColor: colors.white,
	},
	headerIcon: {
		fontSize: 25,
		color: colors.primary,
	},
	todayIcon: {
		fontSize: 22,
		marginLeft: 2,
	},
	todayButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	carouselContainer: {
		alignItems: 'center',
		paddingVertical: 15,
		paddingLeft: 20,
		paddingRight: 10,
	},
	calendarContainer: {
		marginVertical: 15,
		marginHorizontal: 20,
	},
});
