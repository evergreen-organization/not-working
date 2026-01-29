import { createAsyncThunk } from '@reduxjs/toolkit';
import client from 'apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';
import { DemoData } from 'constant';

export const fetchEventList = createAsyncThunk(
	'fetchEventList',
	async ({ searchDate, searchDaysRange }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.EventList;
		}
		const result = await client.post('/Event/GetEventList', {
			searchDate,
			searchDaysRange,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchAttendeeList = createAsyncThunk(
	'fetchAttendeeList',
	async ({ eventId, uncheckIn }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.Attendees;
		}
		const result = await client.post('/Event/GetAttendees', {
			eventId,
			uncheckIn,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchEventStatistics = createAsyncThunk(
	'fetchEventStatistics',
	async ({ eventId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.Statistics;
		}
		const result = await client.post('/Event/GetEventStatistics', { eventId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchUncheckInReport = createAsyncThunk(
	'fetchUncheckInReport',
	async ({ eventId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.PendingAttendees;
		}
		const result = await client.post('/Event/GetUncheckInReport', { eventId });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchCheckInStatus = createAsyncThunk(
	'fetchCheckInStatus',
	async ({ eventId, id }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.CheckInStatus;
		}
		const result = await client.post('/Event/GetCheckInStatus', {
			eventId,
			id,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchSeatingArrangement = createAsyncThunk(
	'fetchSeatingArrangement',
	async ({ eventId, id }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.SeatingArrangement;
		}
		const result = await client.post('/Event/GetSeatingArrangement', {
			eventId,
			id,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const submitCheckInAttendees = createAsyncThunk(
	'submitCheckInAttendees',
	async ({ attendees }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.CheckInAttendees;
		}
		const result = await client.post('/Event/CheckInAttendees', { attendees });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const submitCheckInQR = createAsyncThunk(
	'submitCheckInQR',
	async (
		{ qrString, eventId, checkInDateTime, lateCheckInReason },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Invitation.CheckInQr;
		}
		const result = await client.post('/Event/CheckInQR', {
			qrString,
			eventId,
			checkInDateTime,
			lateCheckInReason,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
