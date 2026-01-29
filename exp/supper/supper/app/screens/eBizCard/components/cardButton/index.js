import React from 'react';
import { Card } from 'atoms';
import { colors } from 'configs';
import { Platform, StyleSheet } from 'react-native';

export const CardButton = ({ icon, onPress = () => {}, title }) => {
	return (
		<Card
			onPress={onPress}
			style={[
				styles.card,
				Platform.OS === 'ios' ? { ...styles.shadowIos } : { ...styles.shadowAndroid },
			]}
		>
			<Card.Content>
				<Card.Image resizeMode="contain" source={icon} containerStyle={styles.icon} />
				<Card.Title title={title} titleStyle={styles.title} titleTypography={'P9'} />
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainer: {},
	card: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 20,
		alignItems: 'center',
		margin: 10,

		shadowRadius: 2,
	},
	shadowIos: {
		shadowOffset: { width: -2, height: 4 },
		shadowColor: '#171717',
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	shadowAndroid: {
		shadowColor: '#171717',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.065,
		shadowRadius: 10,
		elevation: 2,
	},
	icon: {
		width: 45,
		height: 35,
		marginBottom: 8,
	},
	title: {
		color: colors.secondaryFont,
		textAlign: 'center',
	},
});
