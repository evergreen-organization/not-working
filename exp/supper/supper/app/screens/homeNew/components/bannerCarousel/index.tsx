import { Paginator } from 'molecules';
import React, { memo } from 'react';
import { FlatList } from 'react-native';
import useBannerCarousel from 'screens/homeNew/hooks/useBannerCarousel';
import BannerItem from '../bannerItem';
import BannerPopUp from '../bannerPopup';
import styles from './styles';
import { IItem } from './types';

export const BannerCarousel = memo(() => {
	const {
		scrollX,
		flatListRef,
		onScroll,
		onScrollBeginDrag,
		onMomentumScrollEnd,
		onScrollEndDrag,
		modalType,
		setModalType,
		width,
		onScrollToIndexFailed,
		bannerData,
	} = useBannerCarousel();

	const renderItem = ({ item }: { item: IItem }) => {
		return <BannerItem item={item} setModalType={setModalType} />;
	};

	return (
		<>
			<FlatList
				data={bannerData as IItem[]}
				renderItem={renderItem}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.container}
				onScroll={onScroll}
				scrollEventThrottle={32}
				ref={flatListRef}
				onScrollBeginDrag={onScrollBeginDrag}
				onMomentumScrollEnd={onMomentumScrollEnd}
				onScrollEndDrag={onScrollEndDrag}
				onScrollToIndexFailed={onScrollToIndexFailed}
			/>
			<Paginator
				data={bannerData}
				scrollX={scrollX}
				dotStyle={styles.dotStyle}
				widthRatio={(width - 70) / width}
			/>
			<BannerPopUp modalType={modalType} setModalType={setModalType} />
		</>
	);
});
