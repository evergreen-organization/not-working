import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from 'configs';
import VictoryIcon from 'assets/icon/victory.png';
import { Text } from 'atoms';

export const HomeWidget = () => {
	return (
		<View style={styles.container}>
			<Image source={VictoryIcon} style={styles.image} />
			<View style={styles.textContainer}>
				<Text bold style={styles.labelHeader}>
					"A positive attitude will allow us to look at ways to improve and ways to overcome
					obstacles to excellence"
				</Text>
				<View style={styles.lineContainer}>
					<View style={styles.line} />
				</View>
				<Text style={styles.labelCaption}>- The Late Tan Sri Dato' Sri Dr. Teh Hong Piow</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		borderRadius: 10,
		flexDirection: 'row',
		padding: 15,
		paddingVertical: 20,
		shadowColor: colors.shadow,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.primary,
		marginHorizontal: 20,
		marginTop: 20,
	},
	textContainer: {
		paddingLeft: 20,
		flex: 1,
	},
	labelHeader: {
		fontSize: 11,
		color: colors.white,
	},
	lineContainer: {
		marginVertical: 5,
	},
	line: {
		borderTopWidth: 0.4,
		borderTopColor: '#d8d8d8',
	},
	labelCaption: {
		fontSize: 11,
		color: colors.white,
	},
	image: {
		width: 55,
		height: 55,
	},
});
