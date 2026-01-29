import React, { Fragment } from 'react';
import { useWindowDimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, gStyles } from 'configs';
import { BiometricAccess } from 'constant';
import DeleteIcon from 'assets/icon/delete.png';
import { Text } from 'atoms';
import { BiometricButton } from 'organisms';

const numbers = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8', '9'],
];

export const NumpadSmall = ({
	testID,
	onPress,
	onDelete,
	onBiometric,
	biometricType = BiometricAccess.SOFT_TOKEN,
}) => {
	const window = useWindowDimensions();
	const width = (window.width - 32) * 0.33;

	const renderRows = () => {
		return numbers.map((row) => {
			return (
				<Fragment key={`row${row?.join('')}`}>
					<View style={styles.rowContainer}>
						{row.map((number, rowIndex) => renderNumber(number, rowIndex))}
					</View>
				</Fragment>
			);
		});
	};

	const renderNumber = (number, index) => {
		return (
			<TouchableOpacity
				testID={`${testID}-numpad-small-${number}`}
				key={`${number}${index}`}
				onPress={() => onPress(number)}
				style={{ ...styles.btn, width }}
			>
				<Text style={styles.btnText}>{number}</Text>
			</TouchableOpacity>
		);
	};

	const empty = () => <View style={{ ...styles_.btnArea, width }} />;

	return (
		<View style={styles.container}>
			{renderRows()}

			<View style={styles.rowContainer}>
				{onBiometric ? (
					<BiometricButton
						type={biometricType}
						onPress={onBiometric}
						style={{ ...styles.biometricButton, width }}
						small
					/>
				) : (
					empty()
				)}
				{renderNumber('0')}
				{onDelete ? (
					<TouchableOpacity onPress={onDelete} style={{ ...styles.btn2, width }}>
						<Image source={DeleteIcon} style={styles.icon} />
					</TouchableOpacity>
				) : (
					empty()
				)}
			</View>
		</View>
	);
};

const styles_ = StyleSheet.create({
	btnArea: {
		height: 48,
		borderRadius: 5,
	},
});

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		backgroundColor: colors.background,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 8,
	},
	btn: {
		...styles_.btnArea,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		...gStyles.shadow_light,
	},
	btn2: {
		...styles_.btnArea,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		fontSize: 17,
	},
	icon: {
		width: 22,
		height: 22,
		tintColor: colors.black,
	},
	biometricButton: {
		flex: 0,
	},
});

export default NumpadSmall;
