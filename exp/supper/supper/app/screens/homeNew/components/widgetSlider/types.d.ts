import { RefObject } from 'react';
import { FlatList } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export interface IProps {
	handleScroll: (...args: any[]) => void;
	flatListRef: RefObject<FlatList<any>>;
	viewabilityConfig: {
		itemVisiblePercentThreshold: number;
	};
	onViewableItemsChanged: ({ viewableItems }: { viewableItems: any[] }) => void;
	scrollX: SharedValue<number>;
}
