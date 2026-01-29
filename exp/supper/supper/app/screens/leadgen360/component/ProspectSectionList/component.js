import React from 'react';
import { RefreshControl, SectionList, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, PrimaryButton, Space, Text } from 'atoms';
import { colors } from 'configs';
import { FAIL } from 'constant';
import ErrorLottie from 'assets/lottie/server_error.json';
import EmptyLottie from 'assets/lottie/empty_state.json';
import PlusIcon from 'assets/icon/plus.png';
import { ProductDetails } from '../ProductDetails';
import { leadgen_testID } from '../../../../../e2e/testID';
import { styles } from './styles';
import { Typography } from 'styles';

export const ProspectSectionListView = ({
	handleHeaderPress,
	onAddNewProduct,
	onRefresh,
	refreshing,
	contentVisible,
	data,
	status,
}) => {
	const insets = useSafeAreaInsets();

	const renderFooter = () => <View style={{ ...styles.footer, marginBottom: insets.bottom }} />;

	const renderSectionHeader = ({ section }) => {
		const { name, nickName, customerAliasId } = section;
		const isBothNameSame = name?.toLowerCase() === nickName?.toLowerCase();
		const isVisible = customerAliasId === contentVisible;
		return (
			<TouchableOpacity
				testID={`${leadgen_testID.prospectHeader}-${nickName}`}
				style={[styles.headerContainer]}
				onPress={() => handleHeaderPress({ section })}
			>
				<View>
					<Text variant={'P7'} style={styles.sectionName}>
						{name || nickName}
					</Text>
					{!isBothNameSame && !!name && (
						<Text variant={'P8'} style={styles.sectionNickname}>
							{nickName}
						</Text>
					)}
				</View>

				<Icon
					type={'material'}
					name={'keyboard-arrow-down'}
					style={{
						...styles.arrow,
						transform: [{ rotate: isVisible ? '360deg' : '270deg' }],
					}}
				/>
			</TouchableOpacity>
		);
	};

	const renderItem = ({ item, index, section }) => {
		const lastItem = section.data.length - 1;
		if (section.customerAliasId === contentVisible) {
			return (
				<View style={styles.productDetailContainer} key={index}>
					<ProductDetails
						item={item}
						key={index}
						testID={`${leadgen_testID.prospectsProductDetail}-${index}`}
					/>
					{index === lastItem && onAddNewProduct && (
						<PrimaryButton
							testID={leadgen_testID.addNewProductButton}
							style={[styles.addButton]}
							buttonStyle={styles.addNewProductContainer}
							title="Add Another Product / Services"
							rightIcon={PlusIcon}
							isTitleBold
							titleStyle={[Typography.p4, styles.addText]}
							iconStyle={[styles.addIcon]}
							onPress={() => onAddNewProduct({ section })}
						/>
					)}
				</View>
			);
		}
		return null;
	};

	const renderEmpty = () => (
		<View style={styles.emptyView}>
			<LottieView
				source={status === FAIL ? ErrorLottie : EmptyLottie}
				autoPlay
				loop={false}
				style={styles.emptyLottie}
			/>
			<Text variant={'P6'} style={{ textAlign: 'center' }}>
				{status === FAIL
					? 'An error occurred while processing your request. \nPlease try again later.'
					: 'No Record Found'}
			</Text>
		</View>
	);

	return (
		<SectionList
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					colors={[colors.primary]}
					tintColor={colors.primary}
				/>
			}
			showsVerticalScrollIndicator={false}
			stickySectionHeadersEnabled={true}
			sections={data}
			extraData={contentVisible}
			keyExtractor={(item, index) => item + index}
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
			ListFooterComponent={renderFooter}
			ListEmptyComponent={renderEmpty}
			renderSectionFooter={() => <Space height={15} />}
		/>
	);
};
