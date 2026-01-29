import React, { forwardRef } from 'react';
import { Animated, Linking, View } from 'react-native';
import { Callout } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from 'atoms';
import { BottomModal } from 'molecules';
import backIcon from 'assets/icon/back.png';
import { Panel, PanelSearchResultList, SearchBar } from './components';
import PanelMap from './components/map';
import PanelList from './components/panelList';
import { styles } from './styles';

export const PanelClinicsComp = (
	{
		handleSearchPanelSelected,
		handleSearchPlacesSelected,
		handleScroll,
		handleSelectNavigation,
		handleMapNavigation,
		handleSearchTextChange,
		handleSearchOnFocus,
		handleMapOnPress,
		handleMarkerPress,
		handleBackPressed,
		handleCloseWazeModal,
		myRegion,
		myCoordinate,
		selectedPanel,
		focusedPanel,
		userInput,
		searchOptionVisible,
		result,
		wazeUrl,
		isModalVisible,
	},
	ref,
) => {
	const { map, scrollView, animation } = ref;
	const insets = useSafeAreaInsets();
	return (
		<View style={styles.container}>
			<PanelMap
				ref={map}
				region={myRegion}
				currentCoordinate={myCoordinate}
				selectedPanel={selectedPanel}
				focusedPanel={focusedPanel}
				onMapPress={handleMapOnPress}
				onMarkerPress={handleMarkerPress}
			/>
			<Callout style={styles.calloutContainer}>
				<View style={[styles.statusBarBackground, { height: insets.top }]} />
				<View style={styles.mapTopBar}>
					<Button preset={'text'} leftIcon={backIcon} onPress={handleBackPressed} />
					<SearchBar
						userInput={userInput}
						onChangeText={(text) => handleSearchTextChange(text)}
						searchOnFocus={(text) => handleSearchOnFocus(text)}
					/>
				</View>
				{userInput !== '' && searchOptionVisible === true && (
					<PanelSearchResultList
						result={result}
						onPlaceSelected={(data) => handleSearchPlacesSelected(data)}
						onPanelSelected={handleSearchPanelSelected}
					/>
				)}
			</Callout>
			<PanelList
				ref={scrollView}
				onMomentumScrollEnd={Animated.event(
					[{ nativeEvent: { contentOffset: { x: animation.current } } }],
					{ useNativeDriver: true, listener: (event) => handleScroll(event) },
				)}
			>
				{selectedPanel?.length > 0 &&
					selectedPanel?.map((marker, index) => (
						<Panel
							key={marker.code}
							panelLength={selectedPanel.length}
							marker={marker}
							index={index}
							onCall={(tel) => Linking.openURL(tel)}
							onOpenOnMap={handleSelectNavigation}
						/>
					))}
			</PanelList>

			<BottomModal isVisible={isModalVisible} onCancel={handleCloseWazeModal} fullHeight>
				<WebView bounces={false} source={{ uri: wazeUrl }} useWebKit={true} />
			</BottomModal>
		</View>
	);
};

export default forwardRef(PanelClinicsComp);
