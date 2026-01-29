import { createSelector } from '@reduxjs/toolkit';

export const getClinic = createSelector(
	(state) => state.clinic,
	(clinic) => clinic,
);
