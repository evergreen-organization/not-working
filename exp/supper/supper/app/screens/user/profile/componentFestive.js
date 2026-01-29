import { ProfileBackground } from 'assets/festive/profile';
import { Text } from 'atoms';
import { colors } from 'configs';
import { Avatar, Header } from 'molecules';
import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from 'styles';
import { ChangeAvatarModal, Detail } from './components';
import { PROFILE_DETAIL_ITEMS } from './constant';
import { styles } from './styles';

export const FestiveProfileView = ({
	handleChangeAvatar,
	handleHeaderLeftBtn,
	setShowChangeAvatar,
	user,
	avatarImage,
	showChangeAvatar,
	avatar,
}) => {
	return (
		<ImageBackground source={ProfileBackground} style={[styles.container]} resizeMode="stretch">
			{/* <Video
				source={ProfileVideoBackground}
				style={styles.festiveBg}
				repeat={true}
				resizeMode="cover"
				paused={!isFocused || !isAppActive}
				playWhenInactive={true}
			/> */}
			<SafeAreaView style={styles.container}>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleHeaderLeftBtn,
					}}
					centerComponent={{
						text: 'Profile',
						style: [Typography.H6, { color: colors.black }],
					}}
				/>
				<ScrollView contentContainerStyle={styles.container}>
					<View style={styles.avatarContainer}>
						<Avatar
							preset="image"
							containerStyle={{ backgroundColor: colors.white }}
							source={avatarImage}
							rounded
							size={120}
							accessory
							onPressAccessory={() => setShowChangeAvatar(true)}
							accessorySize={30}
						/>
					</View>
					<Text variant={'H4'} style={styles.festiveNameText}>
						{user.name}
					</Text>
					<View style={styles.content}>
						{PROFILE_DETAIL_ITEMS(user).map((item) => (
							<Detail key={item.testID} testID={item.testID} icon={item.icon} value={item.value} />
						))}
					</View>
				</ScrollView>
				<ChangeAvatarModal
					isVisible={showChangeAvatar}
					data={avatar}
					closeModal={() => setShowChangeAvatar(false)}
					handleChangeAvatar={handleChangeAvatar}
				/>
			</SafeAreaView>
		</ImageBackground>
	);
};
