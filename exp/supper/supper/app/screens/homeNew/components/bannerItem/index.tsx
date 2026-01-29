import { Shadow } from 'atoms';
import { isIos, showNewYearMessage } from 'constant';
import { AnimatedScaleView } from 'molecules';
import React, { Fragment, useMemo } from 'react';
import { Image, Linking, useWindowDimensions } from 'react-native';
import Video from 'react-native-video';
import { IItem, TModal } from '../bannerCarousel/types';
import styles from './styles';
import { navigate } from 'navigations/RootNavigation';
import { routes } from 'navigations';
import { useIsFocused } from '@react-navigation/native';

const BannerItem = ({
	item,
	setModalType,
}: {
	item: IItem;
	setModalType: (value: null | TModal) => void;
}) => {
	const { width } = useWindowDimensions();
	const Wrapper = useMemo(() => (isIos ? Shadow : Fragment), []);
	const isFocused = useIsFocused();

	const onPressBanner = () => {
		switch (item?.id) {
			case '1':
				if (showNewYearMessage) {
					setModalType({ type: 'PDF', pdfUrl: item?.pdfUrl });
				}
				break;
			case '5':
				setModalType({ type: 'PDF', pdfUrl: item?.pdfUrl });
				break;
			case '2':
				Linking.openURL(
					'https://www.lonpac.com/staff/pbb?utm_source=App&utm_medium=Banner&utm_campaign=PBB-Staff_202501_Insurance+&utm_id=PBB+Staff+',
				);
				break;
			case '6':
				Linking.openURL(
					'https://www.pbebank.com/en/promotions/latest-promotions/pb-60th-diamond-jubilee-celebration-campaign',
				);
				break;
			case '3':
				navigate(routes.PHOTO_WALL_GALLERY_VIEW);
				break;
			case '4':
				setModalType({ type: 'WIDGET' });
				break;
			default:
				break;
		}
	};

	return (
		<AnimatedScaleView onPress={onPressBanner}>
			<Wrapper>
				{item.type === 'video' ? (
					<Video
						playInBackground
						repeat
						muted
						source={item.banner}
						resizeMode="cover"
						paused={!isFocused}
						style={[
							styles.bannerItem,
							{
								width: width - 70,
							},
						]}
					/>
				) : (
					<Image
						source={item.banner}
						style={[styles.bannerItem, { width: width - 70 }]}
						resizeMode="cover"
					/>
				)}
			</Wrapper>
		</AnimatedScaleView>
	);
};

export default BannerItem;
