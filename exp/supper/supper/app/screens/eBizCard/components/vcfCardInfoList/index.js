import React from 'react';
import { View, FlatList, Image } from 'react-native';

import { Text } from 'atoms';

import { styles } from './styles';

import InfoIcon from '../../../../assets/eBizCard/infoIcon.png';
import { HIDDEN_FIELDS } from 'screens/eBizCard/constant/constant';
import { colors } from 'configs';
export const VCFCardInfoListView = ({ cardData }) => {
	const renderItem = ({ item }) => {
		let fieldItem = HIDDEN_FIELDS.some((fItem) => fItem === item.key);

		if (!fieldItem && item.value && item?.isVisible) {
			return (
				<View key={item.label} style={styles.detailView}>
					<Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.label}</Text>
					<Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>{item.value}</Text>
				</View>
			);
		} else {
			return <></>;
		}
	};

	return (
		<View style={styles.container}>
			<View style={[styles.dropdown]}>
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
					<Image
						source={InfoIcon}
						style={{ width: 24, aspectRatio: 1, tintColor: colors.primary }}
					/>

					<Text style={styles.title}>Contact Information</Text>
				</View>

				<View>
					<FlatList
						showsVerticalScrollIndicator={false}
						scrollEnabled={false}
						data={cardData}
						renderItem={renderItem}
						style={styles.listContainer}
					/>
				</View>
			</View>
		</View>
	);
};
