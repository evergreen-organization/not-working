import React, { useState } from 'react';
import { Image } from 'react-native';

import { colors } from 'configs';
import { Space, Text } from 'atoms';

import { styles } from './styles';
import { AnimatedScaleView } from 'molecules';
import { commonStyles } from 'styles';

export const QuickLinkItem = ({ label, icon, onPress, disabled = false, testID }) => {
	const [itemWidth, setItemWidth] = useState(0);

	const calculateWidth = (e) => setItemWidth(e.nativeEvent.layout.width);

	return (
		<AnimatedScaleView
			testID={testID}
			disabled={disabled}
			style={[commonStyles.fill]}
			containerStyle={styles.container}
			onPress={onPress}
			onLayout={calculateWidth}
		>
			<Image
				source={icon}
				style={{
					...styles.icon,
					...(disabled && { tintColor: colors.medium }),
				}}
			/>
			<Space height={10} />
			<Text
				bold
				numberOfLines={1}
				style={[styles.label, { ...(disabled && { color: colors.medium }), width: itemWidth - 2 }]}
			>
				{label}
			</Text>
		</AnimatedScaleView>
	);
};
