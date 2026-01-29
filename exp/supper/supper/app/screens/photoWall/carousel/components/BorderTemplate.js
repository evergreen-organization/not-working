import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { EditableImage } from './EditableImage';
import PhotoWallBg from 'assets/festive/eCards/ecard-bg-5.png';
import Border from 'assets/festive/eCards/ecard-border-8-1.png';

export const BorderTemplate = ({ images }) => {
	return (
		<>
			<Image source={PhotoWallBg} style={styles.background} />
			<View style={{ flexDirection: 'row' }}>
				<ImageBackground source={Border} style={styles.lantern1}>
					<View style={styles.image1}>
						<EditableImage image={images[0]} />
					</View>
				</ImageBackground>
				<ImageBackground source={Border} style={styles.lantern2}>
					<View style={styles.image1}>
						<EditableImage image={images[1]} />
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	lantern1: {
		height: 350,
		width: 180,
		top: 20,
		left: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image1: {
		overflow: 'hidden',
		height: 230,
		width: 150,
		borderRadius: 80,
		alignSelf: 'center',
		top: -13,
	},
	lantern2: {
		height: 350,
		width: 180,
		top: 50,
		left: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
