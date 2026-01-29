import React from 'react';
import { FlatList, Image, Linking, TouchableOpacity, View } from 'react-native';
import { Text } from 'atoms';
import { EmptyNews } from '../emptyNews';
import { styles } from './styles';
export const NewsList = ({ data, refreshing, onRefresh, onEndReached }) => {
	const renderItem = ({ item }) => {
		if (!item?.url) {
			return;
		}
		return (
			<TouchableOpacity style={styles.touchableCard} onPress={() => Linking.openURL(item.url)}>
				<View style={styles.flex}>
					<Image source={{ uri: `${item.image}` }} style={styles.image} />
					<Text variant={'P9'} style={styles.mainText} numberOfLines={2}>
						{item.title}
					</Text>
					<Text variant={'P10'} style={styles.subText} numberOfLines={3}>
						{' '}
						{item.description}{' '}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const renderFooter = () => {
		if (data?.length === 0) {
			return null;
		}
		return (
			<Text variant={'P10'} style={styles.notice}>
				End of list
			</Text>
		);
	};

	if (data?.length === 0) {
		return <EmptyNews />;
	}

	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			data={data}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
			contentContainerStyle={styles.listContainer}
			ListFooterComponent={renderFooter()}
			refreshing={refreshing}
			onRefresh={onRefresh}
			onEndReached={onEndReached}
		/>
	);
};
