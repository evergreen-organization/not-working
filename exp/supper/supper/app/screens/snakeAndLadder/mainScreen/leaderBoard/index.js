import React, { useEffect } from 'react';
import { LeaderBoardComp } from './component';
import { useDispatch, useSelector } from 'react-redux';
import { getGame, leaderBoard } from 'stores';
import { PBDASH_SOUND, playSoundEffect } from 'screens/snakeAndLadder/sound';

export const LeaderBoard = ({ navigation }) => {
	const dispatch = useDispatch();
	const { playersScore, myScore, campaignId, status } = useSelector(getGame);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		(async () => {
			await dispatch(leaderBoard({ campaignId }));
		})();
	}, []);
	const handleGoBack = () => {
		playSoundEffect(PBDASH_SOUND.BTN_CLICKED.audio);

		navigation.goBack();
	};

	const props = {
		handleGoBack,
		playersScore,
		myScore,
		user,
		status,
	};

	return <LeaderBoardComp {...props} />;
};
