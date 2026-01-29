import React, { useEffect, useState } from 'react';
import { Animated, Image, RefreshControl, ScrollView, View } from 'react-native';
import LawIcon from 'assets/icon/regulations.png';
import { RegulationCard } from '../components/regulationCard';
import { styles } from './styles';
import { Typography } from 'styles';
import { Header } from 'molecules';
import { Loading, Screen, Text } from 'atoms';

export const RegulationView = ({
	loading,
	onRegulationSelect,
	regulationList,
	getRegulation,
	fail,
	navigation,
}) => {
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

	const [refreshing] = useState(false);
	const [opacityValue] = useState(new Animated.Value(0));

	useEffect(() => {
		opacityValue.setValue(0);
		Animated.timing(opacityValue, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [regulationList]);

	const renderRegulation = () => {
		if (regulationList?.length === 0) {
			return (
				<View style={styles.noticeContainer}>
					<View style={styles.imageContainer}>
						<Image source={LawIcon} style={styles.image} />
					</View>
					<Text style={styles.notice}>No Regulations</Text>
				</View>
			);
		}

		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={getRegulation} tintColor={'#818181'} />
				}
			>
				{fail ? (
					<View style={styles.regulationFailedContainer}>
						<Text style={styles.failText}>Failed to fetch data</Text>
					</View>
				) : (
					<Animated.View style={{ ...styles.container, opacity: opacityValue }}>
						{regulationList?.map((regulation, index) => (
							<RegulationCard
								key={regulation.circularName}
								regulation={regulation}
								onPress={onRegulationSelect}
							/>
						))}
					</Animated.View>
				)}
			</ScrollView>
		);
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Regulations',
					style: Typography.H6,
				}}
			/>
			<View style={[styles.contentContainer]}>{loading ? <Loading /> : renderRegulation()}</View>
		</Screen>
	);
};
