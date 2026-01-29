import React from 'react';
import { View } from 'react-native';
import { FAQSectionList } from 'organisms';
import { Screen, Space } from 'atoms';
import { Header } from 'molecules';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';

export const ADIDFaqResult = ({ navigation }) => {
	const route = useRoute();
	const { clickedQuestionIndex, filteredData, visibleSection } = route.params;

	const handleHeaderLeftBtn = () => {
		navigation.goBack();
	};

	const singleQuestionData = filteredData.map((section) => ({
		...section,
		data: section.data.filter((_, index) => index === clickedQuestionIndex),
	}));

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
				<Space height={24} />
				<FAQSectionList
					clickedQuestionIndex={clickedQuestionIndex}
					data={singleQuestionData}
					visibleSection={visibleSection}
				/>
			</View>
		</Screen>
	);
};
