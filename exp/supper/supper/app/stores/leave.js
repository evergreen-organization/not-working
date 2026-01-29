import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';
import client from '../apis/client';
import { LEAVE_CATEGORY } from '../constant/dummyData';
import { DemoData } from 'constant';
import { checkIsDemoFromState } from 'utils';

const initialState = {
	staffList: [],
	reliefList: [],
	savedRelief: {},
	approverList: [],
	savedApprover: {},
	leaveBalance: [],
	leaveRecord: [],
	wfhRecord: [],
	pendingLeaveList: [],
};

export const fetchWorkFromHomeSchedule = createAsyncThunk(
	'fetchWorkFromHomeSchedule',
	async (
		{ monthYearStart, monthYearEnd, staffNo },
		{ rejectWithValue, getState },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.WorkFromHome;
		}
		const result = await client.post('/Mobile/WorkFromHome', {
			monthYearStart,
			monthYearEnd,
			staffNo,
		});
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchStaffList = createAsyncThunk(
	'fetchStaffList',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.StaffList;
		}
		const result = await client.get('/Mobile/staffs');
		console.log({ path: 'fetchStaffList:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchReliefList = createAsyncThunk(
	'fetchReliefList',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.ReliefList;
		}
		const result = await client.get('/Mobile/LeaveRelief');
		console.log({ path: 'fetchReliefList:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchApproverList = createAsyncThunk(
	'fetchApproverList',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.ApproverList;
		}
		const result = await client.get('/Mobile/LeaveApprover');
		console.log({ path: 'fetchApproverList:', result });

		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchLeaveBalance = createAsyncThunk(
	'fetchLeaveBalance',
	async ({ staffNo, year }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.LeaveBalance;
		}
		const result = await client.post('/Mobile/LeaveBalance', { staffNo, year });
		console.log({ path: 'fetchLeaveBalance:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchLeaveRecord = createAsyncThunk(
	'fetchLeaveRecord',
	async ({ staffNo, stYearMth, edYearMth }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.LeaveRecord;
		}
		const result = await client.post('/Mobile/LeaveRecords', {
			staffNo,
			stYearMth,
			edYearMth,
		});
		console.log({ path: 'fetchLeaveRecord:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchPendingLeave = createAsyncThunk(
	'fetchPendingLeave',
	async (temp, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.PendingLeave;
		}
		const result = await client.get('/Mobile/PendingApprovalLeave');
		console.log({ path: 'fetchPendingLeave:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const fetchOffDates = createAsyncThunk(
	'fetchOffDates',
	async ({ staffNo, stYearMth, edYearMth }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.OffDates;
		}
		const result = await client.post('/Mobile/OffDates', {
			staffNo,
			stYearMth,
			edYearMth,
		});
		console.log({ path: 'fetchOffDates:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const submitApplyLeave = createAsyncThunk(
	'submitApplyLeave',
	async (
		{ reliefId, approverId, leaveDates, remarks },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.SubmitApplyLeave;
		}
		const result = await client.post('/Mobile/ApplyLeaves', {
			reliefId,
			approverId,
			leaveDates,
			remarks,
		});
		console.log({ path: 'submitApplyLeave:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

export const submitApproveLeave = createAsyncThunk(
	'submitApproveLeave',
	async (
		{
			leaveId,
			applicantId,
			aprRemarks,
			isOnBehalf,
			leaveDates,
			rejectedLeaveDate,
		},
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.Leave.ApproveLeave;
		}
		const result = await client.post('/Mobile/LeaveApproval', {
			leaveId,
			applicantId,
			aprRemarks,
			isOnBehalf,
			leaveDates,
			rejectedLeaveDate,
		});
		console.log({ path: 'submitApproveLeave:', result });
		if (!result.ok) {
			return rejectWithValue(result);
		}
		return result;
	},
);

const slice = createSlice({
	name: 'leave',
	initialState: initialState,
	reducers: {
		leaveReset: (_) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchStaffList.fulfilled, (state, { payload }) => {
			let list = [];
			payload.data.forEach((item) => {
				list.push({ Name: item.name, Id: item.staffNo });
			});
			state.staffList = list;
		});
		builder.addCase(fetchReliefList.fulfilled, (state, { payload }) => {
			let list = [];
			let saved = {};
			payload.data.forEach((item) => {
				list.push({ Name: item.name, Id: item.personId });
				if (item.selected === 'Y') {
					Object.assign(saved, { Name: item.name, Id: item.personId });
				}
			});
			state.reliefList = list;
			state.savedRelief = saved;
		});
		builder.addCase(fetchApproverList.fulfilled, (state, { payload }) => {
			let list = [];
			let saved = {};
			payload.data.forEach((item) => {
				list.push({ Name: item.name, Id: item.personId });
				if (item.selected === 'Y') {
					Object.assign(saved, { Name: item.name, Id: item.personId });
				}
			});
			state.approverList = list;
			state.savedApprover = saved;
		});
		builder.addCase(fetchLeaveBalance.fulfilled, (state, { payload }) => {
			let list = [];
			payload.data.forEach((item1) => {
				LEAVE_CATEGORY.forEach((item2) => {
					if (item1.leaveCode === item2.code) {
						list.push({
							name: item1.leaveType,
							code: item1.leaveCode,
							accumulated: item1.accumulated,
							approved: item1.approved,
							balance: item1.balance,
							entitled: item1.entitled,
							pending: item1.pending,
							year: item1.year,
							color: item1.leaveCode === item2.code ? item2.color : '#A8A8A8',
						});
					}
				});
			});
			state.leaveBalance = list;
		});
		builder.addCase(fetchPendingLeave.fulfilled, (state, { payload }) => {
			let list = [];
			payload.data.forEach((item1) => {
				LEAVE_CATEGORY.forEach((item2) => {
					if (item1.leaveCode === item2.code) {
						list.push({
							appLeaveDate: item1.appLeaveDate,
							isOnBeHalf: item1.isOnBeHalf,
							leaveCode: item1.leaveCode,
							leaveId: item1.leaveId,
							leaveName: item1.leaveName,
							name: item1.name,
							noOfDays: item1.noOfDays,
							personId: item1.personId,
							reliefName: item1.reliefName,
							remarks: item1.remarks,
							submitDate: item1.submitDate,
							color: item1.leaveCode === item2.code ? item2.color : '#A8A8A8',
						});
					}
				});
			});
			state.pendingLeaveList = list;
		});
		builder.addCase(fetchLeaveRecord.fulfilled, (state, { payload }) => {
			let list = [];
			payload.data.forEach((item1) => {
				LEAVE_CATEGORY.forEach((item2) => {
					if (item1.leaveCode === item2.code) {
						list.push({
							company: item1.company,
							date: item1.date,
							dayType: item1.dayType,
							days: item1.days,
							leaveCode: item1.leaveCode,
							personId: item1.personId,
							color: item1.leaveCode === item2.code ? item2.color : '#A8A8A8',
						});
					}
				});
			});
			state.leaveRecord = list;
		});
		builder.addCase(
			fetchWorkFromHomeSchedule.fulfilled,
			(state, { payload }) => {
				const list = payload.data?.datesList.map((item, index) => {
					return {
						date: item,
						dayType: 0,
						days: 1,
						leaveCode: 'WFH',
						personId: payload.data?.staffNo,
						color: '#ffdac0',
					};
				});
				state.wfhRecord = list;
			},
		);
	},
});

export const getLeave = createSelector(
	(state) => state.leave,
	(leave) => leave,
);

export const { leaveReset } = slice.actions;
export default slice.reducer;
