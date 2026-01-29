import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native';

import { Header, SearchBar } from 'molecules';
import { Text, Screen } from 'atoms';
import { Typography } from 'styles';

import {
	ELibraryWidget,
	GenresWidget,
	LibrarySearchModal,
	ReadingGoalsWidget,
	RecommendedBooksWidget,
} from '../components';
import { styles } from './styles';
import {
	getRecommendedBooks,
	LIBRARY_E_PUBLICATION_TITLE,
	LIBRARY_RECOMMENDED_TITLE,
} from '../utils';

export const LibraryMainView = ({
	handleChangeText,
	handlePressSearch,
	handlePressClear,
	handleSearchModalClose,
	handleReadingGoalPress,
	handleNavigation,
	handleEbooksPress,
	searchInput,
	showSearchResultModal,
	searchResults,
	goals,
	books,
	loadingBooks,
	loadingGoals,
}) => {
	const navigation = useNavigation();
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

	const recommendedBooks = getRecommendedBooks(books);

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Library',
					style: Typography.H6,
				}}
			/>
			<ScrollView
				testID={'library-main-scroll-view'}
				bounces={true}
				showsVerticalScrollIndicator={false}
			>
				<SearchBar
					testID={'library-search-text-input'}
					searchInput={searchInput}
					onChangeText={(e) => handleChangeText(e)}
					onPressSearch={handlePressSearch}
					onPressClear={handlePressClear}
					placeholder={'Search...'}
					style={styles.searchBar}
				/>
				<RecommendedBooksWidget
					onPress={() => handleNavigation(LIBRARY_RECOMMENDED_TITLE)}
					recommendedBooks={recommendedBooks}
					loadingBooks={loadingBooks}
				/>
				<ELibraryWidget
					onEbooksPress={handleEbooksPress}
					onEPublicationPress={() => handleNavigation(LIBRARY_E_PUBLICATION_TITLE)}
				/>
				<GenresWidget onPress={handleNavigation} />

				<Text variant={'P2'} style={styles.heading}>
					Goals
				</Text>
				<TouchableOpacity
					testID={'library-main-goal-widget'}
					style={styles.goalsSection}
					onPress={handleReadingGoalPress}
				>
					<ReadingGoalsWidget goals={goals} loading={loadingGoals} />
				</TouchableOpacity>
			</ScrollView>

			<LibrarySearchModal
				isVisible={showSearchResultModal}
				closeModal={handleSearchModalClose}
				books={searchResults}
			/>
		</Screen>
	);
};
