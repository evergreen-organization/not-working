import { createSlice, createSelector } from "@reduxjs/toolkit"

const initialState = {
  isActive: true
}

const slice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (appState, action) => {
      appState.isActive = action.payload.isActive
    }
  }
})

export const { setAppState } = slice.actions
export default slice.reducer

export const getAppState = createSelector(
  state => state.appState,
  (appState) => appState
)