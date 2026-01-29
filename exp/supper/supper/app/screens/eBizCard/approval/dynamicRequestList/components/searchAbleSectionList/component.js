import { TagList } from '../tagList';
import { IconNew, Text, Toggle } from 'atoms';
import { Image, SectionList, TouchableOpacity, View } from 'react-native';
import SortAZ from 'assets/eBizCard/Sort_AZ.png';
import SortDate from 'assets/eBizCard/Sort_Clock.png';
import { styles } from '../../styles';
import { colors } from 'configs';
export const SearchableSectionListComp = ({
	data,
	handleSelectAll,
	selectedItems,
	handleSortList,
	handleSelection,
	sortSelected,
	keyExtractor,
	onPressGenerateQRCode,
	setIsApproveVisible,
}) => {
	const renderSectionHeader = ({ section: { title, data, key } }) => (
		<View style={styles.headerContainer} key={key}>
			<Text style={styles.textTitle}>{title}</Text>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					marginTop: 12,
				}}
			>
				<TouchableOpacity
					onPress={() => handleSelectAll(data, key)}
					style={{
						flex: 1,
						flexWrap: 'wrap',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<TouchableOpacity
						onPress={() => handleSelectAll(data, key)}
						style={{ paddingLeft: 8, padding: 6 }}
					>
						<Toggle
							inputInnerStyle={{
								backgroundColor: colors.primary,
							}}
							inputOuterStyle={{
								borderColor: '#C7C7C7',
							}}
							value={data?.every((list) => selectedItems.some((list2) => list2.id === list.id))}
							variant={'checkbox'}
							onPress={() => handleSelectAll(data, key)}
							checkboxIcon={
								<IconNew type={'font-awesome'} name={'check'} size={15} color={'#fff'} />
							}
						/>
					</TouchableOpacity>
					<Text style={{ flex: 1, fontSize: 12, fontWeight: 400 }}>Select All</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
					<Text style={{ fontSize: 12, fontWeight: 400 }}>Sort by</Text>
					<TouchableOpacity onPress={() => handleSortList({ data, key })}>
						<Image
							source={sortSelected[key] === 'alpha' ? SortAZ : SortDate}
							style={{ width: 40, height: 22, tintColor: colors.primary }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	const renderSelection = ({ item }) => {
		const isSelected = selectedItems.some((sI) => sI.id === item.id);
		return (
			<TagList
				isSelected={isSelected}
				item={item}
				handleSelection={handleSelection}
				setIsApproveVisible={setIsApproveVisible}
				onPressGenerateQRCode={onPressGenerateQRCode}
			/>
		);
	};

	return (
		<SectionList
			sections={data}
			renderItem={renderSelection}
			renderSectionHeader={renderSectionHeader}
			keyExtractor={keyExtractor}
			showsVerticalScrollIndicator={false}
			stickySectionHeadersEnabled={true}
		/>
	);
};
