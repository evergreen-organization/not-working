import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Space, Text } from 'atoms';
import Banner from 'assets/festive/eCardChallenge/new-card-banner.png';
import { styles } from './styles';
import { E_CARDS_QUIZ } from '../../utils/quiz';
import { colors } from 'configs';
import { unlockCard } from 'stores';
import { useDispatch } from 'react-redux';
import { BaseModal } from 'molecules';
import { commonStyles } from 'styles';

export const QuizPopUp = ({ isVisible, id, onClose, onConfirm }) => {
	const dispatch = useDispatch();
	const { question, options, answer } = E_CARDS_QUIZ[id] || {};

	const [selectedOption, setSelectedOption] = useState(null);

	useEffect(() => {
		setSelectedOption(null);
	}, [isVisible]);

	const handleAnswerPress = (item) => {
		setSelectedOption(item.id);
		// if answer correct
		if (item.id === answer) {
			// unlock card
			dispatch(unlockCard({ id }));
		}
	};

	const renderOptionColor = (item) => {
		if (selectedOption === item.id && item.id === answer) {
			return colors.green;
		}
		if (selectedOption === item.id) {
			return colors.red;
		}
		return colors.medium;
	};

	return (
		<BaseModal visible={isVisible} onBackdropPress={onClose} onRequestClose={onClose}>
			<View style={[commonStyles.center]}>
				<View style={styles.content}>
					<Image source={Banner} style={styles.banner} />
					<View style={styles.instructionView}>
						<Text variant={'P4'} style={styles.instructionText}>
							{question}
						</Text>

						{options?.map((item, index) => (
							<TouchableOpacity
								key={item.id}
								onPress={() => handleAnswerPress(item)}
								style={{
									backgroundColor: renderOptionColor(item),
									borderRadius: 5,
									padding: 10,
									marginVertical: 5,
								}}
							>
								<Text variant={'P4'} style={styles.instructionText}>
									{item.text}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					<Space height={20} />
					<View style={styles.buttonContainer}>
						{selectedOption === answer ? (
							<TouchableOpacity onPress={onConfirm} style={styles.unlockButton}>
								<Text variant={'P4'} style={styles.buttonText}>
									Unlock Now!
								</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={onClose} style={styles.cancelButton}>
								<Text variant={'P4'} style={styles.buttonText}>
									Back
								</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
		</BaseModal>
	);
};
