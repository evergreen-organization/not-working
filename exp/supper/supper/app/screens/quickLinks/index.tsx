import { StackScreenProps } from '@react-navigation/stack';
import { Screen, Text } from 'atoms';
import { QUICK_LINKS } from 'constant';
import { AnimatedScaleView, ButtonBottom, Header } from 'molecules';
import { goBack } from 'navigations/RootNavigation';
import { AppNavigatorParamsList } from 'navigations/types';
import React from 'react';
import { FlatList, Image, ImageBackground, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setMiniQuickLinks, setQuickLinks } from 'stores/widget/reducer';
import { getMiniQuickLinks, getQuickLinks } from 'stores/widget/selector';
import { commonStyles, Typography } from 'styles';
import QuickItems from './components/quickItems';
import quickLinkStyles from './styles';
import { IItem } from './types';
import ExistApp from 'react-native-exit-app';

const QuickLinks = ({ route }: StackScreenProps<AppNavigatorParamsList, 'quickLinks'>) => {
	const { isMini } = route.params ?? {};
	const [selectedSlotKey, setSelectedSlotKey] = React.useState<number | null>(null);
	const [selectedItem, setSelectedItem] = React.useState<IItem | null>(null);
	const storedQuickLinks = useSelector(isMini ? getMiniQuickLinks : getQuickLinks);
	const dispatch = useDispatch();

	const renderQuickLinkItem = ({ item }: { item: IItem }) => {
		const isSelected = selectedItem?.id === item.id;
		const onPress = () => {
			setSelectedItem(isSelected ? null : item);

			const newQuickLinks = [...storedQuickLinks];
			newQuickLinks[selectedSlotKey ?? 0] = isSelected ? null : item;

			isMini
				? dispatch(setMiniQuickLinks({ miniQuickLinks: newQuickLinks }))
				: dispatch(setQuickLinks({ quickLinks: newQuickLinks }));
		};

		return (
			<QuickItems
				isSelected={isSelected}
				selectedSlotKey={selectedSlotKey}
				onPress={onPress}
				item={item}
			/>
		);
	};

	const renderAddItem = (item: IItem | null, index: number) => {
		const isSelected = selectedSlotKey === index;

		const onPressAddItem = () => {
			setSelectedSlotKey(index);
			setSelectedItem(item);
		};

		return (
			<AnimatedScaleView
				disabled={index === 0}
				key={index}
				onPress={onPressAddItem}
				style={[
					commonStyles.center,
					quickLinkStyles.itemContainer,
					{
						borderColor: isSelected ? '#09A332' : 'transparent',
						backgroundColor: index === 0 ? '#333333' : 'rgba(0, 0 ,0 , 0.4)',
					},
				]}
			>
				<Image source={{ uri: item?.icon ?? 'add' }} style={[quickLinkStyles.itemImage]} />
				<Text variant="P8" style={quickLinkStyles.addLabel} color="white" bold numberOfLines={1}>
					{item?.label ?? 'Add'}
				</Text>
			</AnimatedScaleView>
		);
	};

	const onPress = () => {
		setTimeout(() => {
			ExistApp?.exitApp();
		}, 300);
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: () => {
						goBack();
					},
				}}
				centerComponent={{
					text: 'Personalize Quick-Access Widget',
					style: Typography.H6,
				}}
			/>
			<View style={[quickLinkStyles.contentContainer]}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<ImageBackground
						source={{ uri: 'ql_bg_medium' }}
						style={isMini ? quickLinkStyles.cardImage2 : quickLinkStyles.cardImage}
						resizeMode="stretch"
					>
						<View>
							<Text variant="H6" color="white">
								{'PBeXperience'}
							</Text>
							<Text variant="P10" color="white" style={[quickLinkStyles.tapText]}>
								{'Custom Quick Access Icons'}
							</Text>
							<View
								style={[commonStyles.rowHCenter, commonStyles.justifyContentBetween, { gap: 10 }]}
							>
								{storedQuickLinks?.map(renderAddItem)}
							</View>
						</View>
					</ImageBackground>
				</View>

				<FlatList
					showsVerticalScrollIndicator={false}
					style={quickLinkStyles.quickLinkList}
					contentContainerStyle={quickLinkStyles.listContainer}
					data={Object.values(QUICK_LINKS)}
					keyExtractor={(item) => item.id}
					renderItem={renderQuickLinkItem}
				/>
			</View>
			<ButtonBottom onPress={onPress}>{'Back to Widget'}</ButtonBottom>
		</Screen>
	);
};

export default QuickLinks;
