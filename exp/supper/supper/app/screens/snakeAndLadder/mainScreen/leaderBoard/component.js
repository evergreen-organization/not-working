import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Background from '../../assets/leaderBoard/bg-leaderboard.png';

import { Loading, Space, Text } from 'atoms';
import BackButton from '../../assets/leaderBoard/btn-back-leaderboard.png';
import ButtonPlayer from '../../assets/leaderBoard/v_button.png';

import { styles } from './styles';
import { LOADING } from 'constant';

export const LeaderBoardComp = ({
	handleGoBack,
	playersScore = [],
	myScore = {},
	user,
	status,
}) => {
	const insets = useSafeAreaInsets();

	const getBackgroundColor = (rank) => {
		switch (rank) {
			case 1:
				return '#FFD700'; // Gold
			case 2:
				return '#C0C0C0'; // Silver
			case 3:
				return '#CD7F32'; // Bronze
			default:
				return '#00BCD4'; // Cyan
		}
	};

	const renderRankingBox = (item, isMine = false) => {
		const backgroundColor = isMine ? '#FF69B4' : getBackgroundColor(item.ranking);

		return (
			<View style={[styles.rankingView, { backgroundColor }]}>
				<View style={styles.rankView}>
					<Text as={Text.type.P2} style={styles.numberText}>
						{item.ranking}.
					</Text>
					<Text bold as={Text.type.P2} style={styles.nameText}>
						{isMine ? user?.name : item.name}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<>
			<Image source={Background} style={styles.background} />

			<View style={styles.header}>
				<FlatList
					data={playersScore}
					renderItem={({ item }) => renderRankingBox(item)}
					keyExtractor={(item) => item.id.toString()}
					style={styles.list}
					ListFooterComponent={<Space height={10} />}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			<View style={[styles.myScoreHeader, { bottom: insets.bottom }]}>
				{myScore?.ranking && (
					<View style={{ alignItems: 'center', marginBottom: 8 }}>
						<Image source={ButtonPlayer} style={styles.vBtn} />
					</View>
				)}

				{myScore?.ranking && renderRankingBox(myScore, true)}

				<View style={styles.disclaimerWrapper}>
					<Text style={styles.disclaimer}>
						Disclaimer:{'\n'}The leaderboard reflects ongoing gameplay and is not the final result
					</Text>
				</View>
			</View>

			<TouchableOpacity
				onPress={handleGoBack}
				activeOpacity={0.7}
				style={[styles.btnGoBack, { top: insets.top + 10 }]}
			>
				<Image source={BackButton} style={styles.btnGoBackImg} />
			</TouchableOpacity>
			{status === LOADING && <Loading preset={'blurFullScreen'} />}
		</>
	);
};
