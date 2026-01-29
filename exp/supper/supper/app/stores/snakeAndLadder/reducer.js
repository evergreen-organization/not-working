import { createSlice } from '@reduxjs/toolkit';
import { FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { REHYDRATE } from 'redux-persist';
import {
	campaignStatus,
	getCampaignId,
	initGame,
	leaderBoard,
	requestQuestion,
	submitAnswer,
	updatePosition,
} from './thunk';
import {
	allBoardSnakes,
	shuffleTypes,
} from 'screens/snakeAndLadder/mainScreen/snakeLadderScreen/conf';
import { gameUtils } from 'screens/snakeAndLadder/utils/gameUtils';

const initialState = {
	campaignId: null,
	playerPosition: null,
	diceCount: null,
	status: IDLE,
	tiles: [],
	campStatus: null,
	questionsList: [],
	questionStatus: IDLE,
	tileResult: null,
	completedBoards: [],
	selectedAvatar: null,
	myScore: null,
	playersScore: [],
	isMusicOn: true,
	isRetry: false,
	isFinished: false,
	currentPool: [],
	endDate: null,
	viewEndDate: null,
	todayDate: null,
	completedTiles: {},
	shownInfoMessages: [],
	serverPosition: null,
};

const slice = createSlice({
	name: 'snakeAndLadder',
	initialState,
	reducers: {
		resetPlayerPosition: () => initialState,
		setIsRetry: (state, { payload }) => {
			state.isRetry = payload;
		},
		setAvatar: (state, { payload }) => {
			state.selectedAvatar = payload;
		},
		setFinish: (state, { payload }) => {
			state.isFinished = payload;
		},
		setCurrentBoard: (state, { payload }) => {
			state.currentBoard = payload;
		},
		markBoardCompleted: (state, action) => {
			if (!state.completedBoards) {
				state.completedBoards = [];
			}
			state.completedBoards.push(action.payload);
		},

		setMiniGameResult: (state, { payload }) => {
			state.tileResult = payload;
		},
		clearMiniGameResult: (state) => {
			state.tileResult = null;
		},
		clearQuestionList: (state) => {
			state.questionsList = [];
		},

		playerPositionUpdated: (state, { payload }) => {
			state.playerPosition = payload;
		},

		diceCountUpdated: (state) => {
			if (state.diceCount <= 3) {
				state.diceCount -= 1;
			}
		},

		setTiles: (state, { payload }) => {
			state.tiles = payload;
		},
		setTileRetried: (state, { payload }) => {
			const { tileId } = payload;
			state.retriedTiles[tileId] = true;
		},

		resetTileRetried: (state) => {
			state.retriedTiles = {};
		},
		setMusicOn: (state, { payload }) => {
			state.isMusicOn = payload;
		},
		setCurrentPool: (state, { payload }) => {
			state.currentPool = payload;
		},
		popFromPool: (state) => {
			if (!state.currentPool || state.currentPool.length === 0) {
				state.currentPool = shuffleTypes();
			}
			return state.currentPool.pop();
		},
		markTileCompleted: (state, { payload }) => {
			const { tileId, passed, attempted } = payload;
			if (!state.completedTiles) {
				state.completedTiles = {};
			}
			state.completedTiles[tileId] = { passed, attempted };
		},
		resetCompletedTiles: (state) => {
			state.completedTiles = {};
		},
		addShownMessage: (state, { payload }) => {
			if (!state.shownInfoMessages.includes(payload)) {
				const newMessages = [...state.shownInfoMessages, payload];
				state.shownInfoMessages = newMessages;
			}
		},

		resetShownMessages: (state) => {
			state.shownInfoMessages = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.snakeAndLadder !== undefined) {
				return {
					...payload.snakeAndLadder,
					completedBoards: payload.snakeAndLadder.completedBoards || [],
				};
			}
		});
		//NEW APIS
		builder.addCase(campaignStatus.rejected, (state) => {
			state.status = FAIL;
		});
		builder.addCase(campaignStatus.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(campaignStatus.fulfilled, (state, { payload, meta }) => {
			state.status = SUCCESS;
			state.campStatus = payload.data.isStarted;
		});
		builder.addCase(requestQuestion.pending, (state) => {
			state.questionStatus = LOADING;
		});
		builder.addCase(requestQuestion.fulfilled, (state, { payload }) => {
			state.questionsList = payload;
			state.questionStatus = SUCCESS;
		});
		builder.addCase(requestQuestion.rejected, (state) => {
			state.questionStatus = FAIL;
		});
		builder.addCase(submitAnswer.pending, (state) => {
			state.questionStatus = LOADING;
		});
		builder.addCase(submitAnswer.fulfilled, (state) => {
			state.questionStatus = SUCCESS;
		});
		builder.addCase(submitAnswer.rejected, (state) => {
			state.questionStatus = FAIL;
		});
		builder.addCase(initGame.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(initGame.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.diceCount = payload.data.coins;

			state.serverPosition = payload.data.playerPosition;

			let position = payload.data.playerPosition;
			const { boardNo, tileNo } = gameUtils().getBoardPosition(position);
			const boardTiles = allBoardSnakes[boardNo];

			const toTile = boardTiles[String(tileNo)];

			if (toTile && Number(toTile) < tileNo) {
				const completion = state.completedTiles?.[tileNo];
				console.log('[INIT_GAME] Snake detected from tile', tileNo, 'to', toTile);

				if (!completion) {
					console.log('[INIT_GAME] No completion data found — moving player DOWN.');
				} else if (!completion.passed) {
					console.log('[INIT_GAME] Mini-game was attempted and FAILED — moving player DOWN.');
				} else {
					console.log('[INIT_GAME] Mini-game was PASSED — player stays.');
				}

				if (!completion || !completion.passed) {
					position = gameUtils().getPlayerPosition({ boardNo, tileNo: Number(toTile) });
				}
			} else {
				console.log('[INIT_GAME] Tile is not a snake head or no movement needed.');
			}

			state.playerPosition = position;
		});

		builder.addCase(initGame.rejected, (state) => {
			state.status = FAIL;
		});
		builder.addCase(updatePosition.pending, (state) => {
			state.status = LOADING;
		});

		builder.addCase(updatePosition.fulfilled, (state, { meta, payload }) => {
			state.status = SUCCESS;
			state.diceCount = state.diceCount - meta.arg.coins;
			state.playerPosition = meta.arg.playerPosition;
		});

		builder.addCase(updatePosition.rejected, (state) => {
			state.status = FAIL;
		});
		builder.addCase(leaderBoard.rejected, (state) => {
			state.status = FAIL;
		});
		builder.addCase(leaderBoard.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(leaderBoard.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;
			state.myScore = payload.data.myScore;
			state.playersScore = payload.data.playersScore;
		});
		builder.addCase(getCampaignId.pending, (state) => {
			state.status = LOADING;
		});
		builder.addCase(getCampaignId.fulfilled, (state, { payload }) => {
			state.status = SUCCESS;

			const campaigns = payload.data ?? [];
			let activeCampaign = null;

			function toISOFormat(dateStr) {
				if (!dateStr) {
					return null;
				}
				const [datePart, timePart] = dateStr.split(' ');
				const [month, day, year] = datePart.split('/');
				return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}`;
			}

			for (const campaign of campaigns) {
				const today = new Date(toISOFormat(campaign.todayDate));
				const startDate = new Date(toISOFormat(campaign.startDate));
				const viewEndDate = new Date(toISOFormat(campaign.viewEndDate));

				if (startDate <= today && today <= viewEndDate) {
					activeCampaign = campaign;
					break;
				}
			}
			if (activeCampaign) {
				const campaignLastDay = activeCampaign.viewEndDate;
				state.campaignId = activeCampaign.campaignId;
				state.todayDate = toISOFormat(activeCampaign.todayDate);
				state.endDate = toISOFormat(activeCampaign.endDate);
				state.viewEndDate = campaignLastDay ? campaignLastDay.split(' ')[0] : null;
			} else {
				state.campaignId = null;
				state.todayDate = null;
				state.endDate = null;
				state.viewEndDate = null;
			}
		});
		builder.addCase(getCampaignId.rejected, (state) => {
			state.status = FAIL;
		});
	},
});

export const {
	resetPlayerPosition,
	playerPositionUpdated,
	diceCountUpdated,
	setTiles,
	setTileRetried,
	resetTileRetried,
	setMiniGameResult,
	clearMiniGameResult,
	setCurrentBoard,
	markBoardCompleted,
	setAvatar,
	setMusicOn,
	setIsRetry,
	setFinish,
	setCurrentPool,
	popFromPool,
	markTileCompleted,
	resetCompletedTiles,
	addShownMessage,
	resetShownMessages,
	clearQuestionList,
} = slice.actions;

export default slice.reducer;
