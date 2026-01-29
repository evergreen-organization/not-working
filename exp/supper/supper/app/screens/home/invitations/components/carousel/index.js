import React, { forwardRef } from 'react';
import { FlatList, Image, View } from 'react-native';
import Moment from 'moment';

import BirthdayIcon from 'assets/icon/cake.png';
import EatIcon from 'assets/icon/eat.png';
import ChatIcon from 'assets/icon/chat.png';
import { Card, Text } from 'atoms';

import { EVENT_CATEGORY } from '../../constant';
import { styles } from './styles';

const getIcon = (type) => {
	if (type === EVENT_CATEGORY.DINNER) {
		return EatIcon;
	}
	if (type === EVENT_CATEGORY.BIRTHDAY) {
		return BirthdayIcon;
	}
	return ChatIcon;
};

export const InvitationsCarousel = ({ data }, ref) => {
	const { carouselRef, viewableItemsChanged } = ref;

	const renderItem = ({ item }) => {
		return (
			<View style={styles.container}>
				<Card>
					<Card.Title
						left={
							<View style={styles.date}>
								<View style={styles.line} />
								<View style={styles.dateContainer}>
									<Text style={styles.dateday}>{Moment(item.eventDateTime).format('ddd')}</Text>
									<Text variant={'H4'}>{Moment(item.eventDateTime).format('DD')}</Text>
									<Text variant={'P5'} style={styles.month}>
										{Moment(item.eventDateTime).format('MMM')}
									</Text>
								</View>
							</View>
						}
						right={
							<View style={styles.image}>
								<Image source={getIcon(item.eventType)} style={styles.icon} />
							</View>
						}
						title={item.eventName}
						titleTypography={'P4'}
						subtitle={item.eventType}
						subtitleStyle={styles.details}
						subtitleTypography={'P10'}
					>
						<Text variant={'P10'} style={styles.details}>
							{Moment(item.eventDateTime).format('h:mm a')}
						</Text>
						<Text variant={'P10'} style={styles.details}>
							{item.totalParticipants + ' going'}
						</Text>
					</Card.Title>
				</Card>
			</View>
		);
	};

	return (
		<FlatList
			ref={carouselRef}
			data={data}
			renderItem={renderItem}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			onViewableItemsChanged={viewableItemsChanged}
		/>
	);
};

export default forwardRef(InvitationsCarousel);
