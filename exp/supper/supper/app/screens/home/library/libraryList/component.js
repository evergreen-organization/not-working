import React from 'react';
import Pdf from 'react-native-pdf';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Typography } from 'styles';
import { Screen } from 'atoms';
import { BottomModal, Header, SearchBar } from 'molecules';

import { LibraryListContent } from '../components';
import { styles } from './styles';

export const LibraryListView = ({
	handleChangeText,
	handlePressClear,
	handleShowPDF,
	handleCloseModal,
	booksVisible,
	showPDFModal,
	title,
	searchInput,
	selectedPDF,
}) => {
	const navigation = useNavigation();
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

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
					text: title,
					style: Typography.H6,
				}}
			/>
			<View style={styles.searchBarContainer}>
				<SearchBar
					testID={'library-search-text-input'}
					searchInput={searchInput}
					onChangeText={(text) => handleChangeText(text)}
					onPressClear={handlePressClear}
					placeholder={'Search...'}
				/>
			</View>
			<LibraryListContent booksVisible={booksVisible} handleShowPDF={handleShowPDF} />
			<BottomModal
				testID={'library-list-modal'}
				isVisible={showPDFModal}
				onCancel={handleCloseModal}
			>
				<Pdf source={selectedPDF} style={styles.pdf} />
			</BottomModal>
		</Screen>
	);
};
