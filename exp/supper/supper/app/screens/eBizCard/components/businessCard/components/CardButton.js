import { PrimaryButton } from 'atoms';
import { commonStyles } from 'styles';
import { styles } from '../Style';

export const CardButton = ({ image, text, onPress, imageStyle }) => {
	return (
		<PrimaryButton
			title={text}
			leftIcon={image}
			isTitleBold
			style={[commonStyles.justifyContentCenter]}
			iconStyle={[commonStyles.center, styles.shareIcon, imageStyle]}
			onPress={onPress}
		/>
	);
};
