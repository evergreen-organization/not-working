import React, { useRef, useState } from 'react';
import { Image, View } from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ChairIcon from 'assets/icon/chair.png';
import { Button, Text } from 'atoms';
import { BottomModal, DropdownModalPicker } from 'molecules';
import { SEATING_ARRANGEMENT } from '../../constant';
import { formatSeatingArrangement } from '../../utils';
import { getButtonStyle, styles } from './styles';

const LABEL_VIEW_SEATING = 'Check in to view seating';
const LABEL_SELECT_ATTENDEE = 'Select attendee to view seating';

export const InvitationsAdminModal = ({
	readQR,
	isVisible,
	closeModal,
	attendeeList,
	selectedAttendee,
	handleSelectAttendee,
	selectedAttendeeCheckInStatus,
	selectedAttendeeSeatingArrangement,
	handleManualCheckIn,
}) => {
	const scanner = useRef();
	const [showQRScanner, setShowQRScanner] = useState(false);
	const renderSeatingContent = () => {
		if (selectedAttendeeCheckInStatus) {
			return (
				<>
					{SEATING_ARRANGEMENT.map((item) => (
						<Text key={item} variant={'P6'} style={styles.seatingArrangementText}>
							{formatSeatingArrangement(selectedAttendeeSeatingArrangement, item)}
						</Text>
					))}
				</>
			);
		}
		return (
			<Text variant={'P10'} style={styles.notice}>
				{selectedAttendee.Name ? LABEL_VIEW_SEATING : LABEL_SELECT_ATTENDEE}
			</Text>
		);
	};

	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal} fullHeight>
			<View style={styles.container}>
				<View style={styles.headerBtnView}>
					<Button
						title={'Scan QR'}
						onPress={() => setShowQRScanner(true)}
						{...getButtonStyle(showQRScanner)}
					/>
					<Button
						title={'Manual'}
						onPress={() => setShowQRScanner(false)}
						{...getButtonStyle(!showQRScanner)}
					/>
				</View>

				{showQRScanner ? (
					<QRCodeScanner
						ref={scanner}
						onRead={readQR}
						showMarker={true}
						markerStyle={styles.marker}
						cameraStyle={styles.camera}
						flashMode={Camera.Constants.FlashMode.auto}
					/>
				) : (
					<View style={styles.manualContainer}>
						{attendeeList?.length !== 0 && (
							<DropdownModalPicker
								label={'Select attendee'}
								enableSearch
								dropdownData={attendeeList}
								setSelectedItem={handleSelectAttendee}
								selectedItem={selectedAttendee}
							/>
						)}

						<View style={styles.seatingArrangementContainer}>
							<Image source={ChairIcon} style={styles.icon} />
							<View style={styles.seatingView}>{renderSeatingContent()}</View>
						</View>

						{!selectedAttendeeCheckInStatus && selectedAttendee.Name && (
							<View style={styles.checkInBtnView}>
								<Button
									title={'Check In'}
									onPress={handleManualCheckIn}
									style={styles.checkInBtn}
									typography={'P7'}
								/>
							</View>
						)}
					</View>
				)}
			</View>
		</BottomModal>
	);
};

export default InvitationsAdminModal;
