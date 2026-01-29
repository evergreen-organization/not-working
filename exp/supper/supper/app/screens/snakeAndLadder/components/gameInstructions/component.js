import React from 'react';
import {
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	useWindowDimensions,
} from 'react-native';

import { GAME_INSTRUCTIONS } from '../../constant/constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loading } from 'atoms';

export const BingoGameInstructions = (props) => {
	const { handlePlay, type, isLoading } = props;
	const { width, height } = useWindowDimensions();

	const {
		bg,
		imgTitle,
		button,
		imgInst,
		titleImgSize = {},
		titleInstSize = {},
		btnStartSize = {},
	} = GAME_INSTRUCTIONS[type] || {};

	const computedTitleStyle = {
		width: width * (titleImgSize.widthRatio || 0.9),
		height: height * (titleImgSize.heightRatio || 0.25),
		marginBottom: titleImgSize.marginBottom ?? 0,
		marginTop: titleImgSize.marginTop ?? 0,
	};

	const computedInstStyle = {
		// width: width * (titleImgSize.widthRatio || 0.7),
		height: height * (titleInstSize.heightRatio || 0.43),
	};

	const computedBtnStyle = {
		width: width * (btnStartSize.widthRatio || 0.4),
		height: height * (btnStartSize.heightRatio || 0.28),
	};

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.backgroundImg} source={bg} />

			<SafeAreaView style={styles.contentWrapper}>
				<View style={styles.scrollContainer}>
					<Image
						source={imgTitle}
						style={[styles.titleImg, computedTitleStyle]}
						resizeMode="contain"
					/>
					<Image
						source={imgInst}
						style={[styles.instructionImg, computedInstStyle]}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.viewButton}>
					<TouchableOpacity onPress={handlePlay}>
						<Image
							resizeMode="contain"
							style={[styles.buttonImage, computedBtnStyle]}
							source={button}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{isLoading && <Loading preset={'blurFullScreen'} />}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	backgroundImg: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	contentWrapper: {
		flex: 1,
	},
	scrollContainer: {
		alignItems: 'center',
	},
	titleImg: {},
	instructionImg: {
		width: '100%',
		alignSelf: 'center',
	},
	viewButton: {
		alignItems: 'center',
	},
	buttonImage: {},
});
