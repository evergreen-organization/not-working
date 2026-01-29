import React, { useMemo } from 'react';
import { RefreshControl, SectionList, TouchableOpacity, View } from 'react-native';

import { Divider, Text } from 'atoms';
import { colors } from 'configs';

import { STATUS_TEXT_COLORS_SCHEME } from '../../utils/constant';
import { styles } from './styles';

export const ApprovalSectionList = ({
	onItemPress,
	onRefresh,
	loading,
	data,
	testID,
	emptyViewLabel,
}) => {
	const renderItem = ({ item, index, section }) => {
		return (
			<View style={styles.outer}>
				<TouchableOpacity
					testID={`${testID}-${index}`}
					style={styles.btn}
					onPress={() => onItemPress(item)}
				>
					<Text variant={'P3'} style={styles.staffName}>
						{item.staffName} ({item.staffNo})
					</Text>
					<Text
						variant={'P3'}
						style={[
							styles.desc,
							{
								color: STATUS_TEXT_COLORS_SCHEME[item.result],
							},
						]}
					>
						{item.result}
					</Text>
				</TouchableOpacity>
				{index !== section.data.length - 1 && <Divider />}
			</View>
		);
	};

	const renderEmpty = useMemo(() => (
		<View style={styles.empty}>
			<Text variant={'P3'} style={styles.emptyText}>{`No ${emptyViewLabel}`}</Text>
		</View>
	));

	const renderSectionHeader = (title) => (
		<View style={styles.sectionHeader}>
			<Text variant={'P4'}>{title}</Text>
		</View>
	);
	const renderFooter = () => {
		if (data.length === 0) {
			return null;
		} else {
			return (
				<Text variant={'P3'} style={styles.notice}>
					End of list
				</Text>
			);
		}
	};

	return (
		<SectionList
			refreshControl={
				<RefreshControl
					refreshing={loading}
					onRefresh={onRefresh}
					colors={[colors.black]}
					tintColor={colors.black}
				/>
			}
			showsVerticalScrollIndicator={false}
			keyExtractor={(item, index) => item + index}
			ListEmptyComponent={!loading && renderEmpty}
			renderSectionHeader={({ section }) => renderSectionHeader(section.title)}
			renderItem={renderItem}
			sections={data}
			ListFooterComponent={renderFooter}
		/>
	);
};
