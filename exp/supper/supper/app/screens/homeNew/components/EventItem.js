import React from 'react';

import { StyleSheet, View } from 'react-native';
import { colors } from '../../../configs/colors';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showFestive } from 'constant';
import { Text } from 'atoms';

const EventItem = ({ date, time, description, lineColor = colors.primary }) => {
	const getDay = () => Moment(date).format('DD') ?? '...';
	const getMonth = () => Moment(date).format('MMM') ?? '...';
	const getDescription = () => description ?? '...';
	const getTime = () => Moment(date).format('h:mm a') ?? '...';

	return (
		<View style={styles.invitationContainer}>
			<View style={[styles.line, { backgroundColor: lineColor }]} />
			<View style={styles.dateContainer}>
				<Text bold style={styles.day}>
					{getDay()}
				</Text>
				<Text bold style={styles.month}>
					{getMonth()}
				</Text>
			</View>
			<View style={styles.detailsContainer}>
				<Text bold style={styles.description} numberOfLines={2}>
					{getDescription()}
				</Text>
				<View style={styles.timeContainer}>
					<MaterialIcons name="access-time" style={styles.timeIcon} />
					<Text style={styles.time}>{getTime()}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		color: colors.primaryFont,
		fontWeight: 'bold',
	},
	invitationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: showFestive ? 1 : 0,
	},
	line: { height: '100%', width: 2.5 },
	dateContainer: { paddingHorizontal: 10, alignItems: 'center' },
	day: { fontSize: 20, color: colors.primaryFont },
	month: { fontSize: 11, color: colors.secondaryFont },
	timeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
	detailsContainer: { flex: 1, paddingHorizontal: 10 },
	description: { fontSize: 12, color: colors.primaryFont },
	timeIcon: { fontSize: 12, color: colors.secondaryFont },
	time: { fontSize: 12, color: colors.secondaryFont, marginLeft: 5 },
});

export default EventItem;
