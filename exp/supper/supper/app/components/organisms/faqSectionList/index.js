import React, { useState, useEffect, useRef } from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
import { colors } from 'configs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BulletText, FLowText, ImageSlides, NumberText } from 'molecules';
import { styles } from './styles';
import { useIAMModal } from '../../../contexts';
import { Space, Text } from 'atoms';

export const FAQSectionList = ({ clickedQuestionIndex, data, visibleSection }) => {
	const insets = useSafeAreaInsets();
	const [contentVisible, setContentVisible] = useState(null);
	const { setIsIAMModalVisible, setIAMModalSlides } = useIAMModal();
	const sectionListRef = useRef(null);

	useEffect(() => {
		if (visibleSection !== null) {
			setContentVisible(visibleSection);
		}
	}, [visibleSection]);

	const onHeaderPress = ({ section }) => {
		if (sectionListRef.current) {
			sectionListRef.current.scrollToLocation({
				sectionIndex: data.findIndex((s) => s.id === section.id),
				itemIndex: 0,
				animated: true,
			});
		}
		setContentVisible((prevId) => (section.id === prevId ? null : section.id));
	};

	const onShowHowPress = (slides) => {
		setIAMModalSlides(slides);
		setIsIAMModalVisible(true);
	};

	const renderFooter = () => <View style={{ marginBottom: insets.bottom, ...styles.footer }} />;

	const renderSectionHeader = ({ section }) => {
		const isVisible = section.id === contentVisible;
		return (
			<TouchableOpacity style={styles.headerContainer} onPress={() => onHeaderPress({ section })}>
				<Text bold style={styles.sectionName}>
					{section.title}
				</Text>
				<MaterialIcons
					name="keyboard-arrow-down"
					style={{
						...styles.fontSize,
						color: colors.white,
						transform: [{ rotate: isVisible ? '360deg' : '270deg' }],
					}}
				/>
			</TouchableOpacity>
		);
	};

	const renderItem = ({ item, index, section }) => {
		if (section.id !== contentVisible) {
			return null;
		}

		return (
			<View style={styles.productDetailContainer} key={index}>
				{item.image && <ImageSlides data={item.image} />}
				{item.question && (
					<Text
						style={{
							...styles.questionText,
							color: colors.primary,
						}}
					>
						{item.question}
					</Text>
				)}
				<Text style={styles.textAnswer}>{item.answer}</Text>
				{item.boldText && <Text style={styles.boldText}>{item.boldText}</Text>}
				{item.bullet && <BulletText data={item.bullet} />}
				{item.numbering && <NumberText data={item.numbering} />}
				{item.boldText2 && <Text style={styles.boldText}>{item.boldText2}</Text>}
				{item.temp && <Text style={styles.textAnswer}>{item.temp}</Text>}

				{item.numbering2 && <NumberText data={item.numbering2} />}

				{item.flowText && <FLowText data={item.flowText.flow} text={item.flowText.text} />}
				{item.answer2 && <Text style={styles.textAnswer}>{item.answer2}</Text>}
			</View>
		);
	};

	return (
		<SectionList
			ref={sectionListRef}
			showsVerticalScrollIndicator={false}
			stickySectionHeadersEnabled
			sections={data}
			extraData={contentVisible}
			keyExtractor={(item, index) => item.id + index}
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
			ListFooterComponent={renderFooter}
			renderSectionFooter={() => <Space height={24} />}
		/>
	);
};
