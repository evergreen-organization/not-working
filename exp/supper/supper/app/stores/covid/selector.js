import { createSelector } from '@reduxjs/toolkit';

export const getHistory = createSelector(
	(state) => state.covid.history,
	(history) => history,
);

export const getPending = createSelector(
	(state) => state.covid.pending,
	(pending) => pending,
);

export const getComplete = createSelector(
	(state) => state.covid.complete,
	(complete) => complete,
);

export const getDetail = createSelector(
	(state) => state.covid.detail,
	(detail) => detail,
);

export const getTransaction = createSelector(
	(state) => state.covid.transaction,
	(transaction) => transaction,
);

export const getCovid = createSelector(
	(state) => state.covid,
	(covid) => covid,
);
