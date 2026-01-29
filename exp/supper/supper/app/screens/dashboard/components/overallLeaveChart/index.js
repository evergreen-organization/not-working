import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';

import { Chip, Loading, Text } from 'atoms';

import { OVERALL_LEAVE_TYPE } from '../../constant';
import { styles } from './styles';

export const OverAllLeaveChart = ({
	chartSelected,
	loading,
	chartData,
	xAxis,
	yAxis,
	marker,
	onPress,
}) => {
	return (
		<View style={styles.chartNoLegendView}>
			<View style={styles.chartOptions}>
				<Text variant={'P7'} style={styles.headerText}>
					Overall On Leave
				</Text>
				{OVERALL_LEAVE_TYPE.map((chip) => (
					<Chip
						title={chip.title}
						key={chip.id}
						onPress={() => onPress(chip)}
						isSelected={chartSelected.id === chip.id}
					/>
				))}
			</View>
			<LineChart
				style={styles.chart}
				data={chartData}
				chartDescription={{ text: '' }}
				legend={{ enabled: false }}
				xAxis={xAxis}
				yAxis={yAxis}
				marker={marker}
				drawGridBackground={false}
				autoScaleMinMaxEnabled={false}
				touchEnabled={true}
				dragEnabled={true}
				scaleEnabled={true}
				scaleXEnabled={true}
				scaleYEnabled={true}
				pinchZoom={true}
				doubleTapToZoomEnabled={false}
				highlightPerTapEnabled={true}
				highlightPerDragEnabled={false}
				dragDecelerationEnabled={true}
				dragDecelerationFrictionCoef={0.99}
				keepPositionOnRotation={false}
			/>
			{loading && <Loading isPagingLoading />}
		</View>
	);
};
