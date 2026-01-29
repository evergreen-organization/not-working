import React, { forwardRef } from 'react';
import { Image, ScrollView, useWindowDimensions, View } from 'react-native';
import { HyperLinkText, Loading, Screen, Text } from 'atoms';
import { Header, ImageSlides, ListItem } from 'molecules';
import { PdfModal } from 'organisms';
import { LOADING } from 'constant';
import DocumentIcon from 'assets/icon/document.png';
import { displayPromoDate } from '../utils/utils';
import { styles } from './styles';
import { navigate } from 'navigations/RootNavigation';
import { routes } from 'navigations';

const PromotionDetailsView = (
	{
		handleOpenModalPDF,
		handleClosePdfModal,
		handleOpenUrl,
		promotionDetails,
		status,
		source,
		isModalVisible,
	},
	ref,
) => {
	const { height } = useWindowDimensions();
	const {
		title,
		description,
		descriptions: othersDescription,
		others,
		images: promotionImages,
	} = promotionDetails || {};

	const onPressImage = (index) => {
		navigate(routes.IMAGE_VIEW, { index, data: promotionImages });
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Promotions',
				}}
			/>
			<View style={styles.flex}>
				{status === LOADING ? (
					<Loading />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						{/*Images Slides*/}
						{promotionImages?.length > 0 && (
							<View
								style={{
									height: height * 0.45 > 350 ? 350 : height * 0.45,
								}}
							>
								<ImageSlides ref={ref} data={promotionImages} onPress={onPressImage} />
							</View>
						)}

						{/*Promotion Details*/}
						<View testID={'promotion-details-view'} style={styles.container}>
							<Text variant={'P2'} style={styles.topic}>
								{title}
							</Text>
							<Text variant={'P6'} style={styles.desc}>
								{description}
							</Text>
							<Text variant={'P6'} style={styles.desc}>
								{displayPromoDate({ promotionDetails })}
							</Text>
							{othersDescription?.map((item) => (
								<HyperLinkText key={item} text={item} onPress={(url) => handleOpenUrl(url)} />
							))}

							{/*Promotion Attachment*/}
							{others?.length > 0 && (
								<>
									<Text variant={'P7'} style={styles.title}>
										Attachment
									</Text>
									{others.map(({ title, docUrl }) => (
										<ListItem
											key={title}
											title={title}
											containerStyle={styles.list}
											titleTypography={'P6'}
											RightComponent={<Image source={DocumentIcon} style={styles.icon} />}
											onPress={() => handleOpenModalPDF(docUrl)}
											bottomSeparator={false}
										/>
									))}
								</>
							)}
						</View>
					</ScrollView>
				)}
			</View>

			<PdfModal source={source} isVisible={isModalVisible} closeModal={handleClosePdfModal} />
		</Screen>
	);
};

export default forwardRef(PromotionDetailsView);
