import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Icon, Text } from 'atoms';

import { styles } from './styles';
import { CLINIC_SEARCH_TYPE } from '../../constant';

export const PanelSearchResultList = ({ result, onPlaceSelected, onPanelSelected }) => {
	const renderSearchResult = ({ searchType, data }) => {
		if (searchType === CLINIC_SEARCH_TYPE.NAME) {
			return <ClinicNameResultView key={data.code} data={data} onPanelSelected={onPanelSelected} />;
		}
		if (searchType === CLINIC_SEARCH_TYPE.AREA) {
			return <ClinicAreaView key={data.key} data={data} onPlaceSelected={onPlaceSelected} />;
		}
		return <ClinicStateView key={data.value} data={data} onPlaceSelected={onPlaceSelected} />;
	};

	return (
		<ScrollView style={styles.resultContainer} keyboardShouldPersistTaps={'handled'}>
			{result.length !== 0 ? (
				result.map((data, index) => renderSearchResult({ searchType: data.type, data }))
			) : (
				<EmptyView />
			)}
		</ScrollView>
	);
};

const EmptyView = () => (
	<View style={styles.noResultView}>
		<Text style={styles.noResult}>No result found</Text>
	</View>
);

const ClinicNameResultView = ({ onPanelSelected, data }) => (
	<TouchableOpacity style={styles.resultButton} onPress={() => onPanelSelected(data)}>
		<View style={{ justifyContent: 'center' }}>
			<Icon type={'material-community'} name={'hospital-marker'} style={styles.resultIcon} />
		</View>
		<View style={styles.searchTextView}>
			<Text variant={'P4'} style={styles.searchData} numberOfLines={1}>
				{data.name}
			</Text>
			<Text variant={'P3'} style={styles.searchDescription} numberOfLines={1}>
				{data.addr}
			</Text>
		</View>
		<View style={styles.searchDistanceView}>
			<Text variant={'P6'} style={styles.distance}>
				{data.distance}
			</Text>
			<Text variant={'P8'} style={styles.kmAway}>
				km away
			</Text>
		</View>
	</TouchableOpacity>
);

const ClinicAreaView = ({ onPlaceSelected, data }) => (
	<TouchableOpacity style={styles.resultButton} onPress={() => onPlaceSelected(data)}>
		<View style={{ justifyContent: 'center' }}>
			<Icon type={'entypo'} name={'location-pin'} style={styles.resultIcon} />
		</View>
		<View style={styles.searchTextView}>
			<Text variant={'P4'} style={styles.searchData} numberOfLines={1}>
				{data.value}
			</Text>
			<Text variant={'P3'} style={styles.searchDescription} numberOfLines={1}>
				{data.subValue}
			</Text>
		</View>
	</TouchableOpacity>
);

const ClinicStateView = ({ onPlaceSelected, data }) => (
	<TouchableOpacity style={styles.resultButton} onPress={() => onPlaceSelected(data)}>
		<View style={{ justifyContent: 'center' }}>
			<Icon type={'entypo'} name={'location-pin'} style={styles.resultIcon} />
		</View>
		<View style={styles.searchTextView}>
			<Text variant={'P4'} style={styles.searchData} numberOfLines={1}>
				{data.value}
			</Text>
		</View>
	</TouchableOpacity>
);
