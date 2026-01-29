import React from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { Cross, Divider, Screen, Text, Tick } from 'atoms';
import { styles } from './styles';
import {
	PBSS_1_IDENTIFY_USER,
	PBSS_2_VALIDATE_PAC,
	PBSS_3_ACTIVATE,
	PBSS_4_COMPLETED,
} from '../constant';
import { SectionHeader } from 'molecules';
import { colors } from 'configs';

export const SoftTokenActivationView = (props) => {
	const { step, errorStep, error, handleDone } = props;

	const renderStatus = (num) => {
		if (step === num) {
			return <ActivityIndicator color={colors.primary} />;
		}
		if (errorStep === num) {
			return <Cross />;
		}
		return <Tick />;
	};

	const renderStep = (title, num, isLast = false) => {
		return (
			<>
				<View style={styles.stepContainer}>
					<Text style={styles.text}>{title}</Text>
					{renderStatus(num)}
				</View>
				{errorStep === num && (
					<Text style={styles.errorText}>Error Code: {error}. Please try again later.</Text>
				)}
				{!isLast && <Divider />}
			</>
		);
	};

	return (
		<Screen singlePage>
			<SectionHeader style={styles.heading} subtitle="Activate" title="PB SecureSign" />
			<ScrollView>
				<View style={styles.section}>
					{renderStep('Identify User', PBSS_1_IDENTIFY_USER)}
					{renderStep('Validate PAC', PBSS_2_VALIDATE_PAC)}
					{renderStep('Activate PB SecureSign', PBSS_3_ACTIVATE, true)}
				</View>
			</ScrollView>

			<View>
				{step === PBSS_4_COMPLETED && (
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							testID={'done-activation-button'}
							onPress={handleDone}
							style={styles.buttonDone}
						>
							<Text variant={'P1'} style={styles.labelButton}>
								Done
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</Screen>
	);
};
