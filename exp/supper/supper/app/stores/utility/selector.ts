import { createSelector } from '@reduxjs/toolkit';

export const getIsManagementPdfUploaded = createSelector(
	(state) => state.utility,
	(utility) => utility?.isManagementPdfUploaded,
);
