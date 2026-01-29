import React, { FC } from 'react';
import {
	Image,
	ImageProps,
	ImageStyle,
	StyleProp,
	TextProps,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewProps,
} from 'react-native';
import { Divider, Space, Text, TTextVariant } from 'atoms';

import { styles } from './styles';

export interface ListItemProps extends TouchableOpacityProps {
	testID?: string;
	title: string;
	titleStyle?: StyleProp<TextProps>;
	description?: string;
	descriptionStyle?: StyleProp<TextProps>;
	containerStyle?: StyleProp<ViewProps>;
	centerStyle?: StyleProp<ViewProps>;
	RightComponent?: any;
	LeftComponent?: any;
	bottomSeparator?: boolean;
	isLast?: boolean;
	leftIcon?: ImageProps;
	leftIconStyle?: StyleProp<ImageStyle>;
	rightIcon?: ImageProps;
	rightIconStyle?: StyleProp<ImageStyle>;
	titleTypography?: TTextVariant;
	titleNumberOfLine?: number;
	descriptionNumberOfLine?: number;
}

export const ListItem: FC<ListItemProps> = (props) => {
	const {
		testID,
		title,
		titleStyle,
		description,
		descriptionStyle,
		containerStyle,
		rightIcon,
		leftIcon,
		rightIconStyle,
		leftIconStyle,
		RightComponent,
		LeftComponent,
		children,
		bottomSeparator = true,
		isLast = false,
		titleTypography,
		centerStyle,
		titleNumberOfLine,
		descriptionNumberOfLine,
		...TouchableOpacityProps
	} = props;

	return (
		<>
			<TouchableOpacity {...TouchableOpacityProps} testID={testID}>
				<View style={[styles.$row, containerStyle]}>
					{leftIcon && <Image source={leftIcon} style={[styles.$icon, leftIconStyle]} />}
					{LeftComponent}
					<View style={[styles.$content, centerStyle]}>
						{title && (
							<Text
								variant={titleTypography ?? 'P4'}
								numberOfLines={titleNumberOfLine}
								style={titleStyle}
							>
								{title}
							</Text>
						)}
						{description && (
							<Text variant={'P3'} numberOfLines={descriptionNumberOfLine} style={descriptionStyle}>
								{description}
							</Text>
						)}
						{children}
					</View>

					{rightIcon && <Image source={rightIcon} style={[styles.$icon, rightIconStyle]} />}
					{RightComponent}
				</View>
			</TouchableOpacity>
			{!isLast && bottomSeparator ? <Divider /> : <Space height={3} />}
		</>
	);
};
