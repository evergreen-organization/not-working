import { HomeBackground } from 'assets/festive/home';
import { Shadow, Space, Text } from 'atoms';
import React, { forwardRef } from 'react';
import { View, ImageBackground } from 'react-native';
import { routes } from 'navigations';
import { BottomModal } from 'molecules';
import { EBizCardTermOfUse } from 'screens/eBizCard/eBizCardTermOfUse';
import { MeetingsWidget } from 'screens/meetings';
import { PromotionWidget } from 'screens/promotion';
import { algorithm } from 'utils';
import {
	BannerCarousel,
	EBizCardWidget,
	EBizSharePopUp,
	EventsWidget,
	HomeHeader,
	TrainingWidget,
} from './components';
import { QuickLinkList } from './components/quickLinkList';
import { festiveStyles } from './styles';

export const FestiveHomeView = (
	{
		onNavigate,
		onCloseMoreModal,
		handleCloseECardCarousel,
		handleVolumePress,
		handleOpenEBizSharePopUp,
		handleBasicShare,
		showMore,
		quickLinkList,
		moreLinkList,
		showECardCarousel,
		isBgmMute,
		isEBizCardSharePopUpVisible,
		setIsEBizCardSharePopUpVisible,
		handleEBizShareClosedPopUp,
		modulesAvailable,
		handlePromotion,
		...props
	},
	ref,
) => {
	const {
		isEBCTOUVisible,
		setIsEBCTOUVisible,
		handleAcceptEBCTOU,
		handleDeclineEBCTOU,
		handleCloseEBCTOU,
	} = props;

	return (
		<ImageBackground
			source={HomeBackground}
			testID={'home-view'}
			style={festiveStyles.festiveContainer}
			resizeMode="cover"
			ref={ref}
		>
			<HomeHeader isBgmMute={isBgmMute} onVolumePress={handleVolumePress}>
				<BannerCarousel />

				<View style={festiveStyles.headingContainer}>
					<Text bold style={festiveStyles.heading}>
						Quick Links
					</Text>
					<Shadow>
						<View style={[festiveStyles.festiveQuickLinkContainer]}>
							{algorithm.toMatrix(quickLinkList, 4).map((row) => (
								<View key={row.key} style={festiveStyles.quickLinks}>
									<QuickLinkList list={row.value} onPress={onNavigate} />
								</View>
							))}
						</View>
					</Shadow>
					{!!modulesAvailable.eBizCard && (
						<EBizCardWidget
							onPressCard={(e) => onNavigate(e, routes.EBIZ_HOME)}
							onView={(e) => onNavigate(e, routes.EBIZ_HOME)}
							onShare={handleOpenEBizSharePopUp}
						/>
					)}
					<Space height={20} />
					<Shadow>
						<TrainingWidget onPress={(e) => onNavigate(e, routes.TRAINING)} />
					</Shadow>
					<Space height={20} />
					<Shadow>
						<MeetingsWidget onPress={(e) => onNavigate(e, routes.MEETING)} />
					</Shadow>
					<Space height={20} />
					<Shadow>
						<EventsWidget onPress={(e) => onNavigate(e, routes.INVITATIONS)} />
					</Shadow>

					<Space height={30} />
					<Shadow>
						<PromotionWidget onPress={handlePromotion} />
					</Shadow>
					<Space height={30} />
				</View>
			</HomeHeader>

			<BottomModal isVisible={showMore} closeModal={onCloseMoreModal} onCancel={onCloseMoreModal}>
				<View style={festiveStyles.quickLinks}>
					<QuickLinkList list={moreLinkList} onPress={onNavigate} />
				</View>
			</BottomModal>

			<EBizSharePopUp
				isVisible={isEBizCardSharePopUpVisible}
				setVisible={setIsEBizCardSharePopUpVisible}
				onPressClosePopUp={handleEBizShareClosedPopUp}
				onPressBasicShare={handleBasicShare}
			/>
			<EBizCardTermOfUse
				isVisible={isEBCTOUVisible}
				setVisible={setIsEBCTOUVisible}
				onAccept={handleAcceptEBCTOU}
				onDecline={handleDeclineEBCTOU}
				onClose={handleCloseEBCTOU}
			/>
		</ImageBackground>
	);
};

export default forwardRef(FestiveHomeView);
