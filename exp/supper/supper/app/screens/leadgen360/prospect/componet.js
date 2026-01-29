import React, { forwardRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Screen, Space, Text } from 'atoms';
import { LOADING } from 'constant';
import { Header, PrimaryBottomButton, SearchBar } from 'molecules';

import SortByNameIcon from 'assets/icon/sortAlphabet.png';
import SortByDateIcon from 'assets/icon/sortDate.png';
import { Typography } from 'styles';
import { leadgen_testID } from '../../../../e2e/testID';
import { ProductsSelectionPopUp, ProspectSectionList, SkeletonProspectList } from '../component';
import { PRODUCT_LABEL } from '../utils';
import { styles } from './styles';

export const LG360ProspectScreen = (
	{
		handleCloseModal,
		handleNewLeadAdd,
		handleTextClear,
		handleTextChange,
		handleAddNewProduct,
		handleSortTypeChange,
		handleRefresh,
		handleSelectNewProduct,
		handleHeaderLeftBtn,
		filteredProspect,
		searchInput,
		isProductPopUpVisible,
		prospectStatus,
		products,
		isSortByName,
	},
	ref,
) => {
	return (
		<Screen ref={ref}>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Lead Generation 360',
					style: Typography.H6,
				}}
			/>
			<View style={styles.background}>
				<View style={styles.view}>
					<Space height={10} />
					<SearchBar
						searchInput={searchInput}
						onChangeText={(text) => handleTextChange(text)}
						onPressClear={handleTextClear}
						placeholder={'Input Name'}
						style={styles.search}
					/>
					<View style={styles.heading}>
						<Text variant={'P7'} style={styles.headingText}>
							My Prospects
						</Text>
						<TouchableOpacity onPress={handleSortTypeChange} style={styles.sortButton}>
							<Text variant={'P6'} style={styles.sortText}>
								Sort by
							</Text>
							<Image source={isSortByName ? SortByNameIcon : SortByDateIcon} style={styles.icon} />
						</TouchableOpacity>
					</View>
					{prospectStatus === LOADING ? (
						<SkeletonProspectList loop={4} />
					) : (
						<ProspectSectionList
							data={filteredProspect}
							onAddNewProduct={handleAddNewProduct}
							onRefresh={handleRefresh}
							refreshing={prospectStatus === LOADING}
							status={prospectStatus}
						/>
					)}
				</View>
			</View>
			<PrimaryBottomButton
				title="+ Add New Prospect"
				testID={leadgen_testID.addNewLeadButton}
				onPress={handleNewLeadAdd}
				isTitleBold
			/>

			<ProductsSelectionPopUp
				dataLabel={PRODUCT_LABEL}
				visible={isProductPopUpVisible}
				data={products}
				onClose={handleCloseModal}
				onSubmit={handleSelectNewProduct}
			/>
		</Screen>
	);
};

export default forwardRef(LG360ProspectScreen);
