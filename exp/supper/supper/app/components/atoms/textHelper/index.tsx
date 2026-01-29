import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from 'configs';
import { Text } from '../text';

const TextHelper = ({ isValid, errorMsg, showCount, length, maxLength }) => {
	return (
		<View style={styles.container}>
			<View style={styles.flex}>{!isValid && <Text style={styles.lblError}>{errorMsg}</Text>}</View>
			{showCount && (
				<Text style={styles.lblCount}>
					{length}/{maxLength}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center' },
	flex: { flex: 1 },
	lblError: { color: colors.primary, fontSize: 13, marginTop: 5 },
	lblCount: { fontSize: 13, marginLeft: 5, marginTop: 5 },
});

export default TextHelper;
