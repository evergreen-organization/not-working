import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EditIcon from 'assets/icon/pencil.png';
import ShareIcon from 'assets/icon/share.png';
import { Button } from 'atoms';
import { colors } from 'configs';
import { Header } from 'molecules';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isTemplateEditable, TemplateList } from '../utils';
import { TabBarIcon } from './components/TabBarIcon';
import TemplateContainer from './components/TemplateContainer';
import { styles } from './styles';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { commonStyles } from 'styles';

const TopTab = createMaterialTopTabNavigator();

const tabBarIcon = ({ color }) => <TabBarIcon color={color} />;

const options = {
	tabBarIcon: tabBarIcon,
};

const PhotoWallWithTemplateScreen = (
	{
		handleBackPressed,
		handleTouchEvents,
		handleUnlockPress,
		onShare,
		onTemplateChange,
		onEdit,
		isPhotoLoading,
		currentTemplate,
		templateRefs,
		isSharing,
	},
	ref,
) => {
	const insets = useSafeAreaInsets();

	return (
		<View onTouchStart={(e) => handleTouchEvents(e)} style={commonStyles.fill}>
			<View style={styles.bar}>
				<Header
					containerStyle={{ marginTop: insets.top }}
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						style: { color: colors.secondary },
						onPress: handleBackPressed,
					}}
				/>
			</View>
			<TopTab.Navigator
				tabBarPosition="bottom"
				initialRouteName={currentTemplate}
				screenOptions={{
					lazy: true,
					headerShown: false,
					tabBarScrollEnabled: true,
					tabBarShowLabel: false,
					tabBarIndicator: false,
					tabBarStyle: [styles.tabBarStyle, { bottom: -10 }],
					tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
					tabBarActiveTintColor: colors.paginator,
					tabBarInactiveTintColor: colors.medium,
					tabBarItemStyle: styles.tabBarItemStyle,
				}}
				screenListeners={{
					state: (e) => {
						const item = TemplateList?.[e?.data?.state?.index];
						onTemplateChange(item);
					},
				}}>
				{TemplateList.map((item, index) => (
					<TopTab.Screen key={item.id} name={item.id} options={options}>
						{() => (
							<TemplateContainer
								ref={templateRefs[index]}
								data={item}
								isSharing={isSharing}
								onUnlockPress={() => handleUnlockPress(item.id)}
							/>
						)}
					</TopTab.Screen>
				))}
			</TopTab.Navigator>
			<View style={[styles.buttonView]}>
				<ActionButton
					currentTemplate={currentTemplate}
					onEdit={onEdit}
					onShare={onShare}
					isPhotoLoading={isPhotoLoading}
				/>
			</View>
		</View>
	);
};

export default forwardRef(PhotoWallWithTemplateScreen);

const ActionButton = ({ currentTemplate, onEdit, onShare, isPhotoLoading }) => {
	return (
		<>
			{isTemplateEditable(currentTemplate) && (
				<Animated.View layout={LinearTransition.springify()} entering={FadeIn} exiting={FadeOut}>
					<Button
						onPress={onEdit}
						title={'Edit Card'}
						leftIcon={EditIcon}
						iconStyle={styles.editIcon}
						style={styles.editButton}
						typography={'P4'}
						labelStyle={styles.editButtonText}
					/>
				</Animated.View>
			)}
			<Animated.View layout={LinearTransition.springify()}>
				<Button
					onPress={onShare}
					title={'Share'}
					disabled={isPhotoLoading}
					loading={isPhotoLoading}
					style={styles.shareButton}
					typography={'P4'}
					labelStyle={styles.shareButtonText}
					leftIcon={ShareIcon}
				/>
			</Animated.View>
		</>
	);
};
