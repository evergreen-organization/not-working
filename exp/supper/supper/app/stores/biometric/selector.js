import { createSelector } from '@reduxjs/toolkit';

export const getBiometric = createSelector(
	(state) => state.biometric,
	(biometric) => biometric,
);
