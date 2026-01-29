import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'atoms';

import { styles } from './styles';
import { Tooltip } from 'molecules';
export const MeetingDetailsView = ({
	tooltipVisible,
	onPressPrevious,
	onClose,
	summary,
	meetingStartTime,
	meetingEndTime,
	displayStatus,
	meetingPlace,
	eventEndDate,
}) => {
	const { color, label } = displayStatus;
	return (
		<Tooltip.View
			isVisible={tooltipVisible}
			onClose={onClose}
			allowChildInteraction={false}
			placement={'bottom'}
			content={
				<Tooltip.Content title={'Touch to view attendees'} subtitle={'Swipe right to set reminder'}>
					<Tooltip.Actions>
						<Button
							preset={'text'}
							typography={'P4'}
							title={'Previous'}
							style={styles.tooltipButton}
							labelStyle={styles.previousButtonText}
							onPress={onPressPrevious}
						/>
						<Button
							preset={'text'}
							typography={'P4'}
							title={'Finish'}
							style={styles.tooltipButton}
							labelStyle={styles.finishButtonText}
							onPress={onClose}
						/>
					</Tooltip.Actions>
				</Tooltip.Content>
			}
		>
			<View style={styles.meetingDetails}>
				<Text variant={'P2'} style={styles.meetingDescription}>
					{summary}
				</Text>
				{eventEndDate === null ? (
					<Text style={styles.content}>{meetingStartTime}</Text>
				) : (
					<Text style={styles.content}>{meetingStartTime + ' - ' + meetingEndTime}</Text>
				)}
				{meetingPlace && <Text style={styles.content}>{meetingPlace}</Text>}

				<View style={[styles.tags, { backgroundColor: color }]}>
					<Text variant={'P6'} style={styles.status}>
						{label}
					</Text>
				</View>
			</View>
		</Tooltip.View>
	);
};
