import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hyperlink from 'react-native-hyperlink';
import { Linking, ScrollView, View } from 'react-native';

import { Screen, Text, Space, Chip } from 'atoms';
import { colors } from 'configs';

import { styles } from './styles';
import { MEETING_DETAILS_TAB, MEETING_DETAILS_TAB_LIST } from '../constant/constant';
import { Header } from 'molecules';

export const MeetingDetailsView = ({ meetingDetails, selected, handleChipPress }) => {
	const { name, type } = MEETING_DETAILS_TAB[selected];

	const renderContent = () => {
		const details = meetingDetails[selected];
		if (type === 'description') {
			return (
				<View style={styles.bodyContainer}>
					<Hyperlink linkStyle={styles.link} onPress={(url, text) => Linking.openURL(url)}>
						<Text style={styles.body}>{details}</Text>
					</Hyperlink>
				</View>
			);
		}

		if (details?.length === 0) {
			return (
				<View style={styles.noAttendeesView}>
					<Text style={styles.nothingText}>No Attendees</Text>
				</View>
			);
		}

		return details?.map((item, index) => {
			// Split email from the name and their division if any
			const arrEmail = item.email.split('/');
			const email = arrEmail.slice(-1)[0];

			if (!item.displayName) {
				return (
					<View key={item.email} style={styles.attendeeContainer}>
						<View style={styles.attendeeIcon}>
							<Icon name="user" size={25} color={colors.primary} />
						</View>
						<Text variant={'P4'} style={styles.email}>
							{email}
						</Text>
					</View>
				);
			}

			// Split attendee name and their division
			const arrayName = item.displayName.split('/');
			const division = arrayName.splice(1).join('/');
			const attendeeName = arrayName;
			return (
				<View key={item.displayName} style={styles.attendeeContainer}>
					<View style={styles.attendeeIcon}>
						<Icon name="user" size={25} color={colors.primary} />
					</View>
					<View>
						{attendeeName && <Text variant={'P4'}>{attendeeName}</Text>}
						{division && <Text variant={'P3'}>{division}</Text>}
						<Text variant={'P3'}>{email}</Text>
					</View>
				</View>
			);
		});
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Meetings Details',
				}}
			/>

			<View style={styles.meetingView}>
				{MEETING_DETAILS_TAB_LIST.map((item) => (
					<Chip
						key={item.chipTitle}
						title={item.chipTitle}
						onPress={() => handleChipPress(item.key)}
						isSelected={selected === item.key}
					/>
				))}
			</View>
			<ScrollView>
				<View style={styles.content}>
					<Text variant={'H6'} style={styles.title}>
						{name}
					</Text>
					{renderContent()}
				</View>
				<Space height={40} />
			</ScrollView>
		</Screen>
	);
};
