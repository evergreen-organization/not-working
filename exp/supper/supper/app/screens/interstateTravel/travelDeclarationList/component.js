import React from 'react';
import Moment from 'moment';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'molecules';
import { Typography } from 'styles';
import { Space, Text, Icon, Screen, Loading } from 'atoms';

import CoverMaskIcon from 'assets/icon/coverMask.png';
import { styles } from './styles';

export const TravelDeclarationListComp = ({
	handleNavigateToForm,
	NotNullOrWhiteSpaces,
	outstationList,
	isLoading,
}) => {
	const navigation = useNavigation();
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

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
					text: 'Travel Declaration',
					style: Typography.H6,
				}}
				rightComponent={{
					testID: 'add-travel-declaration',
					icon: 'plus',
					type: 'entypo',
					styles: styles.headerIcon,
					onPress: handleNavigateToForm,
				}}
			/>
			<View style={styles.container}>
				{outstationList.length > 0 ? (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={outstationList}
						keyExtractor={(item, index) => index.toString()}
						contentContainerStyle={styles.listContainer}
						ListFooterComponent={<Space height={12} />}
						renderItem={({ item, index }) => (
							<View testID={`travel-declaration-list-${index}`} style={styles.record}>
								{NotNullOrWhiteSpaces(item.travelType) && (
									<Text variant={'P9'} style={styles.title}>
										{item.travelType} Travel
									</Text>
								)}
								{NotNullOrWhiteSpaces(item.continent) && NotNullOrWhiteSpaces(item.country) && (
									<Text variant={'P9'} style={styles.subTitle}>
										{item.country + ', ' + item.continent}
									</Text>
								)}
								{NotNullOrWhiteSpaces(item.stateName) && NotNullOrWhiteSpaces(item.cityName) && (
									<Text variant={'P9'} style={styles.subTitle}>
										{item.cityName + ', ' + item.stateName}
									</Text>
								)}
								<Text style={styles.desc}>
									{Moment(item.fromDate, 'M/D/YYYY').format('D MMM YYYY')} -{' '}
									{Moment(item.toDate, 'M/D/YYYY').format('D MMM YYYY')}
								</Text>
								{NotNullOrWhiteSpaces(item.remarks) && (
									<View style={styles.tags}>
										<Text style={styles.tagsText}>{item.remarks}</Text>
									</View>
								)}
								{NotNullOrWhiteSpaces(item.otherRemarks) && (
									<Text style={{ ...styles.desc, marginTop: 5 }}>{item.otherRemarks}</Text>
								)}
							</View>
						)}
					/>
				) : (
					<View testID={'travel-declaration-empty-view'} style={styles.emptyViewContainer}>
						<Image source={CoverMaskIcon} style={styles.maskIcon} />
						<View style={styles.textContainer}>
							<Text style={styles.paragraph}>Please tell us the details of your Travel.</Text>
						</View>
						<TouchableOpacity style={styles.addIcon} onPress={handleNavigateToForm}>
							<Icon type="antdesign" name="plus" size="16" />
						</TouchableOpacity>
					</View>
				)}
			</View>
			{isLoading && <Loading />}
		</Screen>
	);
};
