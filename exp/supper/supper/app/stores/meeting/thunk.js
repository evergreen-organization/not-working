import { createAsyncThunk } from '@reduxjs/toolkit';
import { DemoData } from 'constant';
import client from '../../apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

export const fetchMeetingList = createAsyncThunk(
	'fetchMeetingList',
	async ({ startDate }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Meeting.MeetingList;
		}
		const result = await client.post('/MailNote/Events', { startDate });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchMeetingDetails = createAsyncThunk(
	'fetchMeetingDetails',
	async ({ startDate, href }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Meeting.MeetingDetails;
		}
		const result = await client.post('/MailNote/EventDetail', {
			startDate,
			href,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);
