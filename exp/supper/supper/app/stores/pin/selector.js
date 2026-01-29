import { createSelector } from '@reduxjs/toolkit';

export const getPin = createSelector(
	(state) => state.pin,
	(pin) => pin,
);

export const getPinEnrolled = createSelector(
	(state) => state.pin,
	(pin) => pin.pinEnrolled,
);
