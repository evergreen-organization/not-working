import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Screen, Text, Icon, Loading, PrimaryButton } from 'atoms';
import { Header, BottomModal } from 'molecules';
import { LOADING } from 'constant';
import { Typography } from 'styles';
import { ReadingGoalsContent, ReadingGoalsWidget } from '../components';
import { styles } from './styles';

export const ReadingGoalsView = ({
	handleOpenModal,
	handleCloseModal,
	handleUpdateReadingStatus,
	handleDeleteReadingList,
	handleSubmitReadingList,
	handleChangeTitleText,
	handleChangeAuthorText,
	readingList,
	goals,
	title,
	author,
	loadingGoals,
	showModal,
}) => {
	const navigation = useNavigation();
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Goals',
					style: Typography.H6,
				}}
			/>
			<View testID={'reading-goal-screen'} style={styles.widgetContainer}>
				<ReadingGoalsWidget goals={goals} loading={loadingGoals} />
			</View>
			<View style={styles.contentHeaderContainer}>
				<Text variant={'P2'}>Reading List</Text>
				<TouchableOpacity
					testID={'add-reading-goal'}
					style={styles.addButtonContainer}
					onPress={handleOpenModal}
				>
					<Icon type="material" name="add" style={styles.addIcon} />
					<Text variant={'P3'} style={styles.contentSubHeading}>
						Add
					</Text>
				</TouchableOpacity>
			</View>

			<ReadingGoalsContent
				list={readingList}
				loading={loadingGoals}
				onUpdateReadingStatus={handleUpdateReadingStatus}
				onDeleteReadingList={handleDeleteReadingList}
			/>

			<BottomModal
				avoidKeyboard
				isVisible={showModal}
				closeModal={handleCloseModal}
				onCancel={handleCloseModal}
			>
				<View style={styles.modalContainer}>
					<Text style={styles.inputLabel}>Title</Text>
					<View style={styles.inputContainer}>
						<TextInput
							testID={'reading-goal-title-text-input'}
							style={styles.input}
							value={title}
							onChangeText={handleChangeTitleText}
						/>
					</View>
					<Text style={styles.inputLabel}>Author</Text>
					<View style={styles.inputContainer}>
						<TextInput
							testID={'reading-goal-author-text-input'}
							style={styles.input}
							value={author}
							onChangeText={handleChangeAuthorText}
						/>
					</View>
					<PrimaryButton
						onPress={handleSubmitReadingList}
						title="Add book to list"
						style={styles.addReadingGoalButton}
					/>
				</View>
			</BottomModal>
			{loadingGoals === LOADING && <Loading />}
		</Screen>
	);
};
