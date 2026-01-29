import React, { useMemo } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { Card, Shadow, Space, Text } from 'atoms';
import PresentsIcon from 'assets/icon/presents.png';
import { styles } from './styles';
import { showFestive } from 'constant';
import { AnimatedScaleView } from 'molecules';

export const PromotionWidgetView = ({ handlePromotionItem, promos, reachEnd, loading }) => {
	const renderEmptyPromotion = useMemo(() => (
		<View style={styles.noticeContainer}>
			<View style={styles.imageContainer}>
				<Image source={PresentsIcon} style={styles.image} />
			</View>
			<Text variant={'P3'} style={styles.notice}>
				No Promotions
			</Text>
		</View>
	));

	const renderPromotionItem = () =>
		promos?.map((promo) => (
			<View key={promo.key} style={styles.promotionRows}>
				{promo.value.map(({ id, iconUrl, title, description }, index) => (
					<Shadow style={styles.promotionItem}>
						<AnimatedScaleView onPress={(e) => handlePromotionItem(e, id)} key={id}>
							<Card key={id} testID={`promotion-widget-${index}`}>
								<Card.Image source={{ uri: `${iconUrl}` }} style={styles.promoImage} />
								<Card.Title
									title={title}
									titleTypography={'P9'}
									titleNumberOfLines={2}
									titleStyle={styles.promoTitle}
									subtitle={description}
									subtitleNumberOfLines={2}
									subtitleTypography={'P10'}
									subtitleStyle={styles.promoDesc}
									style={styles.promotionTitleContainer}
								/>
							</Card>
						</AnimatedScaleView>
					</Shadow>
				))}
			</View>
		));

	return (
		<View style={[showFestive && styles.festiveContainer]}>
			<View style={styles.container}>
				<Text bold style={styles.promoText}>
					Promotions
				</Text>
			</View>

			<View>
				<Space height={10} />
				{promos?.length === 0 ? renderEmptyPromotion : renderPromotionItem()}
				{reachEnd ?? <Text style={styles.reachEnd}>End of list</Text>}
				{loading && <ActivityIndicator />}
			</View>
		</View>
	);
};
