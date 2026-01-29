import React from 'react';
import { View } from 'react-native';
import { Space, Text } from 'atoms';

export const TooltipContent = ({ title, subtitle, titleStyle, subtitleStyle, children }) => {
	return (
		<View>
			<Space height={10} />
			{title && (
				<Text variant={'P3'} style={titleStyle}>
					{title}
				</Text>
			)}
			{subtitle && (
				<Text variant={'P3'} style={subtitleStyle}>
					{subtitle}
				</Text>
			)}
			{children}
		</View>
	);
};
