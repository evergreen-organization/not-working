import { createSelector } from '@reduxjs/toolkit';

export const getMFA = createSelector(
	(state) => state.mfa,
	(mfa) => mfa,
);

export const getClientServerTimeShift = createSelector(
	(state) => state.mfa,
	(mfa) => mfa.clientServerTimeShift,
);
export const getMFAUser = createSelector(
	(state) => state.mfa,
	(mfa) => mfa.stfNo,
);

export const getPinErrorCount = createSelector(
	(state) => state.mfa,
	(mfa) => mfa.pinErrorCount,
);

export const getMFAStatus = createSelector(
	(state) => state.mfa,
	(mfa) => mfa.isActivatedMFA ?? false,
);

export const getHardTokenStatus = createSelector(
	(state) => state.mfa,
	(mfa) => mfa.hasHardToken ?? false,
);
