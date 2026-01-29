import React, { useEffect } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

import { BottomView, Text } from 'atoms';

import { GuessBox, Keyboard, StatusPopup } from '../components';
import { PIRATE_STATUS } from '../constant';
import { getBackgroundImage } from '../utils';

import { styles } from './styles';
import { Header } from 'molecules';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import hintBg from '../../../assets/hangman/bg-panel-hangman.png';

export const PiratePeril = ({
	correctLetters,
	checkLetterPress,
	answer,
	hint,
	status,
	onComplete,
	modalVisible,
	round,
	attempt,
}) => {
	const insets = useSafeAreaInsets();
	const displayedHint = typeof hint === 'string' ? hint.split(';')[0] : '';

	useEffect(() => {
		if (status === PIRATE_STATUS.LOST || status === PIRATE_STATUS.COMPLETED) {
			onComplete?.();
		}
	}, [status, onComplete]);

	return (
		<>
			<ImageBackground
				source={getBackgroundImage(attempt)}
				style={styles.background}
				imageStyle={styles.backgroundImage}
			>
				<Header containerStyle={{ ...styles.header, marginTop: insets.top }} />

				<View style={styles.container}>
					{/* Scrollable Middle Section */}
					<ScrollView
						contentContainerStyle={styles.scrollContent}
						style={styles.scroll}
						showsVerticalScrollIndicator={false}
					>
						{status === PIRATE_STATUS.PLAYING && (
							<>
								<View style={styles.info}>
									<Text as={Text.type.H4}>{`ROUND: ${round} / 3`}</Text>
									<Text as={Text.type.H4}>{`ATTEMPT: ${attempt}`}</Text>
								</View>

								<ImageBackground
									source={hintBg}
									style={styles.hintBoxBackground}
									imageStyle={styles.hintBoxImage}
								>
									<View style={styles.hintInnerContainer}>
										<Text as={Text.type.H4} style={styles.hint}>
											{displayedHint}
										</Text>

										<View style={styles.guessBoxSection}>
											<GuessBox answer={answer} letters={correctLetters} />
										</View>
									</View>
								</ImageBackground>
							</>
						)}
					</ScrollView>

					{/* Fixed Bottom View */}
					<BottomView
						style={status === PIRATE_STATUS.PLAYING ? styles.bottom : styles.transparentBottom}
					>
						<View style={styles.keyboardView}>
							{status === PIRATE_STATUS.PLAYING && (
								<Keyboard status={status} onPress={checkLetterPress} />
							)}
						</View>
					</BottomView>
				</View>
			</ImageBackground>

			<StatusPopup isVisible={modalVisible} status={status} onPress={onComplete} />
		</>
	);
};
