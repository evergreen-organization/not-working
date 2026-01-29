import { createSelector } from '@reduxjs/toolkit';

export const getEbizData = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData,
);
export const getUserData = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData.eBizData,
);
export const getCardImage = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData.cardImage,
);

export const getCardFields = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData.fields,
);
export const getTagLength = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData.allTags.filter((tag) => tag.isRequested).length,
);
export const getEBizLoading = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData.loadingEbizData,
);

export const getEBizPreviewLoading = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData.previewLoading,
);

export const getEBizPreviewData = createSelector(
	(state) => state.eBizCard,
	(eBizData) => eBizData.previewData,
);
