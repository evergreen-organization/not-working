import React from 'react';
import { StyleSheet, View } from 'react-native';
import Moment from 'moment';

import { colors } from 'configs';
import { Text, Button } from 'atoms';
import { Tooltip } from 'molecules';
import dateFormat from '../../../configs/dateFormat';

export const MeetingDate = ({
	date,
	tooltipVisible,
	placement,
	onSkipPress,
	onNextPress,
	onClose,
}) => {
	const { MONTH, DATE_DAY, DATE } = dateFormat;

	return (
		<Tooltip.View
			isVisible={tooltipVisible}
			placement={placement}
			onClose={onClose}
			allowChildInteraction={false}
			content={
				<Tooltip.Content title={'Touch to select date'}>
					<Tooltip.Actions>
						<Button
							preset={'text'}
							typography={'P4'}
							title={'Skip'}
							style={styles.tooltipButton}
							labelStyle={styles.skipButtonText}
							onPress={onSkipPress}
						/>
						<Button
							preset={'text'}
							typography={'P4'}
							title={'Next'}
							style={styles.tooltipButton}
							labelStyle={styles.nextButtonText}
							onPress={onNextPress}
						/>
					</Tooltip.Actions>
				</Tooltip.Content>
			}
		>
			<View style={styles.container}>
				<View style={[styles.line, { backgroundColor: colors.primary }]} />
				<View style={styles.dateContainer}>
					<Text variant={'P9'} style={{ color: colors.primaryFont }}>
						{Moment(date).format(DATE_DAY)}
					</Text>
					<Text variant={'H4'} style={{ color: colors.primaryFont }}>
						{Moment(date).format(DATE)}
					</Text>
					<Text variant={'P6'} style={{ color: colors.secondaryFont }}>
						{Moment(date).format(MONTH)}
					</Text>
				</View>
			</View>
		</Tooltip.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 50,
		borderRadius: 10,
		flexDirection: 'row',
	},
	line: { height: '100%', width: 2.5 },
	dateContainer: { paddingHorizontal: 10, alignItems: 'center' },
	tooltipButton: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ffffff',
	},
	skipButtonText: {
		color: colors.pbxAltFaded,
	},
	nextButtonText: {
		color: colors.pbxAlt,
	},
});
