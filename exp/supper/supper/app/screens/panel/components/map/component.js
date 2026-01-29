import React, { forwardRef } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { View } from 'react-native';

import { Text } from 'atoms';

import { styles } from './styles';
export const PanelMapComp = (
	{ region, currentCoordinate, selectedPanel, onMapPress, onMarkerPress },
	ref,
) => {
	const { map, panelsRef } = ref;
	return (
		<MapView
			showsCompass={false}
			legalLabelInsets={{ right: -100 }}
			onPress={onMapPress}
			ref={map}
			initialRegion={region}
			style={styles.container}
		>
			{currentCoordinate !== undefined && (
				<Marker coordinate={currentCoordinate} anchor={{ x: 0.5, y: 1 }}>
					<View style={styles.ownMarkerWrap}>
						<View style={styles.marker} />
					</View>
				</Marker>
			)}
			{selectedPanel.map((marker, index) => {
				let coordinate = {
					latitude: marker.lat,
					longitude: marker.long,
				};

				return (
					<Marker
						key={marker.code}
						ref={panelsRef.current[index]}
						coordinate={coordinate}
						anchor={{ x: 0.5, y: 1 }}
						onPress={() => onMarkerPress(index)}
					>
						<Callout tooltip={true} style={{ maxWidth: 150 }}>
							<Text variant={'P5'} numberOfLines={1}>
								{marker.name}
							</Text>
						</Callout>
					</Marker>
				);
			})}
		</MapView>
	);
};

export default forwardRef(PanelMapComp);
