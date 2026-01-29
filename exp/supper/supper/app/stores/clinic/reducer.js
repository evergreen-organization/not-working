import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { fetchClinicList, fetchStateList } from './thunk';

const initialState = {
	list: [],
	stateAreaList: [],
	panelClinicList: [],
	cacheDate: null,
};

const slice = createSlice({
	name: 'clinic',
	initialState,
	reducers: {
		extraReducers: {
			[REHYDRATE]: (state, { payload }) => {
				if (payload?.clinic !== undefined) {
					return payload.clinic;
				}
			},
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchClinicList.fulfilled, (state, { payload, meta }) => {
			state.panelClinicList = payload.data;
			state.cacheDate = meta.arg.cacheDate;
		});
		builder.addCase(fetchStateList.fulfilled, (state, { payload }) => {
			state.stateAreaList = payload.data;
		});
	},
});

export default slice.reducer;
