import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HeaderIcon, renderNode } from './index';
import { useNavigation } from '@react-navigation/native';
import { Typography } from 'styles';

const ALIGN_STYLE = {
	left: 'flex-start',
	right: 'flex-end',
	center: 'center',
};

export const HeaderChildren = ({ style, placement, children }) => {
	const navigation = useNavigation();

	const renderChildren = () => {
		if (children == null || children === false) {
			return null;
		}
		if (children.text) {
			return renderNode(Text, children.text, {
				numberOfLines: 1,
				...children,
				style: [Typography.H6, children?.style],
			});
		}
		if (children.icon) {
			return renderNode(HeaderIcon, {
				...children,
				name: children.icon,
				type: children.type,
				onPress: children?.onPress ?? navigation.goBack,
				testID: children.testID,
				style: StyleSheet.flatten([{ alignItems: ALIGN_STYLE[placement] }, children.style]),
			});
		}
		return renderNode(Text, children);
	};

	return (
		<View style={StyleSheet.flatten([{ alignItems: ALIGN_STYLE[placement] }, style])}>
			{renderChildren()}
		</View>
	);
};
