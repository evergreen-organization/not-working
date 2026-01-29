import { ScrollView, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Screen, Text } from 'atoms';
import { Header, SearchBar } from 'molecules';
import { Typography } from 'styles';
import { routes } from 'navigations';
import { styles } from './styles';
import { EBizTutorialItem } from '../components/eBizTutorialItem';
import { labelType, TUTORIAL_LIST } from '../constant/constantEBCHelp';
import { EBizTutorialDropItem } from '../components/eBizTutorialDropItem';
import { EBizTutorialSearchItem } from '../components/eBizTutorialSearchItem';
import { useDispatch } from 'react-redux';
import { addAnalyticCheckpoint } from 'utils';
import { USER_ANALYTICS } from 'constant';

export const EBizCardTutorials = ({ navigation }) => {
	const [searchInput, setSearchInput] = useState('');
	const allFalseArray = new Array(TUTORIAL_LIST).fill(false);
	const [isSelected, setIsSelected] = useState(allFalseArray);
	const [searchResults, setSearchResults] = useState([]);
	const viewRef = useRef();
	const dispatch = useDispatch();
	const handleSelect = (index) => {
		const tempSelect = [...allFalseArray];
		tempSelect[index] = !isSelected[index];
		setIsSelected(tempSelect);
	};

	const handlePressSearch = (e, { indexes }) => {
		const isSearch = true;
		const details = TUTORIAL_LIST[indexes[0]].list[indexes[1]];

		handleNavigate(e, details, indexes, isSearch);
	};

	const handleGoBack = () => {
		navigation.navigate(routes.EBIZ_SYSTEM_SETTINGS);
	};
	const handleTextChange = (text) => {
		setSearchInput(text);
		if (text.length === 0) {
			return setSearchResults([]);
		}
		setSearchResults(searchData(text));
	};
	const handleTextClear = (_) => {
		setSearchInput('');
		return setSearchResults([]);
	};

	const handleNavigate = (e, details, indexes, isSearch = false) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: USER_ANALYTICS.EBIZCARD_SCREENS.EBC_HELP_CENTRE,
			buttonEvent: e.nativeEvent,
			action: `${isSearch ? 'Search-' : ''}${TUTORIAL_LIST[indexes[0]].action}-${details.action}`,
		}).then();
		const newIndex = indexes.length > 2 ? indexes.slice(2) : [];
		navigation.navigate(routes.EBIZ_TUTORIAL_DETAILS, {
			...details,
			indexes: newIndex,
		});
	};
	const openWebView = (e, url) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: USER_ANALYTICS.EBIZCARD_SCREENS.EBC_HELP_CENTRE,
			buttonEvent: e.nativeEvent,
			action: 'eBC Suggestion/Feedback',
		}).then();
		navigation.navigate(routes.EBIZ_TUTORIAL_WEBVIEW, { url });
	};
	const searchData = (searchText) => {
		const results = [];
		TUTORIAL_LIST.forEach((tutorial, tutorialIndex) => {
			tutorial.list.forEach((tutorialSub, listItemIndex) => {
				if (tutorialSub.title.toLowerCase().includes(searchText.toLowerCase())) {
					results.push({
						description: tutorialSub.title,
						indexes: [tutorialIndex, listItemIndex],
					});
				}
				tutorialSub.list.forEach((detail, detailIndex) => {
					if (detail.title.toLowerCase().includes(searchText.toLowerCase())) {
						results.push({
							description: detail.title,
							indexes: [tutorialIndex, listItemIndex, detailIndex],
						});
					}
					detail.details.forEach((detailSub, detailSubIndex) => {
						const found = detailSub.find(
							(detailSubItem) => detailSubItem.type === labelType.heading,
						);
						if (found) {
							if (found.data.toLowerCase().includes(searchText.toLowerCase())) {
								results.push({
									description: found.data,
									indexes: [tutorialIndex, listItemIndex, detailIndex, detailSubIndex],
								});
							}
						}
					});
				});
			});
		});
		return results;
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleGoBack,
				}}
				centerComponent={{
					text: 'eBiz Card Help Centre',
					style: Typography.H6,
				}}
			/>
			<ScrollView style={styles.container} contentContainerStyle={styles.contentStyle}>
				<Text style={styles.lblDescription}>
					Need help? Use the search tool to quickly find what you're looking for, or tap on any of
					the categories below to learn more.
				</Text>
				<View style={styles.space} />
				<SearchBar
					searchInput={searchInput}
					onChangeText={(text) => handleTextChange(text)}
					onPressClear={handleTextClear}
					placeholder={'Type Any Keyword Here'}
				/>
				{searchResults.length > 0
					? searchResults.map((item, index) => (
							<EBizTutorialSearchItem
								key={item.id}
								description={item.description}
								onPress={(e) => handlePressSearch(e, item)}
							/>
					  ))
					: TUTORIAL_LIST.map((item, index) => (
							<>
								<EBizTutorialItem
									key={item.id}
									icon={item.icon}
									title={item.title}
									description={item.description}
									isSelected={isSelected[index]}
									onPress={
										item.webView ? (e) => openWebView(e, item.url) : () => handleSelect(index)
									}
								/>
								{isSelected[index] &&
									item.list.map((listItem, subIndex) => (
										<EBizTutorialDropItem
											key={listItem.id}
											icon={listItem.icon}
											title={listItem.title}
											onPress={(e) => {
												handleNavigate(e, listItem, [index, subIndex]);
											}}
										/>
									))}
							</>
					  ))}
			</ScrollView>
		</Screen>
	);
};
