import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import Moment from 'moment';
import { colors } from '../../../../configs/colors';
import Calendar from '../components/Calendar';
import useApi from '../../../../hooks/useApi';
import { fetchLeaveBalance, submitApproveLeave } from '../../../../stores/leave';
import BalanceWidget from '../components/BalanceWidget';
import { formatPendingLeaveRecord } from '../utils/formatLeaveRecord';
import { formatRejectLeave } from '../utils/formatRejectLeave';
import routes from '../../../../navigations/routes';
import { showFailure, showSuccess } from '../../../../utils/message';
import { AvoidKeyboard, Loading, Screen, Text } from 'atoms';
import { ButtonBottom, Header } from 'molecules';

const ApproveLeave = ({ navigation, route }) => {
	const fetchLeaveBalanceApi = useApi(fetchLeaveBalance);
	const submitApproveLeaveApi = useApi(submitApproveLeave);
	const leaveItem = route.params.leave;
	const [currentDate] = useState(
		Moment(route.params.leave.appLeaveDate[0].leaveDate, 'M/D/YYYY hh:mm:ss A').format(
			'YYYY-MM-DD',
		),
	);
	const [leaveBalance, setLeaveBalance] = useState({});
	const [leaveRecord, setLeaveRecord] = useState(null);
	const [remarks, setRemarks] = useState('');

	useEffect(() => {
		loadLeaveBalance(new Date().getFullYear()).then();
		loadLeaveRecord().then();
	}, []);

	const loadLeaveBalance = async (year) => {
		const response = await fetchLeaveBalanceApi.request({
			staffNo: leaveItem.personId,
			year: year?.toString(),
		});
		const { data, problem } = response || {};
		if (problem) {
			return showFailure(problem);
		}
		const found = data.find((item1) => item1.leaveCode === leaveItem.leaveCode);
		if (!found) {
			return;
		}
		const object = {
			code: found.leaveCode,
			accumulated: found.accumulated,
			approved: found.approved,
			balance: found.balance,
			entitled: found.entitled,
			pending: found.pending,
			year: found.year,
		};
		setLeaveBalance(object);
	};

	const loadLeaveRecord = async () => {
		let list = [];
		leaveItem.appLeaveDate.map((date) => {
			list.push({
				dayType: date.dayType,
				leaveDate: date.leaveDate,
				color: leaveItem.color,
			});
		});
		setLeaveRecord(formatPendingLeaveRecord(list));
	};

	const onDayPress = (day) => {
		if (leaveRecord[day.dateString] !== undefined) {
			setLeaveRecord(formatRejectLeave(leaveRecord, day));
		}
	};

	const handleSubmit = async (type) => {
		let approvedDatesList = [];
		let rejectedDatesList = [];
		Object.entries(leaveRecord).forEach(([key, item]) => {
			if (type === 'reject') {
				rejectedDatesList.push({
					leaveDate: key,
					dayType: item.dayType,
				});
			} else {
				if (item.isRejected) {
					rejectedDatesList.push({
						leaveDate: key,
						dayType: item.dayType,
					});
				} else {
					approvedDatesList.push({
						leaveDate: key,
						dayType: item.dayType,
					});
				}
			}
		});
		const response = await submitApproveLeaveApi.request({
			leaveId: leaveItem.leaveId,
			applicantId: leaveItem.personId,
			aprRemarks: remarks,
			isOnBehalf: leaveItem.isOnBeHalf,
			leaveDates: approvedDatesList,
			rejectedLeaveDate: rejectedDatesList,
		});
		const { data, problem } = response || {};
		if (problem) {
			return showFailure(problem);
		}
		showSuccess('Success', data.staus);
		navigation.navigate(routes.PENDING_LEAVE);
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
						text: 'Approve Leave',
					}}
				/>
				<View style={styles.container}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.content}>
							<View style={styles.detailsContainer}>
								<View style={styles.detailsColumnContainer}>
									<Text bold style={styles.name}>
										{leaveItem.name}
									</Text>
									{leaveItem.remarks !== '' && (
										<Text style={styles.remarks}>{leaveItem.remarks}</Text>
									)}
									<View style={{ flexDirection: 'row' }}>
										<View
											style={{
												...styles.tagContainer,
												backgroundColor: leaveItem.color,
											}}
										>
											<Text style={styles.tag}>{leaveItem.leaveName}</Text>
										</View>
										{leaveItem.reliefName !== '' && (
											<View
												style={{
													...styles.tagContainer,
													backgroundColor: colors.medium,
													marginLeft: 5,
												}}
											>
												<Text style={styles.tag}>{leaveItem.reliefName}</Text>
											</View>
										)}
									</View>
								</View>
								<BalanceWidget item={leaveBalance} style={styles.widget} displayDetail={true} />
							</View>

							<View style={styles.calendarContainer}>
								{leaveRecord && (
									<Calendar
										style={styles.calendar}
										leaveRecord={leaveRecord}
										current={currentDate}
										onDayPress={onDayPress}
									/>
								)}
							</View>
							<View style={styles.optionalContainer}>
								<Text bold style={styles.label}>
									Optional
								</Text>
								<View style={styles.longInputContainer}>
									<TextInput
										style={styles.input}
										value={remarks}
										placeholder={'Enter remarks..'}
										onChangeText={(e) => setRemarks(e)}
										multiline
									/>
								</View>
							</View>
						</View>
					</ScrollView>

					{(fetchLeaveBalanceApi.loading || submitApproveLeaveApi.loading) && <Loading />}
				</View>
			</AvoidKeyboard>
			<View style={styles.buttonRowContainer}>
				<View style={styles.buttonContainer}>
					<ButtonBottom style={styles.discardButton} onPress={() => handleSubmit('reject')}>
						Reject
					</ButtonBottom>
				</View>
				<View style={styles.buttonContainer}>
					<ButtonBottom style={styles.sendButton} onPress={() => handleSubmit('approve')}>
						Approve
					</ButtonBottom>
				</View>
			</View>
		</Screen>
	);
};

export default ApproveLeave;

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
	container: { flex: 1 },
	content: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingVertical: 12,
		marginBottom: 10,
	},
	widget: {
		marginRight: 0,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		padding: 12,
	},
	reliefContainer: {
		flexDirection: 'row',
	},
	detailsContainer: {
		flexDirection: 'row',
		backgroundColor: '#F5F5F5',
		marginHorizontal: -0,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 10,
	},
	detailsColumnContainer: {
		flex: 1,
		padding: 12,
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
	buttonRowContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	buttonContainer: {
		flex: 1,
	},
	tagContainer: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		alignSelf: 'flex-start',
		marginTop: 10,
	},
	discardButton: {
		backgroundColor: colors.black,
	},
	sendButton: {
		backgroundColor: colors.primary,
	},
	name: {
		fontSize: 13,
	},
	tag: {
		fontSize: 11,
	},
	remarks: {
		fontSize: 12,
		marginTop: 10,
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
	longInputContainer: {
		...styles_.inputContainer,
		height: 120,
		paddingVertical: 3,
	},
});
