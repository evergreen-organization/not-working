import { useDispatch, useSelector } from 'react-redux';
import { getGame, playerPositionUpdated, submitAnswer, updatePosition } from 'stores';
import { GAME_STATUS } from '../../snakeAndLadder/constant/constant';

export const useGameApi = () => {
	const dispatch = useDispatch();
	const { campaignId } = useSelector(getGame);

	const endGame = async ({ isWin, campaignId, gameType, questionSession, answers }) => {
		const { payload } = await dispatch(
			submitAnswer({
				campaignId: campaignId,
				gameType: gameType,
				gameStatus: isWin ? GAME_STATUS.PASSED : GAME_STATUS.FAILED,
				questionSession: questionSession,
				answers: answers,
			}),
		);
		if (payload.ok) {
			return { ok: true };
		}
		return { ok: false, error: payload.problem };
	};

	const updatePlayerPosition = (playerPosition, coin = 0) => {
		// dispatch(playerPositionUpdated(playerPosition));
		dispatch(
			updatePosition({
				campaignId: campaignId,
				coins: coin,
				playerPosition,
			}),
		);
	};

	return {
		updatePlayerPosition,
		endGame,
	};
};
