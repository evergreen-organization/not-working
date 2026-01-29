import { createSelector } from '@reduxjs/toolkit';

export const getLogin = createSelector(
	(state) => state.login,
	(login) => login,
);

export const getModulesAvailable = createSelector(
	(state) => state.login,
	(login) => login.modulesAvailable,
);
