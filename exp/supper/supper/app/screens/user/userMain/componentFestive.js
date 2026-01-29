import { ProfileBackground } from 'assets/festive/profile';
import { PrimaryButton, Text } from 'atoms';
import { colors } from 'configs';
import { Avatar } from 'molecules';
import React, { forwardRef } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { UserMenuItem as Item } from './components';
import { PROFILE_ITEMS } from './constant';
import { festiveStyles, styles } from './styles';

const { height, width } = Dimensions.get('window');

export const UserViewFestive = ({ handleLogout, user, avatarImage, adid, onNavigate }, ref) => {
	return (
		<>
			{/* <Video
				source={ProfileVideoBackground}
				style={styles.festiveVdoBg}
				repeat={true}
				resizeMode="cover"
				paused={!isFocused || !isAppActive}
				playWhenInactive={true}
			/> */}

			<SafeAreaView style={festiveStyles.topContainer}>
				<Image
					source={ProfileBackground}
					style={[StyleSheet.absoluteFill, { height, width }]}
					resizeMode="cover"
				/>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={[festiveStyles.selfCenter]}>
						<Avatar
							preset="image"
							containerStyle={festiveStyles.avatar}
							source={avatarImage}
							rounded
							size={110}
						/>
					</View>
					<View style={festiveStyles.textContainer}>
						<Text variant={'P9'} style={festiveStyles.name}>
							{user.name}
						</Text>
						<Text variant={'P10'} style={festiveStyles.id}>
							{user.staffId}
						</Text>
					</View>

					<View style={festiveStyles.menuContainer}>
						{PROFILE_ITEMS(adid).map((item) => (
							<Item
								key={item.testID}
								testID={item.testID}
								heading={item.heading}
								subheading={item.subheading}
								onPress={(event) => onNavigate(item.route, event)}
								headingStyle={{ color: colors.black }}
							/>
						))}
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={handleLogout}
							title={'Log Out'}
							style={[styles.logoutButtonContainer, festiveStyles.logoutButton]}
							shadowStyle={festiveStyles.logoutButtonShadow}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default forwardRef(UserViewFestive);
