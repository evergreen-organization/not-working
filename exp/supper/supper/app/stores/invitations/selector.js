import { createSelector } from '@reduxjs/toolkit';

export const getInvitations = createSelector(
	(state) => state.invitations,
	(invitations) => invitations,
);

export const getAttendees = createSelector(
	(state) => state.invitations.attendees,
	(attendees) => attendees,
);
