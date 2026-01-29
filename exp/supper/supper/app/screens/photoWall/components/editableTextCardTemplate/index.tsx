import { View, ImageBackground, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import styles from './styles';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { commonStyles } from 'styles';

type TTextStyle =
	| 'greetText1'
	| 'mainText1'
	| 'footerText1'
	| 'greetText2'
	| 'mainText2'
	| 'footerText2'
	| 'greetText3'
	| 'mainText3'
	| 'footerText3'
	| 'greetText4'
	| 'mainText4'
	| 'footerText4';

const EditableTextCardTemplate = ({
	backgroundImage,
	cardMessage,
	containerStyle,
	templateStyle = 'template1',
	greetTextTextStyle = 'greetText1',
	mainMsgTextStyle = 'mainText1',
	footerTextStyle = 'footerText1',
}: {
	backgroundImage: ImageSourcePropType;
	cardMessage: { mainMsg: string; footer: string; greeting: string };
	containerStyle: StyleProp<ViewStyle>;
	templateStyle: 'template1' | 'template2' | 'template3' | 'template4';
	greetTextTextStyle: TTextStyle;
	mainMsgTextStyle: TTextStyle;
	footerTextStyle: TTextStyle;
}) => {
	const { mainMsg, footer, greeting } = cardMessage ?? {};

	return (
		<ImageBackground
			source={backgroundImage}
			style={[styles.container, containerStyle]}
			resizeMode="stretch"
		>
			<View style={[styles.contentContainer, styles[templateStyle]]}>
				{greeting ? (
					<Animated.Text
						entering={FadeInDown.delay(0)}
						style={[commonStyles.textCenter, styles[greetTextTextStyle]]}
					>
						{greeting}
					</Animated.Text>
				) : null}
				{mainMsg ? (
					<Animated.Text
						entering={FadeInDown.delay(300)}
						style={[commonStyles.textCenter, styles[mainMsgTextStyle]]}
					>
						{mainMsg}
					</Animated.Text>
				) : null}
				{footer ? (
					<Animated.Text
						entering={FadeInDown.delay(600)}
						style={[commonStyles.textCenter, styles[footerTextStyle]]}
					>
						{footer}
					</Animated.Text>
				) : null}
			</View>
		</ImageBackground>
	);
};

export default EditableTextCardTemplate;
