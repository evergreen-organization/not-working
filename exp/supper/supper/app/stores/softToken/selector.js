import { createSelector } from '@reduxjs/toolkit';

export const getSoftToken = createSelector(
	(state) => state.softToken,
	(softToken) => softToken,
);

export const getSoftTokenTransaction = createSelector(
	(state) => state.softToken.transaction,
	(transaction) => transaction,
);

export const getSecfaAuth = createSelector(
	(state) => state.softToken.auth,
	(auth) => auth,
);
