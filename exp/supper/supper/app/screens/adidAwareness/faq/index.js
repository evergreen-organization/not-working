import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Screen, Space } from 'atoms';
import { Header, SearchBar } from 'molecules';
import { FAQSectionList } from 'organisms';
import { ADID_FAQ } from '../constant';
import { styles } from './styles';
import { colors } from 'configs';
import { routes } from 'navigations';

export const ADIDFaq = ({ navigation }) => {
	const [searchKeyword, setSearchKeyword] = useState('');
	const [filteredData, setFilteredData] = useState(ADID_FAQ);
	const sectionListRef = useRef(null);

	const handleHeaderLeftBtn = () => {
		navigation.goBack();
	};

	const handleSearch = (text) => {
		setSearchKeyword(text);
		if (text.trim() === '') {
			setFilteredData(ADID_FAQ);
		} else {
			const newFilteredData = ADID_FAQ.map((section) => {
				const filteredQuestions = section.data.filter((item) => {
					const questionMatch = item?.question?.toLowerCase().includes(text.toLowerCase());
					const answerMatch = item?.answer?.toLowerCase().includes(text.toLowerCase());
					const numberingMatch = item?.numbering?.some((num) =>
						num.toLowerCase().includes(text.toLowerCase()),
					);
					const boldTextMatch = item?.boldText?.toLowerCase().includes(text.toLowerCase());
					const boldTextMatch2 = item?.boldText2?.toLowerCase().includes(text.toLowerCase());
					const numberingMatch2 = item?.numbering2?.some((num) =>
						num.toLowerCase().includes(text.toLowerCase()),
					);
					const answerMatch2 = item?.answer2?.toLowerCase().includes(text.toLowerCase());
					const temp = item?.temp?.toLowerCase().includes(text.toLowerCase());

					return (
						questionMatch ||
						answerMatch ||
						numberingMatch ||
						boldTextMatch ||
						boldTextMatch2 ||
						numberingMatch2 ||
						answerMatch2 ||
						temp
					);
				});
				return { ...section, data: filteredQuestions };
			}).filter((section) => section.data.length > 0);

			setFilteredData(newFilteredData);
		}
	};

	const handleTextClear = () => {
		setSearchKeyword('');
		setFilteredData(ADID_FAQ);
	};

	const handleQuestionPress = (id) => {
		const section = filteredData.find((section) => section.data.some((item) => item.id === id));
		if (section) {
			const questionIndex = section.data.findIndex((item) => item.id === id);
			navigation.navigate(routes.ADID_FAQ_RESULT, {
				clickedQuestionIndex: questionIndex,
				filteredData: [section],
				visibleSection: section.id,
			});
		}
	};

	const renderItem = ({ item, index }) => (
		<TouchableOpacity onPress={() => handleQuestionPress(item.id)}>
			<View style={styles.viewSearched}>
				<View style={{ flex: 1 }}>
					<Text style={styles.questionText}>{item.question}</Text>
				</View>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<MaterialIcons
						name="keyboard-arrow-down"
						style={{
							fontSize: 30,
							color: colors.primary,
							transform: [{ rotate: '270deg' }],
						}}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);

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
					text: 'Frequently Asked Questions',
					numberOfLines: 3,
					style: styles.headerTitle,
				}}
				centerContainerStyle={styles.headerCenter}
			/>
			<View style={styles.view}>
				<SearchBar
					searchInput={searchKeyword}
					onChangeText={handleSearch}
					onPressClear={handleTextClear}
					placeholder={'Type Any Keyword Here'}
				/>
				<Space height={12} />

				{filteredData.length === 0 && (
					<View style={styles.noDataText}>
						<Text>No data found.</Text>
					</View>
				)}
				{searchKeyword !== '' && (
					<FlatList
						ref={sectionListRef}
						data={filteredData.reduce((acc, section) => [...acc, ...section.data], [])}
						keyExtractor={(item, index) => `${item.id}-${index}`}
						renderItem={renderItem}
					/>
				)}
				{searchKeyword === '' && <FAQSectionList data={ADID_FAQ} />}
			</View>
		</Screen>
	);
};
