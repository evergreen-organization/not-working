import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { WaterTrackerState } from './WaterTracker.type';

const initialState: WaterTrackerState = {
	age: undefined,
	height: undefined,
	weight: undefined,
	wakeUpTime: null,
	sleepTime: null,
	dailyGoal: 0,
	totalIntakeValue: 0,
	dateRecorded: null,
	waterIntakeVolume: null,
	enableReminder: true,
	timeSchedule: [],
};

const slice = createSlice({
	name: 'waterTracker',
	initialState,
	reducers: {
		totalIntakeValueUpdated(state) {
			state.totalIntakeValue += state.waterIntakeVolume;
		},
		waterIntakeVolumeUpdated(state, { payload }) {
			state.waterIntakeVolume = payload;
		},
		dateRecordedUpdated(state, { payload }) {
			state.dateRecorded = payload;
			state.totalIntakeValue = 0;
		},
		enableReminderUpdated(state, { payload }) {
			state.enableReminder = payload;
		},
		waterDetailsUpdated(state, { payload }) {
			state.age = payload.age;
			state.height = payload.height;
			state.weight = payload.weight;
			state.wakeUpTime = payload.wakeUpTime;
			state.sleepTime = payload.sleepTime;
			state.dailyGoal = payload.dailyGoal;
			state.timeSchedule = payload.timeSchedule;
			state.dateRecorded = payload.dateRecorded;
			state.waterIntakeVolume = payload.waterIntakeVolume;
			state.totalIntakeValue = payload.totalIntakeValue;
			state.enableReminder = payload.enableReminder;
		},
		waterTrackerReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE, (state, { payload }) => {
			if (payload?.waterTracker !== undefined) {
				return payload.waterTracker;
			}
		});
	},
});

export const {
	totalIntakeValueUpdated,
	waterIntakeVolumeUpdated,
	dateRecordedUpdated,
	enableReminderUpdated,
	waterDetailsUpdated,
	waterTrackerReset,
} = slice.actions;

export default slice.reducer;
