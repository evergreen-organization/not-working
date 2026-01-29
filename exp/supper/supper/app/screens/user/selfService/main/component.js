import React, { forwardRef } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, Loading, Screen, Space, Text } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';
import ScanQrIcon from 'assets/icon/scanqr.png';
import DocIcon from 'assets/icon/document.png';
import PwResetIcon from 'assets/icon/password-reset.png';
import PwUnlockIcon from 'assets/icon/password-unlock.png';

import { SelfServiceManualModal, SelfServiceQRModal } from '../components';
import { styles } from './styles';

export const SelfServiceView = (
	{
		handleHeaderLeftBtn,
		onScanPress,
		onManualPress,
		adid,
		resetADPassword,
		showQRModal,
		showManualModal,
		ticketId,
		setTicketId,
		validate,
		loading,
		onScanClose,
		onManualClose,
		unlockAD,
	},
	ref,
) => {
	return (
		<Screen ref={ref}>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Self Service',
					style: Typography.H6,
				}}
			/>
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<Text bold style={styles.headerFont}>
							Central Authentication Service (CAS)
						</Text>
						<Divider style={styles.headerDivider} />
					</View>
					<View style={styles.menuContainer}>
						<View style={[styles.menuRowContainer]}>
							<SelfServiceItem onPress={onScanPress} icon={ScanQrIcon} title={'Scan QR'} />
							<Space width={10} />
							<SelfServiceItem onPress={onManualPress} icon={DocIcon} title={'Manual'} />
						</View>
					</View>
					<Space height={20} />
					{adid && (
						<>
							<View style={styles.headerContainer}>
								<Text bold style={styles.headerFont}>
									Active Directory (AD)
								</Text>
								<Divider style={styles.headerDivider} />
							</View>
							<View style={styles.menuContainer}>
								<View style={styles.menuRowContainer}>
									<SelfServiceItem
										onPress={resetADPassword}
										icon={PwResetIcon}
										title={'Reset Password'}
									/>
									<Space width={10} />
									<SelfServiceItem
										testID={'adid-unlock-button'}
										onPress={unlockAD}
										icon={PwUnlockIcon}
										title={'Unlock ID'}
									/>
								</View>
							</View>
						</>
					)}
					<SelfServiceQRModal
						isVisible={showQRModal}
						closeModal={onScanClose}
						requestOTP={validate}
					/>
					<SelfServiceManualModal
						isVisible={showManualModal}
						closeModal={onManualClose}
						ticketId={ticketId}
						setTicketId={setTicketId}
						requestOTP={validate}
					/>
				</View>
			</ScrollView>
			{loading && <Loading />}
		</Screen>
	);
};

export default forwardRef(SelfServiceView);

const SelfServiceItem = ({ testID, onPress, icon, title }) => (
	<TouchableOpacity testID={testID} style={styles.menuItemContainer} onPress={onPress}>
		<Image source={icon} style={styles.icon} />
		<Text variant={'P9'} style={styles.text}>
			{title}
		</Text>
	</TouchableOpacity>
);
