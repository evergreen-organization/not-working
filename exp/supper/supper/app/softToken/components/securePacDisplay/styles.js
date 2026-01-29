import { StyleSheet } from 'react-native';
import { colors } from 'configs';
import { screenWidth } from 'constant';

export const styles = StyleSheet.create({
	view: { backgroundColor: colors.white, borderRadius: 10, padding: 20 },
	pac: { marginVertical: 15, textAlign: 'center' },
	btn: { backgroundColor: colors.primary, borderRadius: 10, padding: 10 },
	btnText: { color: colors.white, textAlign: 'center' },
	container: { alignItems: 'center', paddingHorizontal: screenWidth * 0.05 },
});
