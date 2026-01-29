import React, { forwardRef } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Typography } from 'styles';
import EnvelopeIcon from 'assets/icon/envelope.png';
import CheckinIcon from 'assets/icon/login.png';
import ScanQrIcon from 'assets/icon/scanqr2.png';
import QRIcon from 'assets/icon/qr.png';
import UserIcon from 'assets/icon/user2.png';
import MarkerIcon from 'assets/icon/marker.png';
import InfoIcon from 'assets/icon/info.png';
import DocIcon from 'assets/icon/document2.png';
import SurveyIcon from 'assets/icon/survey.png';
import FeedbackIcon from 'assets/icon/feedback.png';
import ChairIcon from 'assets/icon/chair.png';
import { Loading, Screen, Text } from 'atoms';
import { Header } from 'molecules';
import { PdfModal } from 'organisms';

import {
	InvitationsAdminModal,
	InvitationsAttendeeModal,
	InvitationsItem,
	InvitationsPendingListModal,
	InvitationsReasonModal,
	WebViewModal,
} from '../components';
import InvitationsCarousel from '../components/carousel';

import { formatSeatingArrangement } from '../utils';
import { styles } from './styles';
import { INVITATIONS_MODAL, SEATING_ARRANGEMENT } from '../constant';

export const InvitationsView = (
	{
		handleAdminModal,
		handleAttendeeModal,
		reloadAttendees,
		reloadSeatingArrangement,
		handleShowPDF,
		readQR,
		handleSelectAttendee,
		handleManualCheckIn,
		handleSubmitReason,
		onPendingPress,
		onFeedbackPress,
		closeModal,
		modalType,
		loading,
		eventList,
		statistics,
		pendingAttendees,
		attendeeList,
		selectedAttendee,
		selectedAttendeeCheckInStatus,
		selectedAttendeeSeatingArrangement,
		selectedPDF,
		qrValue,
		navigation,
		currentItem,
	},
	ref,
) => {
	const {
		isAdmin,
		seatingArrangement,
		checkInStatus,
		eventLocation,
		eventDescription,
		surveyUrl,
		allowCheckInTime,
		endCheckInTime,
	} = currentItem || {};
	const { totalCheckIn, totalUnCheckIn } = statistics || {};

	const handleHeaderLeftBtn = () => navigation.goBack();

	const renderContent = () => {
		if (eventList?.length === 0) {
			return (
				<View style={styles.noticeContainer}>
					<View style={styles.imageContainer}>
						<Image source={EnvelopeIcon} style={styles.image} />
					</View>
					<Text variant={'P6'} style={styles.notice}>
						{'No Events'}
					</Text>
				</View>
			);
		}

		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<InvitationsCarousel data={eventList} ref={ref} />
				<View style={styles.eventList}>
					<InvitationsItem
						title={'Check-in Event'}
						subtitle={
							isAdmin ? "Acknowledge participants' attendance" : 'Inform admin you are here'
						}
						icon={CheckinIcon}
						extraIcon={isAdmin ? ScanQrIcon : QRIcon}
						onPress={isAdmin ? handleAdminModal : handleAttendeeModal}
					/>
					{isAdmin && (
						<InvitationsItem
							icon={UserIcon}
							title={'Participants'}
							subtitle={`${totalCheckIn} checked-in`}
							onReload={reloadAttendees}
						>
							<Text
								variant={'P10'}
								style={[styles.subtitle, styles.clickableText]}
								onPress={onPendingPress}
							>
								{`${totalUnCheckIn} pending`}
							</Text>
						</InvitationsItem>
					)}
					<InvitationsItem
						icon={ChairIcon}
						title={'Seating'}
						subtitle={!checkInStatus && 'Please check in first'}
						onReload={!checkInStatus && reloadSeatingArrangement}
					>
						{checkInStatus && (
							<>
								{SEATING_ARRANGEMENT.map((item, index) => (
									<Text key={item} variant={'P10'} style={styles.subtitle}>
										{formatSeatingArrangement(seatingArrangement, item)}
									</Text>
								))}
							</>
						)}
					</InvitationsItem>
					<InvitationsItem icon={MarkerIcon} title={'Location'} subtitle={eventLocation} />
					<InvitationsItem
						icon={InfoIcon}
						title={'About'}
						subtitle={eventDescription}
						extraIcon={DocIcon}
						onPress={handleShowPDF}
					/>
					{surveyUrl && (
						<InvitationsItem
							icon={SurveyIcon}
							title={'Survey'}
							subtitle={'Please send us your feedback'}
							extraIcon={FeedbackIcon}
							onPress={onFeedbackPress}
						/>
					)}
				</View>
			</ScrollView>
		);
	};

	const modalProps = {
		isVisible: true,
		closeModal,
	};

	const modals = {
		[INVITATIONS_MODAL.PENDING_ATTENDEES]: (
			<InvitationsPendingListModal data={pendingAttendees} {...modalProps} />
		),
		[INVITATIONS_MODAL.ATTENDEES]: (
			<InvitationsAttendeeModal
				data={qrValue}
				startTime={allowCheckInTime}
				endTime={endCheckInTime}
				{...modalProps}
			/>
		),
		[INVITATIONS_MODAL.ADMIN]: (
			<InvitationsAdminModal
				{...modalProps}
				readQR={readQR}
				attendeeList={attendeeList}
				selectedAttendee={selectedAttendee}
				handleSelectAttendee={handleSelectAttendee}
				selectedAttendeeCheckInStatus={selectedAttendeeCheckInStatus}
				selectedAttendeeSeatingArrangement={selectedAttendeeSeatingArrangement}
				handleManualCheckIn={handleManualCheckIn}
			/>
		),

		[INVITATIONS_MODAL.REASON]: (
			<InvitationsReasonModal onSubmit={handleSubmitReason} {...modalProps} />
		),
		[INVITATIONS_MODAL.PDF]: <PdfModal source={selectedPDF} {...modalProps} />,
		[INVITATIONS_MODAL.WEBVIEW]: <WebViewModal {...modalProps} uri={surveyUrl} />,
	};

	const renderModals = () => modals[modalType] ?? null;

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Events',
					style: Typography.H6,
				}}
			/>
			<View style={styles.flex}>{loading ? <Loading /> : renderContent()}</View>
			{renderModals()}
		</Screen>
	);
};

export default forwardRef(InvitationsView);
