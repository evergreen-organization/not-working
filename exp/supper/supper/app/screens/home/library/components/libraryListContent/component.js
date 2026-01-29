import React from 'react';
import { FlatList, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { BookItem } from 'molecules';
import LoadingLottie from 'assets/lottie/greeking2.json';

import { EmptyView } from '../EmptyView';
import { styles } from './styles';

export const LibraryListContentComp = ({ booksVisible, loading, handleBookItemPress }) => {
	const renderEmpty = () => {
		return loading ? (
			<LottieView style={{ width: '100%', aspectRatio: 1 }} source={LoadingLottie} autoPlay loop />
		) : (
			<EmptyView />
		);
	};

	const renderItem = ({ item, index }) => {
		return (
			<View style={styles.bookRowContainer}>
				{item.contentType === 'P' || item.contentType === 'L' ? (
					<BookItem
						testID={`library-book-item-${index}`}
						variant={BookItem.variants.viewable}
						item={item}
						onPress={() => handleBookItemPress({ item })}
					/>
				) : (
					<BookItem item={item} />
				)}
			</View>
		);
	};

	return (
		<FlatList
			testID={'library-list'}
			data={booksVisible}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
			ListEmptyComponent={renderEmpty}
		/>
	);
};
