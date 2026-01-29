import { Button, Icon, Text } from 'atoms';
import { colors } from 'configs';

import React from 'react';
import { StyleSheet, Platform, TouchableOpacity, View } from 'react-native';

import { PopUp } from '../popUp';
import { ShadowedView } from 'react-native-fast-shadow';

export const EBizApproveTagPopup = ({ isVisible, setVisible, onClose, onRight, isLoading }) => {
	return (
		<PopUp isVisible={isVisible} setVisible={setVisible}>
			<View style={styles.popUpHeader}>
				<Text style={{ fontSize: 16, fontWeight: 700 }}>Confirmation</Text>

				<TouchableOpacity onPress={onClose} style={styles.crossIconContainer}>
					<Icon type={'entypo'} name={'squared-cross'} style={styles.crossIcon} />
				</TouchableOpacity>
			</View>

			<View style={styles.popUpContent}>
				<Icon
					type={'font-awesome'}
					name={'exclamation-triangle'}
					style={{ fontSize: 60, color: colors.yellow }}
				/>
				<Text style={styles.popUpText}>
					Are you sure you want to{' '}
					<Text style={{ color: colors.green, fontWeight: 'bold' }}>APPROVE</Text> the tag?
				</Text>
			</View>

			<View style={styles.buttonContainerPopUp}>
				<View style={{ flex: 1 }}>
					<ShadowedView
						style={[
							{ flex: 1 },
							Platform.OS === 'ios' ? { ...styles.shadowIos } : { ...styles.shadowAndroid },
						]}
					>
						<Button
							title="Cancel"
							color={colors.white}
							labelStyle={styles.cancelText}
							style={styles.cancelButton}
							onPress={onClose}
						/>
					</ShadowedView>
				</View>
				<View style={{ flex: 1 }}>
					<Button
						title="Renew"
						loading={isLoading}
						color={colors.green}
						labelStyle={styles.buttonText}
						style={styles.button}
						onPress={onRight}
					/>
				</View>
			</View>
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
	cancelButton: {
		borderRadius: 6,
	},
	shadowIos: {
		shadowOffset: { width: -2, height: 4 },
		shadowColor: '#171717',
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	shadowAndroid: {
		shadowColor: '#171717',
		shadowOffset: { width: 2, height: 6 },
		shadowOpacity: 0.085,
		shadowRadius: 12,
		elevation: 1,
	},
	buttonContainerPopUp: {
		gap: 20,
		justifyContent: 'center',
		flexDirection: 'row',
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
	popUpText: {
		color: '#000',
		fontSize: 16,
		fontFamily: 'Montserrat-Bold',
		textAlign: 'left',
		marginTop: 20,
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
	cancelText: {
		color: '#000',
		fontSize: 14,
		fontFamily: 'Montserrat-Bold',
	},
});
