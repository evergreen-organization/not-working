import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

import { Screen, Text } from 'atoms';
import { Avatar, Header } from 'molecules';
import { colors } from 'configs';
import { commonStyles, Typography } from 'styles';

import { ChangeAvatarModal, Detail } from './components';
import { styles } from './styles';
import { PROFILE_DETAIL_ITEMS } from './constant';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ProfileView = ({
	handleChangeAvatar,
	handleHeaderLeftBtn,
	setShowChangeAvatar,
	user,
	avatarImage,
	showChangeAvatar,
	avatar,
}) => {
	return (
		<ImageBackground style={[commonStyles.fill]} source={require('assets/60th-anni-bg.png')}>
			<SafeAreaView style={[commonStyles.fill]}>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleHeaderLeftBtn,
					}}
					centerComponent={{
						text: 'Profile',
						style: Typography.H6,
					}}
				/>
				<ScrollView contentContainerStyle={{ flex: 1 }}>
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
					<Text variant={'H4'} style={styles.nameText}>
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
