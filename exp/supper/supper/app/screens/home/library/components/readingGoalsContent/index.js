import React from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon, Text } from 'atoms';
import LoadingLottie from 'assets/lottie/greeking.json';
import EmptyListLottie from 'assets/lottie/empty.json';
import { colors } from 'configs';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { styles } from './styles';

export const ReadingGoalsContent = ({
	list,
	loading,
	onUpdateReadingStatus,
	onDeleteReadingList,
}) => {
	const showUpdateReadingStatusAlert = (item) => {
		const { title, id, readingStatus } = item;
		Alert.alert('Mark as Read', 'Are you sure you want to mark ' + title + ' as read?', [
			{ text: 'Cancel', style: 'destructive' },
			{
				text: 'Confirm',
				onPress: () => onUpdateReadingStatus({ id, readingStatus, bookTitle: title }),
			},
		]);
	};
	const showDeleteAlert = (bookTitle, bookId) => {
		Alert.alert('Delete', `Are you sure you want to remove ${bookTitle} from your reading list?`, [
			{ text: 'Cancel' },
			{
				text: 'Delete',
				style: 'destructive',
				onPress: () => onDeleteReadingList(bookId),
			},
		]);
	};
	const renderEmpty = () => {
		return loading ? (
			<LottieView style={styles.loadingLottie} source={LoadingLottie} autoPlay loop />
		) : (
			<View style={styles.unavailableContainer}>
				<LottieView
					style={{ width: '40%', aspectRatio: 1 }}
					source={EmptyListLottie}
					autoPlay
					loop
				/>
				<Text variant={'P2'}>List is empty</Text>
				<Text variant={'P5'} style={styles.unavailableSubtext}>
					Start adding books to your list!
				</Text>
			</View>
		);
	};

	const renderItem = (data) => {
		const { item, index } = data;
		const { readingStatus, title, author } = item;

		return (
			<Swipeable
				friction={2}
				renderRightActions={() => renderRightActions(data)}
				overshootRight={false}
			>
				<View testID={`book-list-item-${index}`} style={styles.itemContainer}>
					<View>
						<Text
							as={Text.type.P6}
							style={[styles.itemTitle, readingStatus && { textDecorationLine: 'line-through' }]}
						>
							{title}
						</Text>
						<Text
							as={Text.type.P5}
							style={[styles.itemAuthor, readingStatus && { textDecorationLine: 'line-through' }]}
						>
							{author}
						</Text>
					</View>
					<View style={styles.checkboxContainer}>
						<TouchableOpacity
							testID={`book-list-check-button-${index}`}
							style={{
								...styles.checkbox,
								backgroundColor: readingStatus ? colors.primary : 'transparent',
							}}
							onPress={() => showUpdateReadingStatusAlert(item)}
							disabled={readingStatus}
						>
							{data.item.readingStatus && (
								<Icon type="entypo" name="check" style={styles.checkboxIcon} />
							)}
						</TouchableOpacity>
					</View>
				</View>
			</Swipeable>
		);
	};

	const renderRightActions = (data) => {
		const { item, index } = data;
		const { title, id } = item;

		return (
			<View testID={`book-list-hidde-item-${index}`} style={styles.hiddenItemContainer}>
				<TouchableOpacity
					testID={`book-list-delete-${index}`}
					style={styles.deleteButtonContainer}
					onPress={() => showDeleteAlert(title, id)}
				>
					<View style={styles.deleteButton}>
						<Icon type="antdesign" name="delete" style={styles.deleteIcon} />
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<FlatList
			data={list}
			renderItem={renderItem}
			contentContainerStyle={list.length !== 0 && styles.container}
			ListEmptyComponent={renderEmpty}
		/>
	);
};
