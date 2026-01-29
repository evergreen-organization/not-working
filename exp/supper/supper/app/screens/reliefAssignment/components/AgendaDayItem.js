import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from 'configs';
import { Space, Text } from 'atoms';
import MarkerIcon from 'assets/icon/marker.png';

import AgendaSwipeLeftItem from './AgendaSwipeLeftItem';
import { HalfDayTypeDef } from '../constant/constant';
import { RELIEF_TEST_ID } from '../../../../e2e/relief/testID';

const width = Dimensions.get('window').width;

export const AgendaDayItem = ({ day, item }) => {
	const [swipeableItem] = useState([]);
	const selectedRow = useRef();

	const handleSwipeableRightWillOpen = () => {
		if (selectedRow.current && selectedRow.current !== swipeableItem[item?.index]) {
			if (selectedRow.current) {
				selectedRow.current.close();
			}
		}
	};

	const handleSwipeableRightOpen = () => (selectedRow.current = swipeableItem[item?.index]);

	return (
		<>
			{item !== undefined ? (
				<Swipeable
					ref={(c) => {
						swipeableItem[item?.index] = c;
					}}
					testID={RELIEF_TEST_ID.AGENDA_SCROLL_VIEW}
					friction={1}
					leftThreshold={0}
					rightThreshold={80}
					onSwipeableWillOpen={handleSwipeableRightWillOpen}
					onSwipeableOpen={handleSwipeableRightOpen}
					renderRightActions={(progress, dragX) => (
						<AgendaSwipeLeftItem progress={progress} dragX={dragX} item={item} ref={selectedRow} />
					)}
				>
					<View style={styles.dayContainer}>
						<View>
							<View style={styles.row}>
								<View style={styles.line} />
								<View style={styles.dayDate}>
									<Text variant={'H4'}>{day?.toString('d')}</Text>
									<Text variant={'P3'} style={styles.monthText}>
										{day?.toString('MMM')}
									</Text>
								</View>
							</View>
							<View style={styles.flex} />
						</View>
						{day == null && <View style={styles.dayWithoutDate} />}
						<ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
							<View style={styles.detailsView}>
								{(item?.branch != null || item?.state != null) && (
									<View style={styles.content}>
										<Image source={MarkerIcon} style={styles.icon} />
										<Space width={5} />
										<Text
											testID={RELIEF_TEST_ID.AGENDA_RELIEF_BRANCH_TEXT}
											style={styles.contentText}
										>
											{item?.branch} - {item?.state}
										</Text>
									</View>
								)}
								{item?.halfDayType != null && (
									<View style={styles.content}>
										<Text
											variant={'P3'}
											testID={RELIEF_TEST_ID.AGENDA_DAY_TYPE_TEXT}
											style={styles.contentText}
										>
											{HalfDayTypeDef[item?.halfDayType]}
										</Text>
									</View>
								)}
								{item?.duties != null && (
									<View style={styles.tagContainer}>
										<Text variant={'P3'}>{item?.duties}</Text>
									</View>
								)}
							</View>
						</ScrollView>
						<Animated.View style={styles.center}>
							<MaterialIcons name="keyboard-arrow-left" style={styles.leftIcon} />
						</Animated.View>
					</View>
				</Swipeable>
			) : (
				<View style={styles.dayWithoutEvent}>
					<Text style={styles.dayText}>{day?.toString('d MMM')}</Text>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	dayContainer: {
		width: width,
		backgroundColor: '#FFF',
		borderTopWidth: 1,
		borderTopColor: colors.medium,
		flexDirection: 'row',
		padding: 12,
	},
	dayDate: {
		paddingLeft: 10,
		paddingRight: 20,
		alignItems: 'center',
	},
	dayWithoutDate: {
		borderColor: 'pink',
		borderWidth: 1,
		borderStyle: 'dashed',
		width: width,
		position: 'absolute',
		top: 0,
	},
	dayWithoutEvent: {
		width: '100%',
		backgroundColor: '#FFF',
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: colors.medium,
		flexDirection: 'row',
	},
	emptyData: {
		height: 50,
		width: '100%',
		borderRadius: 10,
		backgroundColor: '#FFF',
		marginTop: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	line: {
		height: '100%',
		width: 2.5,
		backgroundColor: colors.primary,
	},
	icon: {
		width: 18,
		height: 18,
		tintColor: '#BBB',
	},
	contentText: {
		fontSize: 12,
	},
	tagContainer: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		alignSelf: 'flex-start',
		backgroundColor: colors.medium,
	},
	content: {
		flexDirection: 'row',
		marginBottom: 5,
		alignItems: 'center',
	},
	row: { flexDirection: 'row' },
	monthText: { color: colors.secondaryFont },
	center: { alignSelf: 'center' },
	leftIcon: {
		fontSize: 25,
		color: colors.primary,
		marginRight: -5,
	},
	dayText: { color: colors.secondaryFont },
	flex: { flex: 1 },
	detailsView: { justifyContent: 'center' },
});
