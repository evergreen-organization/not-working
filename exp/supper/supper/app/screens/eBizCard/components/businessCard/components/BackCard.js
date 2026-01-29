import { View } from 'react-native';
import React, { useRef } from 'react';
import { styles } from '../Style';
import { CardButton } from './CardButton';
import { cardImageShare } from 'screens/eBizCard/utils/utils';
import ShareIcon from 'assets/eBizCard/shareIcon.png';
import { colors } from 'configs';
import { useDispatch } from 'react-redux';
import { USER_ANALYTICS } from 'constant';
import { addAnalyticCheckpoint } from 'utils';
export const BackCard = ({ cardImage }) => {
	const viewRef = useRef();
	const dispatch = useDispatch();
	return (
		<View style={[styles.card, { backgroundColor: colors.white, padding: 0 }]}>
			<View style={[styles.buttonContainer]}>
				<CardButton
					image={ShareIcon}
					text={'Share Card Image'}
					onPress={(e) => {
						addAnalyticCheckpoint({
							dispatch,
							module: USER_ANALYTICS.MODULES.EBIZCARD,
							view: viewRef,
							screen: USER_ANALYTICS.EBIZCARD_SCREENS.HOME,
							buttonEvent: e.nativeEvent,
							action: USER_ANALYTICS.EBIZCARD_ACTIONS.SHARE_CARD_IMAGE,
						}).then();
						cardImageShare(cardImage);
					}}
					imageStyle={{ width: 30, height: 30 }}
				/>
			</View>
		</View>
	);
};
