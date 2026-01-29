import { createSlice } from '@reduxjs/toolkit';
import { FAIL, LOADING, SUCCESS } from 'constant';
import moment from 'moment';
import {
	createTag,
	deleteTags,
	fetchDataApproval,
	fetchDataChanges,
	fetchEbizData,
	fetchEbizFields,
	fetchEbizPreviewData,
	fetchProfileImage,
	fetchTags,
	renewTags,
	updateEbizFields,
} from './thunk';
import { storeEbizCardInSharedStorage } from 'screens/eBizCard/utils/utils';

const initialState = {
	eBizData: [],
	dataChanges: {},
	dataApproval: [],
	changedData: [],
	proifleImg: '',
	allTags: [],
	cardImage: '',
	fields: [],
	loadingEbizData: LOADING,
	previewData: [],
	previewLoading: true,
};

const slice = createSlice({
	name: 'eBizCard',
	initialState,
	reducers: {
		eBizCardReset: (_) => initialState,
		setChangeData: (state, { payload }) => {
			const index = state.dataApproval.findIndex((sItem) => {
				return sItem.id === '3';
			});

			if (index !== -1) {
				state.dataApproval[index].transaction = [
					...state.dataApproval[index].transaction,
					...payload.reduxData.transaction,
				];
			} else {
				state.dataApproval = [...state.dataApproval, payload.reduxData];
			}

			state.dataChanges = payload.dataChanges;
		},
		updateFields: (state, { payload }) => {
			state.eBizData.forEach((ebData, ebIndex) => {
				let found = payload.find((pData) => ebData.key === pData.key);
				if (found && Object.keys(found)?.length > 0) {
					state.eBizData[ebIndex].isVisible = found.isVisible;
				} else {
					state.eBizData[ebIndex].isVisible = false;
				}
			});
		},
		updateCardDesign: (state, { payload }) => {
			const index = state.eBizData.findIndex((item) => item.key === 'cardType');
			state.eBizData[index].value = payload;
		},
		setProfilePic: (state, { payload }) => {
			const index = state.dataApproval.findIndex((sItem) => {
				return sItem.id === '3';
			});
			if (index !== -1) {
				state.dataApproval[index].transaction = [
					...state.dataApproval[index].transaction,
					...payload.transaction,
				];
			} else {
				state.dataApproval = [...state.dataApproval, payload];
			}
		},
		approveData: (state, { payload }) => {
			const filterData = state.dataApproval.reduce((filteredData, dataChange) => {
				const filteredTransaction = dataChange.transaction.filter((transaction) => {
					return transaction.tId !== payload.reduxData.tId;
				});
				if (filteredTransaction.length > 0) {
					filteredData.push({
						...dataChange,
						transaction: filteredTransaction,
					});
				}

				return filteredData;
			}, []);

			state.dataApproval = filterData;
		},
		rejectData: (state, { payload }) => {
			const filterData = state.dataApproval.reduce((filteredData, dataChange) => {
				const filteredTransaction = dataChange.transaction.filter((transaction) => {
					return transaction.tId !== payload.reduxData.tId;
				});
				if (filteredTransaction.length > 0) {
					filteredData.push({
						...dataChange,
						transaction: filteredTransaction,
					});
				}

				return filteredData;
			}, []);

			state.dataApproval = filterData;

			state.dataChanges = payload.rejectionData;
		},

		addTag: (state, { payload }) => {
			state.allTags = [...state.allTags, payload];
		},
		updateCardImage: (state, { payload }) => {
			state.cardImage = payload;
			storeEbizCardInSharedStorage(payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchEbizData.pending, (state) => {
			state.loadingEbizData = LOADING;
		});
		builder.addCase(fetchEbizData.rejected, (state) => {
			state.loadingEbizData = FAIL;
		});
		builder.addCase(fetchEbizData.fulfilled, (state, { payload }) => {
			state.loadingEbizData = SUCCESS;

			state.eBizData = payload?.data ? payload.data : [];
		});
		builder.addCase(fetchEbizFields.rejected, (state) => {
			state.fields = [];
		});
		builder.addCase(fetchEbizFields.fulfilled, (state, { payload }) => {
			state.fields = payload.data;
		});
		builder.addCase(updateEbizFields.rejected, (state) => {
			state.fields = [];
		});
		builder.addCase(updateEbizFields.fulfilled, (state, { meta }) => {
			state.fields = meta.arg.fields;
		});
		builder.addCase(fetchProfileImage.fulfilled, (state, { payload }) => {
			state.loadingEbizData = SUCCESS;

			state.proifleImg = payload;
		});
		builder.addCase(fetchProfileImage.rejected, (state, { payload }) => {
			state.loadingEbizData = FAIL;

			state.proifleImg = payload;
		});
		builder.addCase(fetchProfileImage.pending, (state, { payload }) => {
			state.loadingEbizData = LOADING;

			state.proifleImg = payload;
		});
		builder.addCase(fetchDataApproval.fulfilled, (state, { payload }) => {
			state.loadingEbizData = SUCCESS;

			state.dataApproval = payload.data;
		});
		builder.addCase(fetchDataApproval.rejected, (state) => {
			state.loadingEbizData = FAIL;
		});
		builder.addCase(fetchDataApproval.pending, (state) => {
			state.loadingEbizData = LOADING;
		});
		builder.addCase(fetchDataChanges.fulfilled, (state, { payload }) => {
			state.loadingEbizData = SUCCESS;

			state.dataChanges = payload;
		});
		builder.addCase(fetchTags.fulfilled, (state, { payload }) => {
			state.loadingEbizData = SUCCESS;

			state.allTags = payload.data;
		});

		builder.addCase(createTag.fulfilled, (state, { payload, meta }) => {
			const today = new Date();
			const expire = moment(today).add(1, 'M');
			const { long, lat, description } = meta.arg;
			const isDemo = payload?.data?.isDemo;

			const newTag = {
				id: isDemo ? Math.floor(Math.random() * 100000) + 1 : payload?.data?.id,
				isRequested: false,
				isActive: true,
				description,
				long,
				lat,
				creationDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
				expiryDate: moment(expire).format('YYYY-MM-DDTHH:mm:ss.SSS'),
			};

			state.allTags = [...state.allTags, newTag];
		});

		builder.addCase(deleteTags.fulfilled, (state, { meta }) => {
			const filteredTags = state.allTags.filter(
				(tag) => !meta.arg.some((item) => item.id === tag.id),
			);

			state.allTags = filteredTags;
		});
		builder.addCase(renewTags.fulfilled, (state, { meta }) => {
			const filteredTags = state.allTags.map((tag) => {
				if (meta.arg.some((item) => item.id === tag.id)) {
					return { ...tag, isActive: true, isRequested: false };
				} else {
					return tag;
				}
			});

			state.allTags = filteredTags;
		});
		builder.addCase(fetchEbizPreviewData.rejected, (state, { payload }) => {
			state.previewLoading = false;
			state.previewData = [];
		});
		builder.addCase(fetchEbizPreviewData.pending, (state, { payload }) => {
			state.previewLoading = true;
		});
		builder.addCase(fetchEbizPreviewData.fulfilled, (state, { payload }) => {
			state.previewLoading = false;
			state.previewData = payload?.data ?? [];
		});
	},
});
export const {
	eBizCardReset,
	setChangeData,
	updateFields,
	updateCardDesign,
	setProfilePic,
	approveData,
	updateCardImage,
	addTag,
	rejectData,
} = slice.actions;
export default slice.reducer;
