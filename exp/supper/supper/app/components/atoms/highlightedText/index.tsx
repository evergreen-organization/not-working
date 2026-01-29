import React from 'react';
import { TextProps, TextStyle } from 'react-native'; // Import TextProps for typing
import { Text } from '../text';

interface HighlightedTextProps extends TextProps {
	text: string;
	specialKey: string;
	color: string;
	style?: TextStyle;
}

const HighlightedText: React.FC<HighlightedTextProps> = (props) => {
	const { text, specialKey, color, style, ...rest } = props;
	const words = text.split(' ');

	return (
		<Text style={style} {...rest}>
			{words.map((word, index) => {
				if (word.startsWith(specialKey) || word.endsWith(specialKey)) {
					return (
						<Text key={`${word}-${index}`} style={[{ color: color }, style]}>
							{word}{' '}
						</Text>
					);
				}
				return `${word} `;
			})}
		</Text>
	);
};

export default HighlightedText;
