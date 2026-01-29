import React from 'react';
import { FlatList, RefreshControl, ScrollView, View, Image } from 'react-native';
import Moment from 'moment';

import { colors } from 'configs';
import { Divider, Loading, Screen, Space, Text } from 'atoms';
import { BottomModal, ChipTab, Header } from 'molecules';
import BookIcon from 'assets/icon/book2.png';
import PlayerIcon from 'assets/icon/player.png';
import BellIcon from 'assets/icon/bell-color.png';
import { Typography } from 'styles';

import { styles } from './styles';
import { CourseItem, TrainingButton } from '../components';

const trainingTabs = [
	{ title: 'Pending', testID: 'pending-tab' },
	{ title: 'Completed', testID: 'completed-tab' },
];

export const TrainingView = ({
	handleStartHerePressed,
	handleReminderPressed,
	handleCourseTabPressed,
	handleCloseModal,
	handleBack,
	start,
	isPendingCourse,
	refreshing,
	trainingReminder,
	isModalVisible,
	loading,
	courseList,
}) => {
	const renderEmptyList = () => {
		return (
			<View testID={'training-empty-list'} style={styles.noticeContainer}>
				<View style={styles.imageContainer}>
					<Image source={BookIcon} style={styles.image} tintColor={colors.primary} />
				</View>
				<Text variant={'P3'} style={styles.notice}>
					{isPendingCourse ? 'No Pending Courses' : 'No Completed Courses'}
				</Text>
			</View>
		);
	};

	const renderList = ({ item, index }) => (
		<CourseItem
			testID={isPendingCourse ? 'pending-course-item' : 'complete-course-item'}
			item={item}
			index={index}
			isLast={index === courseList.length - 1}
		/>
	);

	const renderFooter = () => (
		<View style={styles.footer}>
			<Space height={40} />
		</View>
	);

	const renderReminder = () => {
		if (trainingReminder.length === 0) {
			return (
				<View style={styles.noReminderView}>
					<Text variant={'P1'} style={styles.noReminderText}>
						No reminder
					</Text>
				</View>
			);
		}

		return trainingReminder.map((item, index) => (
			<View key={item.messageDate}>
				<View style={styles.reminderDetail}>
					<Text variant={'P4'}>{Moment(item.messageDate).format('DD MMM YYYY (ddd)')}</Text>
					<Text variant={'P3'} style={styles.text}>
						{item.message}
					</Text>
				</View>
				{index !== trainingReminder.length - 1 && <Divider />}
			</View>
		));
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleBack,
				}}
				centerComponent={{
					text: 'Training',
					style: Typography.H6,
				}}
			/>

			<View style={styles.headerContainer}>
				<View style={styles.headerView}>
					<TrainingButton
						title="PBStart Here"
						testID={'training-pbstart-button'}
						icon={PlayerIcon}
						onPress={handleStartHerePressed}
					/>
					<Space width={10} />
					<TrainingButton
						testID={'training-reminder-button'}
						title="Reminder"
						icon={BellIcon}
						onPress={handleReminderPressed}
					/>
				</View>

				<ChipTab tabs={trainingTabs} onPress={handleCourseTabPressed} />
			</View>

			<FlatList
				data={courseList}
				keyExtractor={(item, index) => index.toString()}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={start} tintColor={'#818181'} />
				}
				showsVerticalScrollIndicator={false}
				renderItem={renderList}
				ListFooterComponent={renderFooter}
				ListEmptyComponent={renderEmptyList}
			/>

			<BottomModal testID={'reminder-modal'} isVisible={isModalVisible} onCancel={handleCloseModal}>
				<ScrollView>
					<View style={styles.container}>{renderReminder()}</View>
				</ScrollView>
			</BottomModal>

			{loading && <Loading />}
		</Screen>
	);
};
