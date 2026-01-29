import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Loading, Screen, Text } from 'atoms';
import { LOADING } from 'constant';

import { calendarStyles, styles } from './styles';
import { AgendaDayItem } from './components/AgendaDayItem';
import { Header } from 'molecules';

const ReliefAssignmentView = (
	{
		loading,
		dateObj,
		status,
		loadItems,
		startDate,
		endDate,
		markedObj,
		handleRefresh,
		refreshing,
		onDayPress,
	},
	ref,
) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Relief Assignment',
				}}
			/>
			<View style={styles.flex}>
				{loading ? (
					<Loading />
				) : (
					<View style={styles.screen}>
						<Agenda
							ref={ref}
							// The list of items that have to be displayed in agenda. If you want to render item as empty date
							// the value of date key has to be an empty array []. If there exists no value for date key it is
							// considered that the date in question is not yet loaded
							items={dateObj}
							// Callback that gets called when items for a certain month should be loaded (month became visible)
							loadItemsForMonth={(month) => {}}
							displayLoadingIndicator={status === LOADING}
							// Callback that fires when the calendar is opened or closed
							onCalendarToggled={(calendarOpened) => {}}
							// Visible Months changes
							onVisibleMonthsChange={(months) => {
								loadItems(months);
							}}
							// Callback that gets called on day press
							onDayPress={(day) => onDayPress(day)}
							// Callback that gets called when day changes while scrolling agenda list
							onDayChange={(day) => onDayPress(day)}
							// Initially selected day

							// selected={moment().format("YYYY-MM-DD")}
							// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
							minDate={startDate.format('YYYY-MM-DD')}
							// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
							maxDate={endDate.format('YYYY-MM-DD')}
							// Max amount of months allowed to scroll to the past. Default = 50
							pastScrollRange={12 + moment().month()}
							// Max amount of months allowed to scroll to the future. Default = 50
							futureScrollRange={12 + (12 - moment().month() - 1)} // -1 to exclude current month
							// Specify how each item should be rendered in agenda
							renderItem={(item, firstItemInDay) => {
								return <View />;
							}}
							// Specify how each date should be rendered. day can be undefined if the item is not first in that day.
							renderDay={(day, item) => <AgendaDayItem day={day} item={item} />}
							// Specify how empty date content with no items should be rendered
							renderEmptyDate={renderEmptyDate}
							// Specify how agenda knob should look like
							renderKnob={renderKnob}
							// Specify what should be rendered instead of ActivityIndicator
							renderEmptyData={renderEmptyData}
							// Specify your item comparison function for increased performance
							rowHasChanged={(r1, r2) => {
								return r1.text !== r2.text;
							}}
							// Hide knob button. Default = false
							hideKnob={false}
							// By default, agenda dates are marked if they have at least one item, but you can override this if needed
							markedDates={markedObj}
							markingType={'custom'}
							// If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
							disabledByDefault={false}
							// If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
							onRefresh={handleRefresh}
							// Set this true while waiting for new data from a refresh
							refreshing={refreshing}
							// Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
							refreshControl={null}
							// Agenda theme
							theme={calendarStyles}
							// Agenda container style
						/>
					</View>
				)}
			</View>
		</Screen>
	);
};

export default forwardRef(ReliefAssignmentView);

const renderKnob = () => <MaterialIcons name="keyboard-arrow-down" style={styles.knob} />;

const renderEmptyData = () => (
	<View style={styles.emptyData}>
		<Text>No Data Available</Text>
	</View>
);

const renderEmptyDate = (date) => <View style={styles.emptyDate} />;
