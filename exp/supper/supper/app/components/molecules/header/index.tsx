import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from './styles';
import { HeaderChildren } from './components';

export const Header = ({
	leftComponent,
	centerComponent,
	rightComponent,
	containerStyle,
	leftContainerStyle,
	centerContainerStyle,
	rightContainerStyle,
	children = [],
	bgColor = 'transparent',
}: any) => {
	return (
		<View
			style={StyleSheet.flatten([styles.container, { backgroundColor: bgColor }, containerStyle])}
		>
			<HeaderChildren
				style={{ ...styles.leftButtonContainer, ...leftContainerStyle }}
				placement="left"
			>
				{(React.isValidElement(children) && children) || children[0] || leftComponent}
			</HeaderChildren>
			<HeaderChildren style={centerContainerStyle} placement="center">
				{(React.isValidElement(children) && children) || children[1] || centerComponent}
			</HeaderChildren>
			<HeaderChildren
				style={{ ...styles.rightButtonContainer, ...rightContainerStyle }}
				placement="right"
			>
				{(React.isValidElement(children) && children) || children[2] || rightComponent}
			</HeaderChildren>
		</View>
	);
};
