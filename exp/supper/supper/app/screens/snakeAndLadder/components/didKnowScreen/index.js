import React from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import Bg from '../../assets/dyk/bg-dyk.png';
import Btn from '../../assets/dyk/btn-back-dyk.png';

const { width, height } = Dimensions.get('screen');

export const DidYouKnowScreen = ({ navigation, route }) => {
	const message = route.params?.message || '';
	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<ImageBackground source={Bg} style={styles.background} resizeMode="cover">
			<View style={[styles.contentContainer, { height: height * 0.45, marginTop: height * 0.25 }]}>
				<Text style={[styles.text, { paddingHorizontal: width * 0.15 }]}>{message}</Text>
			</View>

			<TouchableOpacity style={{ marginTop: height * 0.1 }} onPress={handleBack}>
				<Image source={Btn} style={styles.backImage} />
			</TouchableOpacity>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#000',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	backImage: {
		width: 200,
		height: 60,
		resizeMode: 'contain',
	},
});
