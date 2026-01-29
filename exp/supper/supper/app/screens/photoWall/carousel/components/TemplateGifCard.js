import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { convertToBase64 } from '../../utils';

export const TemplateGifCard = ({ gif }) => {
	const [url, setUrl] = useState('');

	useEffect(() => {
		(async () => setUrl(await convertToBase64(gif)))();
	}, [gif]);

	return (
		<Image
			source={{ uri: `data:image/gif;base64,${url}` }}
			style={styles.background}
		/>
	);
};

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
});
