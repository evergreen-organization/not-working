import { ScrollView, useWindowDimensions, View } from 'react-native';
import { PopUp } from '../components';
import { Button, PrimaryButton, Text } from 'atoms';
import { colors } from 'configs';
import { EBizTutorialDetailItem } from '../components/eBizTutorialDetailItem';
import React from 'react';
import { E_BIZ_CARD_TOU } from '../constant/constantTOU';
import AcceptIcon from 'assets/icon/accept.png';
import DeclineIcon from 'assets/icon/decline.png';
import { styles } from './styles';
import { commonStyles } from 'styles';
export const EBizCardTermOfUse = ({ isVisible, setVisible, onClose, onAccept, onDecline }) => {
	const { height } = useWindowDimensions();
	return (
		<PopUp containerStyle={styles.popupContainer} isVisible={isVisible} setVisible={setVisible}>
			<View style={{ ...styles.container, height: height * 0.8 }}>
				<View style={styles.navBar}>
					<View style={[commonStyles.fill]}>
						<Text style={styles.heading}>TERMS OF USE</Text>
					</View>
					<Button style={styles.closeButton} leftIcon={DeclineIcon} onPress={onClose} />
				</View>
				<ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
					<EBizTutorialDetailItem details={E_BIZ_CARD_TOU} />
					<View style={styles.spacing} />

					<PrimaryButton
						leftIcon={AcceptIcon}
						title="ACCEPT & Proceed To eBC"
						iconStyle={styles.buttonIcon}
						buttonStyle={styles.acceptButton}
						shadowColor={colors.green}
						isTitleBold
						onPress={onAccept}
					/>
					<PrimaryButton
						isTitleBold
						leftIcon={DeclineIcon}
						title="DECLINE & Exit eBC"
						onPress={onDecline}
						style={[styles.button]}
						buttonStyle={styles.declineButton}
						iconStyle={styles.buttonIcon}
					/>
				</ScrollView>
			</View>
		</PopUp>
	);
};
