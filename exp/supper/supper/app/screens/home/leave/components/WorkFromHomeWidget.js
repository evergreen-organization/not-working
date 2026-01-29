import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../../../configs/colors';
import { Text } from 'atoms';

const WorkFromHomeWidget = ({ days, color, displayDetail }) => {
	return (
		<View style={[styles.container]}>
			{displayDetail && (
				<View>
					<Text style={styles.entitled}>
						<Text bold style={styles.balance}>
							{(days ?? 0) + ' '}
						</Text>
						<Text>{days > 1 ? 'days' : 'day'}</Text>
					</Text>
					<View style={styles.descriptionContainer}>
						<Text style={styles.description}> days approved</Text>
						<Text style={styles.description}> days pending</Text>
					</View>
				</View>
			)}
			<View
				style={{
					...styles.titleContainer,
					backgroundColor: color,
					...(displayDetail && { marginTop: 15 }),
				}}
			>
				<Text style={styles.title}>WORK FROM HOME</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		borderRadius: 10,
		marginRight: 10,
		padding: 15,
		// width: 180,
	},
	descriptionContainer: { marginTop: 10 },
	balance: { fontSize: 20 },
	entitled: { fontSize: 14 },
	description: { fontSize: 12, color: 'transparent' },
	titleContainer: { paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
	title: { fontSize: 10 },
});

export default WorkFromHomeWidget;
