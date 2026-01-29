import React from 'react';
import {
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
	useWindowDimensions,
	Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MissionInstruction = ({ navigation, route }) => {
	const { instruction } = route.params;

	const { width, height } = useWindowDimensions();

	return (
		<ImageBackground
			source={require('../../assets/mainScreen/bg-mainscreen2.png')}
			style={styles.container}
			resizeMode="stretch"
		>
			<SafeAreaView style={styles.safe}>
				<ImageBackground
					source={require('../../assets/mainScreen/bg-mission.png')}
					style={[styles.scrollBackground, { width: width * 0.9, height: height * 0.5 }]}
					resizeMode="stretch"
				>
					<Text style={[styles.textInstruction, { width: width * 0.7 }]}>{instruction}</Text>
				</ImageBackground>

				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.nextButtonWrapper}>
					<Image
						source={require('../../assets/mainScreen/btn-back.png')}
						style={styles.nextButton}
						resizeMode="contain"
					/>
				</TouchableOpacity>
			</SafeAreaView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safe: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
	},
	titleImage: {
		position: 'absolute',
		top: -50,
		marginTop: 10,
	},
	scrollBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},

	nextButtonWrapper: {
		marginTop: 10,
	},
	nextButton: {
		width: 200,
		height: 60,
	},
	textPurple: {
		color: '#8A2BE2',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textBlue: {
		color: '#1E90FF',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textGreen: {
		color: '#2E8B57',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textRed: {
		color: '#B22222',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textGold: {
		color: '#B8860B',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	textBrown: {
		color: '#5C4033',
		fontWeight: 'bold',
		textAlign: 'center',
		maxWidth: 350,
		marginBottom: 10,
		fontSize: 19,
	},
	buttonGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginTop: 50,
	},

	gridButton: {
		width: '50%',
		alignItems: 'center',
	},

	gridImage: {
		width: '100%',
		height: 130,
		marginVertical: 10,
	},
	textInstruction: {
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
	},
});
