import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Icon, PrimaryButton, Text } from 'atoms';

import { PopUp } from '../../components';

import { styles } from './styles';

import QRCode from 'react-native-qrcode-svg';
import { colors } from 'configs';
const qrWidth = Dimensions.get('window').width * 0.85 - 48;
export const QRTagPopUp = ({ isQRVisible, setIsPopUpVisible, onPressClosePopUp, qrValue }) => {
	return (
		<PopUp isVisible={isQRVisible} setVisible={setIsPopUpVisible}>
			<View style={[{ gap: 40 }]}>
				<View style={styles.$popUpHeader}>
					<Text style={{ fontSize: 16, fontWeight: 700 }}>Share eBiz Card</Text>

					<TouchableOpacity onPress={onPressClosePopUp} style={styles.$crossIconContainer}>
						<Icon type={'entypo'} name={'squared-cross'} style={styles.$crossIcon} />
					</TouchableOpacity>
				</View>
				<View
					style={{
						alignItems: 'center',
					}}
				>
					{<QRCode value={qrValue} size={qrWidth} />}
					<Text style={[styles.$tagDescription, { marginTop: 20 }]}>Scan Me</Text>
				</View>
				<View>
					<Text style={styles.$qrText}>
						Scan this unique generated QR code to view and save my digital business card!
					</Text>
				</View>

				<PrimaryButton
					title="Close"
					color={colors.primary}
					isTitleBold
					fill={false}
					onPress={() => {
						onPressClosePopUp();
					}}
				/>
			</View>
		</PopUp>
	);
};
