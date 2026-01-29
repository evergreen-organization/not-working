import { StyleProp, ViewStyle } from 'react-native';
import { colors } from 'configs';

export type CardVariants = keyof typeof $containerPresets;

const $containerBase: ViewStyle = {
	borderRadius: 10,
	padding: 12,
	shadowColor: colors.black,
	shadowOffset: { width: 0, height: 3 },
	shadowOpacity: 0.1,
	shadowRadius: 4,
	elevation: 1,
};

const $containerPresets = {
	default: [
		$containerBase,
		{
			backgroundColor: colors.white,
		},
	] as StyleProp<ViewStyle>,

	reversed: [
		$containerBase,
		{
			backgroundColor: colors.black,
		},
	] as StyleProp<ViewStyle>,
};

export const styles = {
	$containerPresets,
};
