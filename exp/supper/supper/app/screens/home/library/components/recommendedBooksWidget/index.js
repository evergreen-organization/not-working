import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { Icon, Text } from 'atoms';

import LoadingLottie from 'assets/lottie/greeking3.json';
import { styles } from './styles';

export const RecommendedBooksWidget = ({ recommendedBooks, onPress, loadingBooks }) => {
	return (
		<View style={styles.recommendedSection}>
			<View style={styles.headerContainer}>
				<View style={styles.headerTextContainer}>
					<Text variant={'P2'}>Recommended Books</Text>
					<Text variant={'P8'} style={styles.subheading}>
						(Available at Main Library)
					</Text>
				</View>
				<TouchableOpacity style={styles.headerIconContainer} onPress={onPress}>
					<Icon type="entypo" name="chevron-thin-right" style={styles.headerIcon} />
				</TouchableOpacity>
			</View>

			{loadingBooks || recommendedBooks.length === 0 ? (
				<View style={styles.bookShelf}>
					<LottieView style={{ height: 170 }} source={LoadingLottie} autoPlay loop />
				</View>
			) : (
				<ScrollView
					testID={'recommendedBookShelf-scroll-view'}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.bookShelf}
				>
					{recommendedBooks.map(
						({ recommended, url, isbn }, index) =>
							recommended &&
							index < 5 && (
								<View key={isbn} style={styles.bookCoverContainer}>
									<Image source={{ uri: url }} style={styles.bookCover} resizeMode={'contain'} />
								</View>
							),
					)}
					{recommendedBooks.length >= 5 && (
						<TouchableOpacity
							testID={'recommended-see-more'}
							style={styles.seeMoreButtonContainer}
							onPress={onPress}
						>
							<Icon type="antdesign" name="rightcircle" style={styles.seeMoreIcon} />
							<Text variant={'P5'} style={styles.seeMoreText}>
								See More
							</Text>
						</TouchableOpacity>
					)}
				</ScrollView>
			)}
		</View>
	);
};
