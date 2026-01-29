import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { actions } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { NavigationContainer } from '@react-navigation/native';

import { LibraryMainView } from './component';

const recommended = [
	{
		isbn: '978-1-492-07266-9',
		title: '97 Things About Ethics Everyone In Data Science Should Know',
		author: 'Bill Franks',
		year: '2020',
		publisher: 'Sebastopol, CA: O’Reilly Media Inc.',
		url: 'https://xperience-uat.pbebank.com:4430/pbexperience/BOOK/80_97%20THINGS%20ABOUT%20ETHI.jpg',
		genre: 'GENERAL INTEREST',
		recommended: '1',
		updateDt: '8/30/2022 11:19:58',
	},
];

const goals = {
	done: '0',
	goal: '1',
};

storiesOf('screens/library/LibraryMain', module)
	.addDecorator((getStory) => (
		<NavigationContainer>
			<SafeAreaProvider>{getStory()}</SafeAreaProvider>
		</NavigationContainer>
	))
	.add('Default', () => (
		<LibraryMainView
			handleNavigation={actions('handleNavigation')}
			onChangeText={actions('onChangeText')}
			onPressSearch={actions('onPressSearch')}
			onPressClear={actions('onPressClear')}
			onSearchModalClose={actions('onSearchModalClose')}
			onReadingGoalPress={actions('onReadingGoalPress')}
			searchInput={text('searchInput', '')}
			recommended={recommended}
			recommendedCounter={0}
			loadingBooks={boolean('loadingBook', false)}
			showSearchResultModal={boolean('showSearchResultModal', false)}
			searchResult={[]}
			goals={goals}
			loadingGoal={boolean('loadingGoal', false)}
		/>
	));
