import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { colors } from 'configs';
import React, { forwardRef } from 'react';
import { NameCard } from '../../../eBizCard/components/NameCard';
import ViewIcon from 'assets/eBizCard/viewCard.png';
import ShareIcon from 'assets/eBizCard/shareIcon.png';
import ViewShot from 'react-native-view-shot';
import { showFestive } from 'constant';
import { FlagsIcon } from 'assets/festive/home';
import { Shadow, Text } from 'atoms';
import { AnimatedScaleView } from 'molecules';
import { commonStyles } from 'styles';

const windowWidth = Dimensions.get('window').width;

const EBizCardComponentRef = (props, ref) => {
	const { cardInfo, onPressCard, onView, onShare, isLoading } = props;

	return (
		<Shadow>
			<View
				testID={'ebizcard-widget'}
				style={[styles.card, showFestive && styles.efestiveContainer]}
			>
				{showFestive && <Image source={FlagsIcon} style={styles.flagIcon} resizeMode="contain" />}
				<Text bold style={styles.label}>
					My eBiz Card
				</Text>
				<View style={[commonStyles.row]}>
					<Shadow>
						<AnimatedScaleView onPress={onPressCard} style={{ opacity: 1 }}>
							<ViewShot ref={ref}>
								<NameCard isLoading={isLoading} width={windowWidth * 0.6} cardInfo={cardInfo} />
							</ViewShot>
						</AnimatedScaleView>
					</Shadow>
					<View style={[commonStyles.fill]}>
						<BizButton icon={ViewIcon} label={'View'} onPress={onView} />
						<View style={{ height: 12 }} />
						<BizButton icon={ShareIcon} label={'Share'} isPrimary onPress={onShare} />
					</View>
				</View>
			</View>
		</Shadow>
	);
};

const BizButton = ({ onPress, icon, label, isPrimary }) => {
	return (
		<Shadow style={[{ flex: 1, marginLeft: 12 }]}>
			<AnimatedScaleView
				onPress={onPress}
				containerStyle={[
					styles.button,
					{
						backgroundColor: isPrimary ? colors.primary : colors.white,
					},
				]}
				style={[commonStyles.fill]}
			>
				<Image
					resizeMode="contain"
					source={icon}
					style={[
						styles.buttonIcon,
						{
							tintColor: isPrimary ? colors.white : colors.primary,
						},
					]}
				/>
				<Text
					style={[
						styles.buttonText,
						{
							color: isPrimary ? colors.white : colors.primary,
						},
					]}
				>
					{label}
				</Text>
			</AnimatedScaleView>
		</Shadow>
	);
};
export const EBizCardComponent = forwardRef(EBizCardComponentRef);

const styles = StyleSheet.create({
	card: {
		flex: 1,
		backgroundColor: colors.white,
		borderRadius: 10,
		padding: 12,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 1,
	},
	label: {
		marginBottom: 10,
	},
	btnShareText: {
		color: 'white',
		fontWeight: 700,
		fontFamily: 'Roboto',
		fontSize: 12,
	},
	headingContainer: {
		flex: 1,
		paddingHorizontal: 18,
		paddingTop: 16,
	},
	shadowIos: {
		shadowOffset: { width: -2, height: 4 },
		shadowColor: '#171717',
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	shadowAndroid: {
		shadowColor: '#171717',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.065,
		shadowRadius: 10,
		elevation: 1,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// paddingHorizontal: 12,
		borderRadius: 4,
	},
	buttonIcon: {
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		marginTop: 4,
		color: 'black',
		fontWeight: 'bold',
		fontSize: 12,
	},
	flagIcon: {
		position: 'absolute',
		top: 0,
		zIndex: 10,
		right: -13,
		height: 35,
		width: 113,
	},
	efestiveContainer: {
		backgroundColor: colors.semiWhiteTransparent,
		overflow: 'hidden',
	},
});
