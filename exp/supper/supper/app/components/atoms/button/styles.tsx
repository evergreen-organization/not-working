import { colors } from 'configs';
import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	loading: {
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'stretch',
		padding: 8,
	},
	icon: {
		height: 20,
		width: 20,
		marginHorizontal: 5,
		resizeMode: 'contain',
	},
	label: {
		marginHorizontal: 5,
		textAlign: 'center',
	},
	outlineButton: {
		borderRadius: 10,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		padding: 10,
	},
	button: {
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'stretch',
		padding: 10,
	},
});

const { buttonContainer, loading, icon, label, outlineButton, button } = baseStyles;

const textPreset = {
	loading: loading,
	label: { ...label, color: colors.primary },
	button: button,
	icon: { ...icon, tintColor: colors.primary },
};

const outlinePreset = {
	loading: { ...loading, borderWidth: 1 },
	label: { ...label, color: colors.primary },
	button: { ...outlineButton, borderColor: colors.primary },
	icon: { ...icon, tintColor: colors.primary },
};

const solidPreset = {
	loading: loading,
	label: { ...label, color: colors.white },
	button: { ...button, borderColor: colors.primary },
	icon: { ...icon, tintColor: colors.white },
};

export const styles = {
	buttonContainer,
	textPreset,
	outlinePreset,
	solidPreset,
};
