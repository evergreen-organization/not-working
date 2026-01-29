import { Image, View } from 'react-native';
import React, { useEffect } from 'react';
import quickLinkStyles from '../styles';
import { AnimatedScaleView } from 'molecules';
import { commonStyles } from 'styles';
import { IItem } from '../types';
import Icon from 'components/atoms/Icon';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolateColor,
} from 'react-native-reanimated';

const QuickItems = ({
	isSelected,
	selectedSlotKey,
	onPress,
	item,
}: {
	isSelected: boolean;
	selectedSlotKey: number | null;
	onPress: () => void;
	item: IItem;
}) => {
	const isSelectedValue = useSharedValue(isSelected ? 1 : 0);

	useEffect(() => {
		isSelectedValue.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
	}, [isSelected]);

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(isSelectedValue.value, [0, 1], ['transparent', '#09A332']),
		};
	});

	const animatedTextStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(isSelectedValue.value, [0, 1], ['#000', 'white']),
		};
	});

	const animatedDividerStyle = useAnimatedStyle(() => {
		return {
			borderBottomColor: interpolateColor(isSelectedValue.value, [0, 1], ['#ddd', 'white']),
		};
	});

	return (
		<Animated.View style={[quickLinkStyles.quickItemContainer, animatedContainerStyle]}>
			<AnimatedScaleView
				disabled={!selectedSlotKey}
				onPress={onPress}
				containerStyle={[
					commonStyles.rowHCenter,
					commonStyles.justifyContentBetween,
					{ paddingVertical: 10 },
				]}
			>
				<View style={[commonStyles.rowHCenter]}>
					<Image
						source={{ uri: item.icon }}
						style={[quickLinkStyles.itemImage, quickLinkStyles.listImage]}
					/>
					<Animated.Text style={[quickLinkStyles.labelText, animatedTextStyle]}>
						{item.label}
					</Animated.Text>
				</View>
				{isSelected && <Icon.Ionicons name="checkbox" size={25} color="white" />}
			</AnimatedScaleView>
			<Animated.View style={[quickLinkStyles.divider, animatedDividerStyle]} />
		</Animated.View>
	);
};

export default QuickItems;
