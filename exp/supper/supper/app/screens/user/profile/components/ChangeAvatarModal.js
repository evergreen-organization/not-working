import React from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { Avatar, BottomModal } from 'molecules';
import { colors } from 'configs';
import { AVATAR_PACK } from 'constant';

export const ChangeAvatarModal = ({ isVisible, closeModal, data, handleChangeAvatar }) => {
	const renderItem = ({ item, index }) => {
		const border = item.id === data.image ? 3 : 0;
		return (
			<Item
				index={index}
				image={item.image}
				onPress={() => handleChangeAvatar(item.id)}
				borderWidth={border}
			/>
		);
	};

	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal} avoidKeyboard={false}>
			<FlatList
				data={AVATAR_PACK.slice(1)}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContainer}
				numColumns={4}
			/>
		</BottomModal>
	);
};

const Item = ({ image, onPress, borderWidth, index }) => {
	const { width } = useWindowDimensions();
	const size = (width - 76) / 4;

	return (
		<View style={styles.item}>
			<Avatar
				preset={'image'}
				testID={`profile-avatar-item-${index}`}
				rounded
				source={image}
				size={size}
				containerStyle={{
					borderWidth: borderWidth,
					borderColor: colors.pbxAlt,
				}}
				onPress={onPress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		backgroundColor: colors.white,
		marginLeft: 20,
		marginTop: 20,
		marginBottom: 8,
	},
	item: {
		marginRight: 12,
		marginBottom: 12,
	},
});
