import { Icon, PrimaryButton, Text } from 'atoms';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CardButton, DynamicTagPopUp, PopUp } from 'screens/eBizCard/components';
import { styles } from './styles';
import BusinessCardIcon from '../../../../assets/eBizCard/BasicIcon.png';
import DynamicCardIcon from '../../../../assets/eBizCard/DynamicIcon.png';
import { USER_ANALYTICS } from 'constant';

export const EBizSharePopUp = ({
	isVisible,
	setVisible,
	onPressClosePopUp,
	onPressBasicShare,
	handleOpenEBizSharePopUp,
}) => {
	const [tagPopUpVisible, setTagPopUpVisible] = useState(false);

	return (
		<>
			<PopUp isVisible={isVisible} setVisible={setVisible}>
				<View style={styles.popUpHeader}>
					<Text style={{ fontSize: 16, fontWeight: 700 }}>Share eBC</Text>
					<TouchableOpacity onPress={onPressClosePopUp} style={styles.crossIconContainer}>
						<Icon type={'entypo'} name={'squared-cross'} style={styles.crossIcon} />
					</TouchableOpacity>
				</View>
				<View style={styles.shareContainer}>
					<CardButton
						icon={BusinessCardIcon}
						title={'Basic eBiz Card'}
						onPress={onPressBasicShare}
					/>
					<CardButton
						icon={DynamicCardIcon}
						title={'Dynamic eBiz Card'}
						onPress={async () => {
							onPressClosePopUp();
							await new Promise((resolve) => setTimeout(resolve, 110));
							setTagPopUpVisible(!tagPopUpVisible);
						}}
					/>
				</View>

				<PrimaryButton fill={false} title="Close" isTitleBold onPress={onPressClosePopUp} />
			</PopUp>
			<DynamicTagPopUp
				isPopUpVisible={tagPopUpVisible}
				setIsPopUpVisible={setTagPopUpVisible}
				handleOpenEBizSharePopUp={handleOpenEBizSharePopUp}
				path={USER_ANALYTICS.MODULES.HOME}
			/>
		</>
	);
};
