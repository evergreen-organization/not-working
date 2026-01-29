import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Moment from 'moment';

import { BottomModal } from 'molecules';
import { Text } from 'atoms';
import { styles } from './styles';

const DateTimeDisplay = ({ dateTime }) => (
	<View>
		<Text variant={'P3'} style={styles.desc}>
			{Moment(dateTime).format('dddd')}
		</Text>
		<Text variant={'P3'} style={styles.desc}>
			{Moment(dateTime).format('DD MMM YYYY')}
		</Text>
		<Text variant={'P3'} style={styles.desc}>
			{Moment(dateTime).format('h:mm a')}
		</Text>
	</View>
);

export const InvitationsAttendeeModal = ({ data, startTime, endTime, isVisible, closeModal }) => {
	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal}>
			<View style={styles.container}>
				<QRCode value={data} size={200} />
				<View style={styles.textContainer}>
					<Text variant={'P4'} style={styles.title}>
						{'Check-in Time'}
					</Text>
					<View style={styles.view}>
						<DateTimeDisplay dateTime={startTime} />
						<Text variant={'P6'} style={styles.text}>
							{'to'}
						</Text>
						<DateTimeDisplay dateTime={endTime} />
					</View>
				</View>
			</View>
		</BottomModal>
	);
};
