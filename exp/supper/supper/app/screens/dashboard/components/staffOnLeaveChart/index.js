import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';

import { Icon, Loading, Text } from 'atoms';

import { styles } from './styles';

export const StaffOnLeaveChart = ({
	selectedDate,
	barChart,
	data,
	legend,
	customLegend,
	xAxis,
	yAxis,
	marker,
	loading,
	onSelectBar,
	onShowCalendar,
}) => {
	return (
		<View style={styles.chartNoLegendView}>
			<View style={styles.chartOptions}>
				<Text variant={'P7'} style={styles.headerText}>
					Staff on Leave
				</Text>
				<TouchableOpacity style={styles.selectDateOption} onPress={onShowCalendar}>
					<Text variant={'P10'}>{selectedDate}</Text>
					<Icon type={'material'} name={'keyboard-arrow-down'} style={styles.icon} />
				</TouchableOpacity>
			</View>
			<BarChart
				ref={barChart}
				style={styles.chartNoXAxis}
				data={data}
				chartDescription={{ text: '' }}
				legend={legend}
				xAxis={xAxis}
				yAxis={yAxis}
				marker={marker}
				visibleRange={{ x: { min: 8, max: 8 } }}
				animation={{ durationX: 2000 }}
				drawBarShadow={false}
				scaleEnabled={false}
				highlightPerDragEnabled={false}
				onSelect={onSelectBar}
			/>
			<View style={styles.legendView}>
				{customLegend.map((item, index) => {
					return (
						<View key={item.label} style={styles.legendRow}>
							<Icon
								type={'font-awesome'}
								name={'circle'}
								style={{ color: item.color, ...styles.legendIcon }}
							/>
							<Text variant={'P10'} style={styles.legendLabel}>
								{item.label}
							</Text>
						</View>
					);
				})}
			</View>
			{loading && <Loading isPagingLoading />}
		</View>
	);
};
