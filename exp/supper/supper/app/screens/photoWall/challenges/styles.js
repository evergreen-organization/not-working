import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'configs';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
	headerRightIcon: {
		fontSize: 20,
		color: colors.black,
	},
	closeButton: {
		fontSize: 25,
		color: colors.lightGrey,
		textAlign: 'right',
		paddingTop: 10,
	},
	modal: {
		backgroundColor: colors.white,
		borderRadius: 15,
		paddingHorizontal: 15,
		flex: 1,
	},
	challengeBg: {
		position: 'absolute',
		width: '100%',
		height: '120%',
		opacity: 1,
	},
	challengeContainer: {
		backgroundColor: '#FFF9E3',
		borderRadius: 15,
		marginHorizontal: 10,
		marginTop: 10,
		paddingHorizontal: 5,
		height: height * 0.75,
		flex: 1,
	},
	todaysChallengeContainer: {
		backgroundColor: '#2E645F',
		borderRadius: 20,
		width: '50%',
		marginTop: 6,
		alignSelf: 'center',
	},
	todaysChallengeText: {
		textAlign: 'center',
		color: colors.white,
		padding: 5,
		fontSize: 17,
		fontWeight: 'bold',
		fontStyle: 'italic',
		fontFamily: 'OleoScript-Regular',
	},
	exitButton: {
		width: '95%',
		marginHorizontal: 12,
		marginVertical: 20,
		height: 45,
	},
	dayTitleContainer: {
		alignItems: 'center',
		marginTop: 12,
		height: height * 0.1,
	},
	dayImage: {
		width: 300,
		height: 65,
	},
	textContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: 250,
	},
	dayText: {
		fontSize: 14,
		fontStyle: 'italic',
		color: '#FFF4CF',
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: 'center',
		fontFamily: 'OleoScript-Regular',
		marginVertical: 20,
	},
	subTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.eerieBlack,
		marginTop: 8,
		textAlign: 'center',
		alignSelf: 'center',
	},
	middleContainer: {
		flex: 1,
		marginVertical: 6,
	},
	bottomContainer: {
		flex: 0.3,
		marginTop: 30,
		alignItems: 'center',
	},
	container: {
		borderColor: colors.secondary,
		borderWidth: 3,
		borderRadius: 12,
		width: '100%',
		height: '90%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.primary,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
	},
	imgStyle: {
		borderRadius: 10,
	},
	title: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 14,
		paddingHorizontal: 15,
		textAlign: 'center',
		flexWrap: 'wrap',
	},
});
