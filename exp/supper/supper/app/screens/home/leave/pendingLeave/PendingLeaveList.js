import React from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import { getDurationFromCurrentTime } from '../../../../utils/dateTime';
import routes from '../../../../navigations/routes';
import { colors } from '../../../../configs/colors';
import { Space, Text } from 'atoms';
import LeaveIcon from '../../../../assets/icon/leave.png';

const PendingLeaveList = ({ data, loading, refreshing, onRefresh }) => {
	const navigation = useNavigation();

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.itemContainer}
				onPress={() => navigation.navigate(routes.APPROVE_LEAVE, { leave: item })}
			>
				<View style={styles.contentContainer}>
					<Text bold style={styles.name}>
						{item.name}
					</Text>
					<View style={styles.dateHorizontalContainer}>
						{item.appLeaveDate.map((leave, index) => {
							const day = Moment(leave.leaveDate, 'M/D/YYYY').format('D');
							const month = Moment(leave.leaveDate, 'M/D/YYYY').format('MMM');
							return (
								<View key={index} style={styles.dateContainer}>
									<View
										style={[
											styles.dateCircle,
											leave.dayType === 0
												? {
														backgroundColor: item.color,
												  }
												: {
														transform: [{ rotate: '90deg' }],
														borderColor: item.color,
														borderLeftWidth: leave.dayType === 1 ? 20 : 0,
														borderRightWidth: leave.dayType === 2 ? 20 : 0,
												  },
										]}
									/>
									<Text bold style={styles.day}>
										{day}
									</Text>
									<Text bold style={styles.month}>
										{month}
									</Text>
								</View>
							);
						})}
						<Text style={styles.year}>
							in {Moment(item.appLeaveDate[0].leaveDate, 'M/D/YYYY').format('YYYY')}
						</Text>
					</View>
					{item.remarks !== '' && (
						<Text style={styles.remarks} numberOfLines={3}>
							{item.remarks}
						</Text>
					)}
					<View style={{ flexDirection: 'row' }}>
						<View style={{ ...styles.tagContainer, backgroundColor: item.color }}>
							<Text style={styles.tag}>{item.leaveName}</Text>
						</View>
						{item.reliefName !== '' && (
							<View
								style={{
									...styles.tagContainer,
									backgroundColor: colors.medium,
									marginLeft: 5,
								}}
							>
								<Text style={styles.tag}>{item.reliefName}</Text>
							</View>
						)}
					</View>
				</View>
				<View style={styles.timeContainer}>
					<Text style={styles.duration}>
						{getDurationFromCurrentTime(item.submitDate, 'M/D/YYYY hh:mm:ss A')}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const renderFooter = () => {
		return (
			<View style={{ backgroundColor: '#F5F5F5', marginTop: 12 }}>
				<Space height={40} />
			</View>
		);
	};

	const renderEmpty = () => {
		return (
			!loading && (
				<View style={styles.noticeContainer}>
					<View style={styles.imageContainer}>
						<Image source={LeaveIcon} style={styles.image} />
					</View>
					<Text style={styles.notice}>No Pending Leaves</Text>
				</View>
			)
		);
	};

	if (data?.length === 0) {
		return renderEmpty();
	}

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
			contentContainerStyle={styles.listContainer}
			ListFooterComponent={renderFooter()}
			refreshing={refreshing}
			onRefresh={onRefresh}
		/>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		backgroundColor: colors.white,
	},
	emptyListContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemContainer: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
		marginHorizontal: 20,
		paddingVertical: 12,
	},
	dateHorizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 6,
	},
	dateContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40,
		marginRight: 5,
	},
	dateCircle: {
		position: 'absolute',
		width: 40,
		height: 40,
		borderRadius: 10,
	},
	tagContainer: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		alignSelf: 'flex-start',
		marginTop: 5,
	},
	contentContainer: {
		flex: 4,
		justifyContent: 'center',
	},
	name: {
		fontSize: 12,
	},
	tag: {
		fontSize: 10,
	},
	day: {
		fontSize: 12,
	},
	month: {
		fontSize: 11,
		color: colors.secondaryFont,
	},
	year: {
		fontSize: 12,
		color: colors.secondaryFont,
	},
	remarks: {
		fontSize: 12,
		color: colors.secondaryFont,
		marginTop: 5,
	},
	timeContainer: {
		justifyContent: 'center',
	},
	duration: {
		fontSize: 12,
		color: colors.primaryFont,
	},
	noticeContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	notice: {
		textAlign: 'center',
		fontSize: 14,
		marginVertical: 12,
	},
	imageContainer: {
		alignItems: 'center',
	},
	image: {
		width: 60,
		height: 60,
	},
});

export default PendingLeaveList;
