import { BackgroundImage } from 'assets/festive/eCards/eFestiveCard';
import { colors } from 'configs';
import { Header } from 'molecules';
import React, { forwardRef } from 'react';
import { Image, ImageBackground, ScrollView, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, Typography } from 'styles';
import { Thumbnail } from './components';
import { styles } from './styles';
import { TEMPLATE_LIST_BY_TYPE } from './utils';

const PhotoWallGalleryViewScreen = ({ handleNavigation, handleHeaderLeftBtn }, ref) => {
	return (
		<ImageBackground source={BackgroundImage} style={[commonStyles.fill]}>
			<SafeAreaView style={[commonStyles.fill]} edges={['top']}>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						style: { color: colors.secondary },
						onPress: handleHeaderLeftBtn,
					}}
					centerComponent={{
						text: 'eFestive Cards',
						style: [Typography.H6],
					}}
				/>
				<ScrollView
					ref={ref}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={[{ paddingBottom: 40 }]}>
					{TEMPLATE_LIST_BY_TYPE.map((item) => {
						return (
							<View key={item.title} style={styles.container}>
								<Animated.View entering={FadeInRight.delay(100)}>
									<Image source={item.titleImage} style={styles.titleImage} />
								</Animated.View>
								<ScrollView
									horizontal
									showsHorizontalScrollIndicator={false}
									contentContainerStyle={{ paddingRight: 24 }}>
									{item.data.map((data, index) => (
										<Thumbnail key={data.id} onPress={handleNavigation} data={data} index={index} />
									))}
								</ScrollView>
							</View>
						);
					})}
				</ScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default forwardRef(PhotoWallGalleryViewScreen);
