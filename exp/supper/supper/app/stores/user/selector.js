import { createSelector } from '@reduxjs/toolkit';

export const getUser = createSelector(
	(state) => state.user,
	(user) => user,
);

export const getUserLoggedIn = createSelector(
	(state) => state.user,
	(user) => !!user.token,
);

export const getDeeplink = createSelector(
	(state) => state.user,
	(user) => user?.deeplink,
);
