import { Text } from '../text';
import React from 'react';

const escapeRegExp = (string: string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const TextMarker = ({ text, highlight }: { text: string; highlight: string[] }) => {
	const escapedHighlight = highlight.map((term) => escapeRegExp(term)).join('|');
	const regex = new RegExp(`(${escapedHighlight})`, 'gi');

	const parts = text.split(regex);

	return (
		<Text variant="H5">
			{parts.map((part) =>
				highlight.some((item) => item.toLowerCase() === part.toLowerCase()) ? (
					<Text variant="H4" color="primary" key={part}>
						{part}
					</Text>
				) : (
					<Text variant="H5" color="dark" key={part}>
						{part}
					</Text>
				),
			)}
		</Text>
	);
};

export default TextMarker;
