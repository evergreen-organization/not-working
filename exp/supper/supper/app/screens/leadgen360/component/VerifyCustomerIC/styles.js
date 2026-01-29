import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	view: { flexDirection: 'row', justifyContent: 'space-between' },
	formButton: { flex: 1, marginLeft: 30 },
	infoButton: { alignSelf: 'center', marginRight: 20 },
	infoImage: { width: 20, height: 20, tintColor: colors.primary },
	icInputView: { paddingHorizontal: 20 },
});
