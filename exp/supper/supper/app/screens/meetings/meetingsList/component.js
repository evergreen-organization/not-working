import React from 'react';
import Moment from 'moment/moment';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { Loading, Screen, Space, Text } from 'atoms';
import { BottomModal, CalendarList, Header } from 'molecules';
import TalkIcon from 'assets/icon/talk.png';
import { MeetingItem } from '../meetingItem';
import { styles } from './styles';
import { DATE_YMD } from '../../../configs/dateFormat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MeetingListView = ({
	meetings,
	handleScroll,
	handleRefresh,
	toggleModalCalendar,
	handleAttendees,
	reachEnd,
	modalCalendarVisible,
	handleDateSelected,
	loading,
}) => {
	const { top } = useSafeAreaInsets();

	const renderMeetingList = () => {
		if (meetings?.length === 0) {
			return (
				<View testID={'no-meeting-list-view'} style={styles.noticeContainer}>
					<View style={styles.imageContainer}>
						<Image source={TalkIcon} style={styles.image} />
					</View>
					<Text variant={'P1'} style={styles.notice}>
						No Meetings
					</Text>
				</View>
			);
		}

		return (
			<ScrollView
				onScroll={handleScroll}
				scrollEventThrottle={400}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={false} onRefresh={handleRefresh} tintColor={'#818181'} />
				}
			>
				<View style={styles.meetingList}>
					<Space height={10} />
					{meetings?.map((event, index) => (
						<MeetingItem
							key={`${index}-${event.id}`}
							index={index}
							event={event}
							meetingList={meetings}
							onMeetingDatePress={toggleModalCalendar}
							onGetMeetingAttendees={() => handleAttendees(event)}
						/>
					))}
					{loading && <Loading isPagingLoading />}
					{reachEnd && <Text style={styles.reachEnd}>End of list</Text>}
				</View>
			</ScrollView>
		);
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Meetings',
				}}
			/>

			<View style={{ flex: 1 }}>{renderMeetingList()}</View>
			<BottomModal
				isVisible={modalCalendarVisible}
				onCancel={toggleModalCalendar}
				containerStyle={{ paddingTop: top }}
			>
				<CalendarList
					current={Moment().format(DATE_YMD)}
					minDate={Moment().format(DATE_YMD)}
					onDayPress={handleDateSelected}
				/>
			</BottomModal>
		</Screen>
	);
};
