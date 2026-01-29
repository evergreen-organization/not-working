import React from 'react';
import { Modal, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import { colors } from 'configs';
import { Space } from '../../atoms';
import { Text } from '../../atoms';
export const CenterPopUp = ({ visible = false, onClose, children }) => {
	const { width } = useWindowDimensions();
	return (
		<Modal
			animationType={'fade'}
			transparent={true}
			visible={visible}
			onBackdropPress={onClose}
			onRequestClose={onClose}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#00000077',
				}}
			>
				<View
					style={{
						width: width - 60,
						backgroundColor: 'white',
						borderRadius: 10,
						padding: 20,
					}}
				>
					{children}
					{onClose && (
						<>
							<Space height={20} />
							<View
								style={{
									height: 40,
									alignItems: 'center',
									justifyContent: 'flex-end',
								}}
							>
								<TouchableOpacity
									onPress={onClose}
									style={{
										backgroundColor: colors.primary,
										paddingVertical: 8,
										paddingHorizontal: 20,
										borderRadius: 5,
									}}
								>
									<Text bold style={{ fontSize: 13, color: colors.white }}>
										Close
									</Text>
								</TouchableOpacity>
							</View>
						</>
					)}
				</View>
			</View>
		</Modal>
	);
};
