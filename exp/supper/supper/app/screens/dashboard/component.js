import React, { forwardRef } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import Moment from 'moment';

import { Screen, Space } from 'atoms';
import { BottomModal, CalendarList, Header } from 'molecules';
import { DATE_YMD } from '../../configs/dateFormat';

import { DivisionModal, OverAllLeaveChart, StaffOnLeaveChart } from './components';
import { chartStyles } from './styles';
import { Typography } from 'styles';

export const DashboardComp = (
	{
		onRefresh,
		handleOnSelectBar,
		handleToggleCalendarModal,
		handleOverallLeaveChartTypePress,
		closeModalDivision,
		onDayPress,
		staffLeaveChartProps,
		overallLeaveChartProps,
		divisionLeaveStatistic,
		modalDivisionVisible,
		modalCalendarVisible,
		refreshing,
	},
	ref,
) => {
	const { selectedDate, dataBar, customLegend, xAxisBar, yAxisBar, staffLeaveReportLoading } =
		staffLeaveChartProps;

	const { chartSelected, dataLine, xAxisLine, yAxisLine, leaveSummaryLoading } =
		overallLeaveChartProps;

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Dashboard',
					style: Typography.H6,
				}}
			/>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#818181'} />
				}
			>
				<StaffOnLeaveChart
					selectedDate={selectedDate}
					barChart={ref}
					data={dataBar}
					legend={chartStyles.legendBar}
					customLegend={customLegend}
					xAxis={xAxisBar}
					yAxis={yAxisBar}
					marker={chartStyles.marker}
					loading={staffLeaveReportLoading}
					onSelectBar={handleOnSelectBar}
					onShowCalendar={handleToggleCalendarModal}
				/>
				<Space height={10} />
				<OverAllLeaveChart
					chartSelected={chartSelected}
					chartData={dataLine}
					loading={leaveSummaryLoading}
					xAxis={xAxisLine}
					yAxis={yAxisLine}
					marker={chartStyles.marker}
					onPress={handleOverallLeaveChartTypePress}
				/>
				<Space height={40} />
			</ScrollView>
			<DivisionModal
				data={divisionLeaveStatistic}
				isVisible={modalDivisionVisible}
				closeModal={closeModalDivision}
			/>
			<BottomModal
				isVisible={modalCalendarVisible}
				onCancel={handleToggleCalendarModal}
				containerStyle={{ paddingTop: 60 }}
			>
				<CalendarList
					onDayPress={onDayPress}
					firstDay={1}
					current={Moment().format(DATE_YMD)}
					pastScrollRange={24}
					futureScrollRange={0}
				/>
			</BottomModal>
		</Screen>
	);
};

export default forwardRef(DashboardComp);
