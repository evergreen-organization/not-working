import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { BookItem } from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from 'configs';
import { actions } from '@storybook/addon-actions';

const bookItem = {
	isbn: '978-1-492-07266-9',
	title: '97 Things About Ethics Everyone In Data Science Should Know',
	author: 'Bill Franks',
	year: '2020',
	publisher: 'Sebastopol, CA: O’Reilly Media Inc.',
	url: 'https://xperience-uat.pbebank.com:4430/pbexperience/BOOK/80_97%20THINGS%20ABOUT%20ETHI.jpg',
	genre: 'GENERAL INTEREST',
	recommended: '1',
	updateDt: '8/30/2022 11:19:58',
};

const ePublicationItem = {
	issueNo: 'Vol 50 No. 1',
	title: 'Leadership transformation reading list',
	coverpageURL:
		'https://xperience-uat.pbebank.com:4430/pbexperience/PUBLICATION/COVER_PAGE/86_emerald.jpg',
	genre: 'SOFT SKILLS',
	contentURL:
		'https://xperience-uat.pbebank.com:4430/pbexperience/PUBLICATION/CONTENT/86_SnL_Leadership%20trans.pdf',
	contentType: 'P',
	link: null,
	updateDt: '8/25/2022 16:51:02',
};

storiesOf('molecules/bookItem', module)
	.addDecorator((getStory) => (
		<SafeAreaProvider>
			<View style={{ backgroundColor: colors.white, paddingTop: 20 }}>
				{getStory()}
			</View>
		</SafeAreaProvider>
	))
	.add('Default', () => <BookItem item={bookItem} />)
	.add('E-Publication', () => (
		<BookItem
			item={ePublicationItem}
			variant={BookItem.variants.viewable}
			onPress={actions('OnPress')}
		/>
	));
