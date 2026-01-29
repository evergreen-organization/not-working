import React from 'react';
import { View } from 'react-native';
import { Text } from 'atoms';
import { styles } from './styles';

export const FormTitle = ({ label, subtitle, mandatory = false }) => {
	return (
		<>
			<View style={styles.row}>
				<Text variant={'P7'}>{label}</Text>
				{mandatory && (
					<Text variant={'P7'} style={styles.mandatoryText}>
						*
					</Text>
				)}
			</View>
			{subtitle && (
				<Text variant={'P5'} style={styles.subtitle}>
					{subtitle}
				</Text>
			)}
		</>
	);
};
