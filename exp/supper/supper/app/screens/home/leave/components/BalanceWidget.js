import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../../../configs/colors';
import { Text } from 'atoms';

const BalanceWidget = ({ item, style, displayDetail }) => {
	return (
		<View style={[styles.container, style]}>
			{displayDetail && (
				<View>
					<Text style={styles.entitled}>
						<Text bold style={styles.balance}>
							{item.code === 'R002' || item.code === 'R003' ? '-' : item.balance}{' '}
						</Text>
						/ {item.code === 'R002' || item.code === 'R003' ? '-' : item.entitled}{' '}
						{item.accumulated !== 0 ? ` + ${item.accumulated}` : null}
					</Text>
					<View style={styles.descriptionContainer}>
						<Text style={styles.description}>{item.approved} days approved</Text>
						<Text style={styles.description}>{item.pending} days pending</Text>
					</View>
				</View>
			)}
			{item.name && (
				<View
					style={{
						...styles.titleContainer,
						backgroundColor: item.color,
						...(displayDetail && { marginTop: 15 }),
					}}
				>
					<Text style={styles.title}>{item.name}</Text>
				</View>
			)}
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
	description: { fontSize: 12, color: colors.secondaryFont },
	titleContainer: { paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
	title: { fontSize: 10 },
});

export default BalanceWidget;
