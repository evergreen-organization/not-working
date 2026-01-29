import React from 'react';
import { View } from 'react-native';

import { Chip, Screen } from 'atoms';
import { Header } from 'molecules';

import { LOADING, PRODUCT_STATUS_LIST } from '../utils';
import { ProspectSectionList, SkeletonProspectList } from '../component';
import { styles } from './styles';
import { Typography } from 'styles';

export const LG360StatusSummaryView = ({
	getProspectByStatus,
	handleStatusChipPress,
	handleBack,
	statusStatistic,
	status,
	filteredProspects,
	selectedStatus,
}) => {
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
					text: 'LeadGen 360 Summary',
					style: Typography.H6,
				}}
			/>
			<View style={styles.background}>
				<View style={styles.chipView}>
					{PRODUCT_STATUS_LIST.map((item, index) => (
						<Chip
							onPress={() => handleStatusChipPress(item)}
							key={item.status}
							title={item.title}
							subtitle={statusStatistic[item.status] ?? '0'}
							isSelected={item.status === selectedStatus}
							touchableStyle={styles.chip}
							subtitleFontStyle={styles.chipSubtitle}
						/>
					))}
				</View>
				<View style={styles.prospectsListView}>
					{status === LOADING ? (
						<SkeletonProspectList loop={4} />
					) : (
						<ProspectSectionList
							data={filteredProspects}
							onRefresh={getProspectByStatus}
							refreshing={status === LOADING}
						/>
					)}
				</View>
			</View>
		</Screen>
	);
};
