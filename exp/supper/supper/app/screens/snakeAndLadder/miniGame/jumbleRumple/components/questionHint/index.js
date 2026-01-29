import React from 'react';
import { ImageBackground, View } from 'react-native';
import { styles } from './styles';
import { Button, Space, Text } from 'atoms';
import { colors } from 'configs';
import arrow from 'assets/icon/left-arrow.png';
import backgroundImage from '../../../../assets/wordzzle/img_hint_panel.png';
import { convertHtmlToString } from 'screens/snakeAndLadder/utils/questionUtility';

export const QuestionHint = ({ hints, index, onPrevious, onNext }) => {
	const previousHintDisabled = index < 1;
	const nextHintDisabled = index === hints.length - 1;

	return (
		<View style={styles.questionContainer}>
			<ImageBackground resizeMode="stretch" source={backgroundImage} style={styles.bg}>
				<Text bold style={styles.underlineTitle} as={Text.type.H6}>
					{hints?.length > 1 ? `Hint ${index + 1}` : 'Hint'}
				</Text>
				<Space height={10} />
				<Text style={styles.hintText} as={Text.type.H6}>
					{hints?.length > 1 ? convertHtmlToString(hints[index]) : convertHtmlToString(hints[0])}
				</Text>
				{hints?.length > 1 && (
					<View style={styles.buttonContainer}>
						<Button
							preset={'text'}
							color={previousHintDisabled ? colors.black : colors.white}
							disabled={previousHintDisabled}
							onPress={onPrevious}
							leftIcon={arrow}
							iconStyle={styles.buttonIcon}
							style={styles.leftButton}
						/>
						<Button
							preset={'text'}
							color={nextHintDisabled ? colors.black : colors.white}
							disabled={nextHintDisabled}
							onPress={onNext}
							leftIcon={arrow}
							iconStyle={styles.buttonIcon}
							style={styles.rightButton}
						/>
					</View>
				)}
			</ImageBackground>
		</View>
	);
};
