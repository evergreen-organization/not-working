import { Icon, PrimaryButton, Text } from 'atoms';
import { colors } from 'configs';

import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { PopUp } from '../popUp';

export const ComingSoonPopUp = ({
	isPopUpVisible,
	setIsPopUpVisible,
	image,
	text,
	backdropPress = true,
	tintColor = true,
	onPressClosePopUp,
}) => {
	return (
		<PopUp
			isVisible={isPopUpVisible}
			setVisible={setIsPopUpVisible}
			disableBackdropPress={backdropPress}
		>
			<View style={styles.popUpHeader}>
				<Text style={{ fontSize: 16, fontWeight: 700 }}>Notification</Text>

				<TouchableOpacity onPress={onPressClosePopUp} style={styles.crossIconContainer}>
					<Icon type={'entypo'} name={'squared-cross'} style={styles.crossIcon} />
				</TouchableOpacity>
			</View>
			<View style={styles.popUpContent}>
				<Image
					source={image}
					resizeMode="cover"
					tintColor={tintColor && '#EA9312'}
					style={{ width: 40, height: 40, marginBottom: 30 }}
				/>
				<Text variant={'P6'} style={{ textAlign: 'center' }}>
					{text}
				</Text>
			</View>

			<PrimaryButton
				title="Close"
				color={colors.primary}
				onPress={onPressClosePopUp}
				fill={false}
			/>
		</PopUp>
	);
};
const styles = StyleSheet.create({
	popUpHeader: {
		paddingTop: 29,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		borderRadius: 6,
	},
	crossIcon: {
		fontSize: 32,
		color: colors.primary,
		borderRadius: 6,
	},
	popUpContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	crossIconContainer: {
		position: 'absolute',
		right: 0,
		top: 20,
	},
	buttonContent: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
	},
	buttonText: {
		color: colors.white,
		fontSize: 14,
		fontFamily: 'Montserrat-Bold',
	},
});
