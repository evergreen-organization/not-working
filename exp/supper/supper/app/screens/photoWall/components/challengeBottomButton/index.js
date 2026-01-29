import React from 'react';
import { View } from 'react-native';

import { BottomView, Button } from 'atoms';
import { styles } from './styles';

export const ChallengeBottomButtons = ({
	cancelTitle = 'I’ll do it later',
	completeTitle = 'I’ll do it!',
	onCancel,
	onComplete,
	loading = false,
}) => {
	return (
		<BottomView isGap={true} style={styles.view}>
			<View style={styles.row}>
				<Button
					title={cancelTitle}
					onPress={onCancel}
					style={styles.cancelButton}
					labelStyle={styles.cancelText}
				/>
				<Button
					loading={loading}
					style={styles.submitButton}
					labelStyle={styles.submitText}
					title={completeTitle}
					onPress={onComplete}
				/>
			</View>
		</BottomView>
	);
};
