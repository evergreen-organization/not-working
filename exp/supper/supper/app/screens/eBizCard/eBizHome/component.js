import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { Icon, Space, Text } from 'atoms';
import { Header } from 'molecules';
import { commonStyles, initialBottom, Typography } from 'styles';
import BusinessCardIcon from 'assets/eBizCard/BasicIcon.png';
import DynamicCardIcon from 'assets/eBizCard/DynamicIcon.png';
import { BusinessCard, CardButton, DynamicTagPopUp } from '../components';
import { ShadowedView } from 'react-native-fast-shadow';
import { styles } from './styles';
import { routes } from 'navigations';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { EBizCardInfo } from '../eBizCardInfo';
import { HeaderIcon } from 'components/molecules/header/components';
import { colors } from 'configs';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { USER_ANALYTICS } from 'constant';

export const EBizHomeComp = ({
	handleGoBack,
	handleNavigation,
	handleBasicShare,
	badgeCount,
	cardImage,
	isLoading,
	cardInfo,
	isPopUpVisible,
	setIsPopUpVisible,
	handlePopUp,
}) => {
	const scrollView = useSharedValue(0);
	const insets = useSafeAreaInsets();
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			'worklet';
			scrollView.value = event.contentOffset.y;
		},
	});

	if (isLoading) {
		return <ActivityIndicator color={colors.primary} size="large" />;
	}
	return (
		<>
			<SafeAreaView style={commonStyles.fill} edges={['top']}>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleGoBack,
					}}
					centerComponent={{
						text: 'My eBiz Card',
						style: Typography.H6,
					}}
					rightComponent={
						<View style={styles.$headerRightView}>
							<HeaderIcon
								type={'material'}
								style={styles.$settingsIcon}
								name={'settings'}
								onPress={() => {
									handleNavigation(routes.EBIZ_SYSTEM_SETTINGS);
								}}
							/>
							{badgeCount > 0 && (
								<View style={styles.$badgeContainer}>
									<Text style={styles.$badgeText}>{badgeCount}</Text>
								</View>
							)}
						</View>
					}
					rightContainerStyle={{ backgroundColor: null }}
				/>

				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					onScroll={scrollHandler}
					scrollEventThrottle={16}
				>
					<ShadowedView
						style={Platform.OS === 'ios' ? { ...styles.$shadowIos } : { ...styles.$shadowAndroid }}
					>
						<BusinessCard cardImage={cardImage} cardInfo={cardInfo} />
					</ShadowedView>

					<ShadowedView
						style={[
							{ marginHorizontal: 24, marginTop: 10 },
							Platform.OS === 'ios'
								? {
										...styles.$shadowIos,
								  }
								: {
										...styles.$shadowAndroid,
								  },
						]}
					>
						<View style={styles.$eCardSection}>
							<EBizCardInfo />
						</View>
					</ShadowedView>

					<Space height={50} />
				</Animated.ScrollView>
				<ShadowedView
					style={{
						backgroundColor: colors.background,
						shadowColor: colors.lightGrey,
						shadowOpacity: 0.6,
						shadowRadius: 10,
						paddingBottom: initialBottom,
					}}
				>
					<View style={styles.$shareSectionHeader}>
						<Text variant={'H6'} style={styles.$shareTitle}>
							Share Card
						</Text>
						<Icon type={'entypo'} name={'share'} style={styles.$shareIcon} />
					</View>
					<View style={styles.$shareContainer}>
						<CardButton
							icon={BusinessCardIcon}
							title={'Basic eBiz Card'}
							onPress={handleBasicShare}
						/>
						<CardButton
							icon={DynamicCardIcon}
							title={'Dynamic eBiz Card'}
							onPress={() => handlePopUp()}
						/>
					</View>
				</ShadowedView>
			</SafeAreaView>
			<DynamicTagPopUp
				isPopUpVisible={isPopUpVisible}
				setIsPopUpVisible={setIsPopUpVisible}
				path={USER_ANALYTICS.EBIZCARD_SCREENS.HOME}
				shouldIgnoreDeeplink
			/>
		</>
	);
};
