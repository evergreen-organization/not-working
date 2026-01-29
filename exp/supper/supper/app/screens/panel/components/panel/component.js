import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text, Icon } from 'atoms';

import { styles } from './styles';

export const PanelComp = ({ handleCall, handleOpenOnMap, panelLength, marker, index }) => {
	let number = 0;
	const markersLastIndex = panelLength.length - 1;
	if (markersLastIndex === index) {
		number = 30;
	}

	return (
		<View key={marker.code} style={[styles.card, { marginRight: number }]}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<View style={{ flex: 1 }}>
					<Text variant={'P4'} style={styles.cardtitle}>
						{marker.name}
					</Text>
					<View style={{ paddingTop: 10 }}>
						<Text variant={'P3'} style={styles.cardDescription}>
							{marker.addr}
						</Text>
					</View>
				</View>
				<View style={{ paddingTop: 10, paddingLeft: 10 }}>
					<Text style={styles.cardDistance}> {marker.distance}</Text>
					<Text variant={'P3'} style={styles.cardKm}>
						km
					</Text>
				</View>
			</View>
			<View style={styles.section}>
				<View style={{ flex: 1 }}>
					<Text style={styles.cardDescription}>{marker.hour}</Text>
					<Text style={styles.cardDescription}>{marker.tel}</Text>
				</View>
				<TouchableOpacity style={styles.cardButton} onPress={handleCall} activeOpacity={0.8}>
					<Icon type={'ionicon'} name={'ios-call'} style={styles.cardButtonIcon} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.cardButton} onPress={handleOpenOnMap} activeOpacity={0.8}>
					<Icon type={'font-awesome'} name={'location-arrow'} style={styles.cardButtonIcon} />
				</TouchableOpacity>
			</View>
		</View>
	);
};
