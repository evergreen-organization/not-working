import { Screen } from 'atoms';
import { Header } from 'molecules';
import { Typography } from 'styles';
import React, { useEffect, useRef, useState } from 'react';
import { EBizTutorialDetailDropItem } from '../components/eBizTutorialDetailDropItem';
import { EBizTutorialDetailItem } from '../components/eBizTutorialDetailItem';
import { ScrollView, View } from 'react-native';
import { EBizTutorialDetailTitle } from '../components/eBizTutorialDetailTitle';
import { routes } from 'navigations';
import { TUTORIAL_LIST } from '../constant/constantEBCHelp';

export const EBizCardTutorialDetails = ({ route, navigation }) => {
	const { icon, title, list, indexes } = route?.params || {};
	const allFalseArray = new Array(list).fill(false);
	const [isSelected, setIsSelected] = useState(allFalseArray);
	const scrollViewRef = useRef();

	useEffect(() => {
		if (indexes?.length > 0) {
			const tempSelect = [...allFalseArray];
			tempSelect[indexes[0]] = true;
			setIsSelected(tempSelect);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSelect = (item, index) => {
		const tempSelect = [...allFalseArray];
		tempSelect[index] = !isSelected[index];
		setIsSelected(tempSelect);
		scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
	};

	const handleGoBack = () => {
		navigation.goBack();
	};
	const handleNavigate = (item) => {};

	const handlePressTag = (indexes) => {
		const firstLevel = TUTORIAL_LIST[indexes[0]];
		if (firstLevel.webView) {
			navigation.replace(routes.EBIZ_TUTORIAL_WEBVIEW, { url: firstLevel.url });
			return;
		}

		const details = firstLevel.list[indexes[1]];
		const newIndexes = indexes.slice(2);
		navigation.replace(routes.EBIZ_TUTORIAL_DETAILS, {
			...details,
			indexes: newIndexes,
		});
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
			<EBizTutorialDetailTitle icon={icon} title={title} />
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
				showsVerticalScrollIndicator={false}
			>
				{list.map((item, index) => (
					<>
						<EBizTutorialDetailDropItem
							key={item.id}
							isSelected={isSelected[index]}
							title={item.title}
							bullet={item.bullet}
							onPress={() => handleSelect(item, index)}
						/>
						{isSelected[index] &&
							item.details.map((detail) => (
								<View key={detail.id} style={{ paddingHorizontal: 24 }}>
									<EBizTutorialDetailItem
										details={detail}
										onNavigate={handleNavigate}
										padding={48}
										onPressTag={handlePressTag}
									/>
								</View>
							))}
					</>
				))}
			</ScrollView>
		</Screen>
	);
};
