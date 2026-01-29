import React from 'react';
import { Text } from 'atoms';
import { ListItem } from 'molecules';
import { displayFullDateTime } from 'utils';

import { styles } from './styles';

export const CourseItem = ({ item, index, testID, isLast }) => {
	return (
		<ListItem
			testID={`${testID}-${index}`}
			title={item.courseName}
			titleNumberOfLine={2}
			titleTypography={'P4'}
			description={item?.courseCode && `Course Code ${item.courseCode}`}
			descriptionStyle={styles.desc}
			isLast={isLast}
			disabled={true}
			containerStyle={styles.course}
		>
			{item.scheduleStartDate && (
				<Text style={styles.desc}>{`Start Date: ${displayFullDateTime(
					item.scheduleStartDate,
				)}`}</Text>
			)}
			{item.scheduleEndDate && (
				<Text style={styles.desc}>{`End Date: ${displayFullDateTime(item.scheduleEndDate)}`}</Text>
			)}
			{item.datePassed && (
				<Text style={styles.desc}>{`Passed Date: ${displayFullDateTime(item.datePassed)}`}</Text>
			)}
		</ListItem>
	);
};
