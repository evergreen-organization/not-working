import { Loading } from 'atoms';
import { LOADING } from 'constant';
import { routes } from 'navigations';
import React, { useEffect, useState } from 'react';
import {
	Image,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';
import { getGame, initGame, setAvatar } from 'stores';

export const avatars = [
	{ id: 1, image: require('../../assets/avatars/choco.png') },
	{ id: 2, image: require('../../assets/avatars/cookies.png') },
	{ id: 3, image: require('../../assets/avatars/mello.png') },
	{ id: 4, image: require('../../assets/avatars/cupcake.png') },
	{ id: 5, image: require('../../assets/avatars/candy.png') },
];

export const AvatarScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { playerPosition, campaignId, status } = useSelector(getGame);

	const [selectedAvatar, setSelectedAvatar] = useState(null);

	useEffect(() => {
		dispatch(initGame({ campaignId }));
	}, []);

	const handleConfirm = () => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

		if (selectedAvatar !== null) {
			dispatch(setAvatar(selectedAvatar));
			if (playerPosition > 0) {
				navigation.replace(routes.SNAKE_AND_LADDER);
			} else {
				navigation.replace(routes.STORY_LINE, { currentBoard: 3 });
			}
		}
	};

	return (
		<ImageBackground
			source={require('../../assets/mainScreen/bg-mainscreen2.png')}
			style={styles.container}
			resizeMode="stretch"
		>
			<SafeAreaView style={styles.safe}>
				<Image
					source={require('../../assets/mainScreen/select-title.png')}
					style={styles.title}
					resizeMode="contain"
				/>

				<View style={styles.avatarGrid}>
					{/* Top Row: Avatar1 & Avatar2 */}
					<View style={styles.row}>
						{avatars.slice(0, 2).map((avatar) => (
							<TouchableOpacity
								key={avatar.id}
								onPress={() => {
									playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

									setSelectedAvatar(avatar.id);
								}}
								style={[styles.avatarWrapper, selectedAvatar === avatar.id && styles.selected]}
							>
								<Image source={avatar.image} style={styles.avatarImage} resizeMode="contain" />
							</TouchableOpacity>
						))}
					</View>

					{/* Middle Row: Avatar3 */}
					<View style={styles.rowCenter}>
						<TouchableOpacity
							onPress={() => {
								playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

								setSelectedAvatar(avatars[2].id);
							}}
							style={[styles.avatarWrapper, selectedAvatar === avatars[2].id && styles.selected]}
						>
							<Image source={avatars[2].image} style={styles.avatarImage} resizeMode="contain" />
						</TouchableOpacity>
					</View>

					{/* Bottom Row: Avatar4 & Avatar5 */}
					<View style={styles.row}>
						{avatars.slice(3).map((avatar) => (
							<TouchableOpacity
								key={avatar.id}
								onPress={() => {
									playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

									setSelectedAvatar(avatar.id);
								}}
								style={[styles.avatarWrapper, selectedAvatar === avatar.id && styles.selected]}
							>
								<Image source={avatar.image} style={styles.avatarImage} resizeMode="contain" />
							</TouchableOpacity>
						))}
					</View>
				</View>

				<TouchableOpacity onPress={handleConfirm} style={styles.confirmButtonWrapper}>
					<Image
						source={require('../../assets/mainScreen/btn-confirm.png')}
						style={styles.confirmButton}
						resizeMode="contain"
					/>
				</TouchableOpacity>
			</SafeAreaView>
			{status === LOADING && <Loading preset={'blurFullScreen'} />}
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	safe: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 30,
		justifyContent: 'space-between',
	},
	title: {
		width: 400,
		height: 120,
	},
	avatarGrid: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},
	row: {
		flexDirection: 'row',
		gap: 50,
	},
	rowCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 20,
	},
	avatarWrapper: {
		width: 120,
		height: 120,
		borderRadius: 12,
		overflow: 'hidden',
	},
	avatarImage: {
		width: '100%',
		height: '100%',
	},
	selected: {
		borderWidth: 3,
		borderColor: '#FFD700',
		borderRadius: 12,
	},
	confirmButtonWrapper: {
		marginBottom: 20,
	},
	confirmButton: {
		width: 200,
		height: 60,
	},
});
