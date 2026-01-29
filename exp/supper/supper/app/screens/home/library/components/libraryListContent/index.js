import React from 'react';
import { Linking } from 'react-native';

import { LibraryListContentComp } from './component';

export const LibraryListContent = ({
	booksVisible,
	loading,
	handleShowPDF,
}) => {
	const handleBookItemPress = ({ item }) => {
		if (item.contentType === 'P') {
			handleShowPDF(item.contentURL);
		}

		if (item.contentType === 'L') {
			Linking.openURL(item.link);
		}
	};

	const props = {
		booksVisible,
		loading,
		handleBookItemPress,
	};

	return <LibraryListContentComp {...props} />;
};
