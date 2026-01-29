import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'configs';

export const Screen = (
	{
		children,
		style,
		modal,
		singlePage,
		testID,
	}: {
		children: ReactNode;
		style?: StyleProp<ViewStyle>;
		modal?: boolean;
		singlePage?: boolean;
		testID?: string;
	},
	ref: any,
) => {
	const insets = useSafeAreaInsets();
	return (
		<View
			ref={ref}
			testID={testID}
			style={[styles.screen, singlePage ? { paddingBottom: insets.bottom } : styles.bottom, style]}
		>
			<View
				style={{
					height: modal ? 0 : insets.top,
					backgroundColor: colors.background,
					zIndex: 9,
				}}
			/>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.background,
	},
	bottom: { paddingBottom: 0 },
});

export default forwardRef(Screen);
