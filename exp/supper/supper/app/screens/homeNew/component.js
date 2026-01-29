import { Shadow, Space, Text } from 'atoms';
import { showVideoBanner } from 'constant';
import { routes } from 'navigations';
import { PdfModal } from 'organisms';
import React, { forwardRef } from 'react';
import { ImageBackground, View } from 'react-native';
import { MeetingsWidget } from 'screens/meetings';
import { PromotionWidget } from 'screens/promotion';
import { algorithm } from 'utils';
import { EBizCardTermOfUse } from '../eBizCard/eBizCardTermOfUse';
import { BottomModal } from 'molecules';
import {
	BannerCarousel,
	EBizCardWidget,
	EBizSharePopUp,
	EventsWidget,
	HomeHeader,
	HomeWidget,
	TrainingWidget,
} from './components';
import { QuickLinkList } from './components/quickLinkList';
import { festiveStyles, styles } from './styles';
import Animated, { FadeInUp } from 'react-native-reanimated';
import HomeBackground from 'assets/60th-anni-bg.png';

const HomeNewView = (
	{
		onNavigate,
		onCloseMoreModal,
		onBannerPress,
		handleOpenEBizSharePopUp,
		handleBasicShare,
		showMore,
		quickLinkList,
		moreLinkList,
		showPDFModal,
		pdfSource,
		isEBizCardSharePopUpVisible,
		setIsEBizCardSharePopUpVisible,
		handleEBizShareClosedPopUp,
		closePdfModal,
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
			style={festiveStyles.festiveContainer}
			resizeMode="cover"
			ref={ref}
		>
			<HomeHeader>
				<FadeInView order={1}>{showVideoBanner ? <BannerCarousel /> : <HomeWidget />}</FadeInView>
				<View style={styles.headingContainer}>
					<FadeInView order={2}>
						<Text style={styles.heading} variant="P7">
							Quick Links
						</Text>
						<Shadow>
							<View style={styles.quickLinksContainer}>
								{algorithm.toMatrix(quickLinkList, 4).map((row) => (
									<View key={row.key} style={styles.quickLinks}>
										<QuickLinkList list={row.value} onPress={onNavigate} />
									</View>
								))}
							</View>
						</Shadow>
					</FadeInView>
					<FadeInView order={3}>
						{!!modulesAvailable.eBizCard && (
							<EBizCardWidget
								onPressCard={(e) => onNavigate(e, routes.EBIZ_HOME)}
								onView={(e) => onNavigate(e, routes.EBIZ_HOME)}
								onShare={handleOpenEBizSharePopUp}
							/>
						)}
					</FadeInView>
					<Space height={20} />

					<FadeInView order={4}>
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
						<PromotionWidget onPress={handlePromotion} />
						<Space height={30} />
					</FadeInView>
				</View>
			</HomeHeader>
			<BottomModal isVisible={showMore} onCancel={onCloseMoreModal}>
				<View style={styles.quickLinks}>
					<QuickLinkList list={moreLinkList} onPress={onNavigate} />
				</View>
			</BottomModal>

			<EBizSharePopUp
				isVisible={isEBizCardSharePopUpVisible}
				setVisible={setIsEBizCardSharePopUpVisible}
				onPressClosePopUp={handleEBizShareClosedPopUp}
				onPressBasicShare={handleBasicShare}
				handleOpenEBizSharePopUp={handleOpenEBizSharePopUp}
			/>

			<PdfModal source={pdfSource} isVisible={showPDFModal} closeModal={closePdfModal} />
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

export default forwardRef(HomeNewView);

const FadeInView = ({ children, order = 0 }) => (
	<Animated.View entering={FadeInUp.delay(100 * order)}>{children}</Animated.View>
);
