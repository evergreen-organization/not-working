import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { commonStyles } from 'styles';
import { Text } from 'atoms';
import BaseModal from '../baseModal';
import styles from './styles';
import { IBottomModalProps } from './types';

const BottomModal = ({
	children,
	isVisible,
	onCancel,
	onConfirm,
	onModalHide,
	avoidKeyboard,
	testID,
	containerStyle,
	showLine = true,
	fullHeight = false,
	hideCancel = false,
}: IBottomModalProps) => {
	return (
		<BaseModal
			showLine={showLine}
			visible={isVisible}
			onBackdropPress={onCancel}
			avoidKeyboard={avoidKeyboard}
			onModalHide={onModalHide}
			style={[commonStyles.justifyContentEnd, styles.baseModal]}
			containerStyle={[styles.container, fullHeight && commonStyles.fill, containerStyle]}
		>
			{children}
			{onCancel && (
				<BottomButton
					testID={testID}
					hideCancel={hideCancel}
					onCancel={onCancel}
					onConfirm={onConfirm}
				/>
			)}
		</BaseModal>
	);
};

export default BottomModal;

interface BottomButtonProps {
	testID?: string;
	hideCancel?: boolean;
	onCancel?: () => void;
	onConfirm?: () => void;
}

const BottomButton: React.FC<BottomButtonProps> = ({ testID, hideCancel, onCancel, onConfirm }) => (
	<>
		<View style={styles.divider} />
		<View style={[commonStyles.row, commonStyles.justifyContentBetween]}>
			{!hideCancel && (
				<TouchableOpacity
					testID={`${testID}-cancel`}
					style={styles.cancelContainer}
					onPress={onCancel}
				>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>
			)}
			{onConfirm && (
				<TouchableOpacity
					testID={`${testID}-confirm`}
					style={styles.cancelContainer}
					onPress={onConfirm}
				>
					<Text style={styles.confirmText}>Confirm</Text>
				</TouchableOpacity>
			)}
		</View>
	</>
);
