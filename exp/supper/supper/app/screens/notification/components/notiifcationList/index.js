import React from 'react';
import { FlatList, Image, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'atoms';

import { getDurationFromCurrentTime } from 'utils';

import { styles } from './styles';

export const NotificationList = ({
	data,
	refreshing,
	onRefresh,
	onItemPress,
	onEndReached,
	label,
}) => {
	const renderItem = ({ item }) => {
		const { imageUrl, title, body, dateTime, contentId } = item;
		return (
			<TouchableOpacity onPress={() => onItemPress(contentId)} style={styles.itemContainer}>
				{!!imageUrl && (
					<View style={styles.iconContainer}>
						<Image source={{ uri: `${imageUrl}` }} style={styles.icon} />
					</View>
				)}
				<View style={styles.contentContainer}>
					<Text variant={'P4'} style={styles.title}>
						{title}
					</Text>
					<Text variant={'P3'} style={styles.subtitle} numberOfLines={3}>
						{body}
					</Text>
				</View>
				<View style={styles.timeContainer}>
					<Text variant={'P3'} style={styles.duration}>
						{getDurationFromCurrentTime(dateTime, 'YYYY-MM-DDTHH:mm:ssZ')}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const renderFooter = () => {
		if (data?.length === 0) {
			return null;
		} else {
			return (
				<Text variant={'P3'} style={styles.notice}>
					End of list
				</Text>
			);
		}
	};

	const renderEmpty = () => {
		return (
			<ScrollView
				contentContainerStyle={styles.emptyListContainer}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<Text variant={'P3'} style={styles.notice}>{`No ${label}`}</Text>
			</ScrollView>
		);
	};

	return (
		<View style={styles.view}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.listContainer}
				ListFooterComponent={renderFooter()}
				ListEmptyComponent={renderEmpty()}
				refreshing={refreshing}
				onRefresh={onRefresh}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.5}
			/>
		</View>
	);
};
