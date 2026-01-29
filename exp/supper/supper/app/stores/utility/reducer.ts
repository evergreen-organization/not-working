import { createSlice } from '@reduxjs/toolkit';
import { fetchNewYearPdfUploaded } from './thunk';

export interface UtilityState {
	isManagementPdfUploaded?: boolean;
}

const initialState: UtilityState = {
	isManagementPdfUploaded: false,
};

export const utilitySlice = createSlice({
	name: 'utility',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchNewYearPdfUploaded.fulfilled, (state, { payload }) => {
			state.isManagementPdfUploaded = payload?.data?.isUploaded;
		});
	},
});

export default utilitySlice.reducer;
