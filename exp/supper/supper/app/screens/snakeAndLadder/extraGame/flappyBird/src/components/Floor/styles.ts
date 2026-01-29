import { StyleSheet } from 'react-native';

export const styles = ({ xBody, yBody, widthBody, heightBody }) =>
	StyleSheet.create({
		floor: {
			position: 'absolute',
			left: xBody,
			top: yBody,
			width: widthBody,
			height: heightBody,
			backgroundColor: 'rgba(255, 0, 0, 0)',
		},
	});
