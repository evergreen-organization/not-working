import { View, useWindowDimensions } from 'react-native';
import React from 'react';
import styles from './styles';
import { localDeviceInfo } from 'utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'atoms';
import LinearGradient from 'react-native-linear-gradient';

const VersionInfo = ({ isKeyboardVisible }: { isKeyboardVisible?: boolean }) => {
	const { width: windowWidth } = useWindowDimensions();
	const { bottom } = useSafeAreaInsets();

	if (isKeyboardVisible) {
		return null;
	}
	return (
		<>
			<LinearGradient
				colors={['transparent', 'black']}
				style={[styles.bottomGradientView, { height: bottom + 150 }]}
			/>
			<View style={[styles.versionContainer, { width: windowWidth / 2, bottom: bottom + 10 }]}>
				<Text bold style={styles.appName}>
					PBeXperience
				</Text>
				<Text bold style={styles.versionName}>{`v${localDeviceInfo.version}`}</Text>
			</View>
		</>
	);
};

export default VersionInfo;
