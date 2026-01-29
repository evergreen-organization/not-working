import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';

import client from '../apis/client';
import { DemoData, FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

const initialState = {
	outstationList: [],
	continentList: [],
	stateList: [],
	purposeList: [],
	cityList: [],
	loadingOutstationList: IDLE,
};

export const fetchOutstationDeclaration = createAsyncThunk(
	'fetchOutstationDeclaration',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Interstate.OutstationDeclaration;
		}
		const result = await client.get('/Outstation/GetOutstationDeclaration');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const addOutstation = createAsyncThunk(
	'addOutstation',
	async (
		{
			fromDate,
			toDate,
			remarks,
			stateName,
			cityName,
			otherRemarks,
			travelType,
			continent,
			country,
		},
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Interstate.PushOutstation;
		}
		const result = await client.post('/Outstation/DeclareOutstation20214050', {
			fromDate,
			toDate,
			remarks,
			stateName,
			cityName,
			otherRemarks,
			travelType,
			continent,
			country,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const deleteOutstation = createAsyncThunk(
	'deleteOutstation',
	async ({ id }, { getState, rejectWithValue }) => {
		const result = await client.post('/Outstation/DeleteOutstation', { id });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchAllStates = createAsyncThunk(
	'fetchAllStates',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Interstate.States;
		}
		const result = await client.post('/Outstation/GetAllStates');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchCityByState = createAsyncThunk(
	'fetchCityByState',
	async ({ StateId }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Interstate.City;
		}
		const result = await client.post('/Outstation/GetCityByStateNew', {
			StateId,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchOutstationPurpose = createAsyncThunk(
	'fetchOutstationPurpose',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Interstate.OutstationPurpose;
		}
		const result = await client.post('/Outstation/GetOutstationPurpose');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const fetchContinents = createAsyncThunk(
	'fetchContinents',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Interstate.Continents;
		}
		const result = await client.post('/Outstation/GetContinents');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

const slice = createSlice({
	name: 'interstate',
	initialState: initialState,
	reducers: {
		interstateReset: (_) => initialState,
		cityListReset: (state) => {
			state.cityList = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchOutstationDeclaration.fulfilled,
			(state, { payload }) => {
				state.loadingOutstationList = SUCCESS;
				state.outstationList = payload.data;
			},
		);
		builder.addCase(
			fetchOutstationDeclaration.pending,
			(state, { payload }) => {
				state.loadingOutstationList = LOADING;
			},
		);
		builder.addCase(
			fetchOutstationDeclaration.rejected,
			(state, { payload }) => {
				state.loadingOutstationList = FAIL;
			},
		);
		builder.addCase(fetchContinents.fulfilled, (state, { payload }) => {
			state.continentList = payload.data;
		});
		builder.addCase(fetchAllStates.fulfilled, (state, { payload }) => {
			state.stateList = payload.data;
		});
		builder.addCase(fetchOutstationPurpose.fulfilled, (state, { payload }) => {
			state.purposeList = payload.data;
		});
		builder.addCase(fetchCityByState.fulfilled, (state, { payload }) => {
			let data = payload.data;
			data.push({ name: 'Others' });
			state.cityList = data;
		});
	},
});

export const getInterstate = createSelector(
	(state) => state.interstate,
	(interstate) => interstate,
);

export const { interstateReset, cityListReset } = slice.actions;
export default slice.reducer;
