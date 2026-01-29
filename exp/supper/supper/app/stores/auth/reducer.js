import { createSlice } from '@reduxjs/toolkit';
import { validatePin } from 'stores/pin';
import { initSoftTokenActivation } from 'stores/softToken';

const initialState = {
  status: 'idle',
  pacSeqNo: null,
  phone: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authReset: _ => initialState,
    updateAuthObject: (state, { payload }) => {
      state.status = 'succeeded';
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(initSoftTokenActivation.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(initSoftTokenActivation.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.phone = payload.data.phoneNo;
      state.pacSeqNo = payload.data.pacSeqNo;
    });
    builder.addCase(initSoftTokenActivation.rejected, state => {
      state.status = 'failed';
    });
    builder.addCase(validatePin.pending, (auth, { payload }) => {
      auth.status = 'loading';
    });
    builder.addCase(validatePin.fulfilled, auth => {
      auth.status = 'succeeded';
    });
    builder.addCase(validatePin.rejected, state => {
      state.status = 'failed';
    });
  },
});
export const { updateAuthObject, authReset } = slice.actions;
export default slice.reducer;

export const resetAuth = () => authReset();
