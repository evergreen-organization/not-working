import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';
import _ from 'lodash';

import { DemoData, FAIL, IDLE, LOADING, SUCCESS } from 'constant';
import apiClient from '../apis/client';
import { handleThunkResponse } from 'apis';
import { checkIsDemoFromState } from 'utils';

import {
	sumProductCountByStatus,
	EMPTY,
	formatProspectSectionList,
	FOUND,
} from '../screens/leadgen360/utils';

const initialState = {
	customerAliasId: 0,
	prospects: [],
	branch: [],
	regionBranch: [],
	products: [],
	idNo: '',
	icMatch: '',
	name: '',
	contactNo: '',
	email: '',
	productCode: '',
	activeSalesPersonnel: [],
	referralCode: '',
	icStatus: IDLE,
	status: IDLE,
	prospectStatus: IDLE,
	productExist: false,
	referralNotFound: false,
	statusStatistic: {},
};

export const getProspects = createAsyncThunk(
	'leadgen/getProspect',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.Prospect;
		}
		const result = await apiClient.get('/LeadGen/GetProspects');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getBranch = createAsyncThunk(
	'leadgen/getBranchDepartment',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.Branch;
		}
		const result = await apiClient.get('/LeadGen/GetBranchDepartments');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getRegionBranchDepartment = createAsyncThunk(
	'leadgen/getRegionBranchDepartment',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.Branch;
		}
		const result = await apiClient.get('/LeadGen/GetRegionBranchDepartments');
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getProducts = createAsyncThunk(
	'leadgen/getProducts',
	async (request, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.Products;
		}
		const result = await apiClient.get('/LeadGen/GetProducts');
		return handleThunkResponse({ result, rejectWithValue });
	},
);
export const getCustomer = createAsyncThunk(
	'leadgen/getCustomer',
	async ({ idNo }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.Customer;
		}
		const result = await apiClient.post('/LeadGen/GetCustomer', { idNo });
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const verifyCustomerProduct = createAsyncThunk(
	'leadgen/verifyCustomerProduct',
	async (
		{ idNo, productCode, contactNo, name, customerAliasId },
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.VerifyProduct;
		}
		const result = await apiClient.post('/LeadGen/VerifyCustomerProduct', {
			customerAliasId,
			idNo,
			productCode,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getSalesPersonnel = createAsyncThunk(
	'leadgen/getSalesPersonnel',
	async ({ brDeptCode }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.SalesPersonnel;
		}
		const result = await apiClient.post('/LeadGen/GetSalesPersons', {
			brDeptCode,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const searchSalesPersonnel = createAsyncThunk(
	'leadgen/searchSalesPersonnel',
	async ({ staffNo }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.SearchStaff;
		}
		const result = await apiClient.post('/LeadGen/SearchStaff', {
			staffNo,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const getReferral = createAsyncThunk(
	'leadgen/getReferral',
	async ({ staffNo }, { getState, rejectWithValue }) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.Referral;
		}
		const result = await apiClient.post('/LeadGen/GetReferral', {
			staffNo,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

export const addProspect = createAsyncThunk(
	'leadgen/addProspect',
	async (
		{
			customerAliasId,
			idNo,
			name,
			contactNo,
			productCode,
			dateInterested,
			brDeptCode,
			salesPersonStaffNo,
			refRegBrDeptCode,
			refStaffNo,
			remarks,
		},
		{ getState, rejectWithValue },
	) => {
		if (checkIsDemoFromState(getState())) {
			return DemoData.LeadGen.AddProspect;
		}
		const result = await apiClient.post('/LeadGen/AddProspect', {
			customerAliasId,
			idNo,
			name,
			contactNo,
			productCode,
			dateInterested,
			brDeptCode,
			salesPersonStaffNo,
			refRegBrDeptCode,
			refStaffNo,
			remarks,
		});
		return handleThunkResponse({ result, rejectWithValue });
	},
);

const slice = createSlice({
	name: 'leadgen',
	initialState,
	reducers: {
		leadgenReset: (_) => initialState,
		updateSelectedBranch: (state, { payload }) => {
			state.selectedBranch = payload;
		},
		updateReferral: (state, { payload }) => {
			state.referral = payload;
		},
		updateSelectedSalesPersonnel: (state, { payload }) => {
			state.salesPersonnel = payload;
		},
		updateCheckICStatus: (state, { payload }) => {
			state.icStatus = payload;
		},
		resetLeadIdNo: (state, { payload }) => {
			state.idNo = '';
		},
		resetAddLeadForm: (state, { payload }) => {
			state.salesPersonnel = {};
			state.referral = {};
			state.activeSalesPersonnel = [];
			state.productCode = '';
			state.selectedBranch = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProspects.pending, (state, { payload, meta }) => {
			state.prospectStatus = LOADING;
		});
		builder.addCase(getProspects.rejected, (state, { payload, meta }) => {
			state.prospectStatus = FAIL;
		});
		builder.addCase(getProspects.fulfilled, (state, { payload, meta }) => {
			state.prospectStatus = SUCCESS;
			state.prospects = payload.data;
			state.statusStatistic = sumProductCountByStatus(payload.data);
		});
		builder.addCase(getBranch.fulfilled, (state, { payload, meta }) => {
			state.status = SUCCESS;
			state.branch = payload.data;
		});
		builder.addCase(
			getRegionBranchDepartment.pending,
			(state, { payload, meta }) => {
				state.status = LOADING;
			},
		);
		builder.addCase(
			getRegionBranchDepartment.rejected,
			(state, { payload, meta }) => {
				state.status = FAIL;
			},
		);
		builder.addCase(
			getRegionBranchDepartment.fulfilled,
			(state, { payload }) => {
				state.status = SUCCESS;
				state.regionBranch = payload.data;
			},
		);
		builder.addCase(getProducts.rejected, (state, { payload, meta }) => {
			state.status = FAIL;
		});
		builder.addCase(getProducts.fulfilled, (state, { payload, meta }) => {
			state.status = SUCCESS;
			state.products = payload.data;
		});
		builder.addCase(getCustomer.pending, (state, { payload, meta }) => {
			state.icStatus = LOADING;
			state.status = LOADING;
		});
		builder.addCase(getCustomer.rejected, (state, { payload, meta }) => {
			state.status = FAIL;
			state.icStatus = EMPTY;
			state.idNo = meta.arg.idNo;
		});
		builder.addCase(getCustomer.fulfilled, (state, { payload, meta }) => {
			state.status = SUCCESS;
			state.idNo = meta.arg.idNo;
			const { name, contactNo } = payload.data;
			state.name = name;
			state.contactNo = contactNo;
			state.icStatus = FOUND;
		});
		builder.addCase(
			verifyCustomerProduct.pending,
			(state, { payload, meta }) => {
				state.status = LOADING;
			},
		);
		builder.addCase(
			verifyCustomerProduct.rejected,
			(state, { payload, meta }) => {
				state.status = FAIL;
			},
		);
		builder.addCase(
			verifyCustomerProduct.fulfilled,
			(state, { payload, meta }) => {
				state.status = SUCCESS;
				const { name, contactNo, productCode, idNo } = meta.arg;
				state.productCode = productCode;
				state.name = name;
				state.contactNo = contactNo;
				state.productExist = payload.data.exist;
				if (idNo) {
					state.idNo = idNo;
				}
			},
		);
		builder.addCase(getSalesPersonnel.pending, (state, { payload, meta }) => {
			state.status = LOADING;
		});
		builder.addCase(getSalesPersonnel.rejected, (state, { payload, meta }) => {
			state.status = FAIL;
		});
		builder.addCase(getSalesPersonnel.fulfilled, (state, { payload, meta }) => {
			state.status = SUCCESS;
			state.activeSalesPersonnel = payload.data;
		});
		builder.addCase(
			searchSalesPersonnel.pending,
			(state, { payload, meta }) => {
				state.status = LOADING;
			},
		);
		builder.addCase(
			searchSalesPersonnel.rejected,
			(state, { payload, meta }) => {
				state.status = FAIL;
			},
		);
		builder.addCase(
			searchSalesPersonnel.fulfilled,
			(state, { payload, meta }) => {
				state.status = SUCCESS;
			},
		);
		builder.addCase(getReferral.pending, (state, { payload, meta }) => {
			state.status = LOADING;
		});
		builder.addCase(getReferral.rejected, (state, { payload, meta }) => {
			state.status = FAIL;
		});
		builder.addCase(getReferral.fulfilled, (state, { payload, meta }) => {
			state.status = SUCCESS;
		});
		builder.addCase(addProspect.rejected, (state, { payload, meta }) => {
			state.status = FAIL;
		});
		builder.addCase(addProspect.pending, (state, { payload, meta }) => {
			state.status = LOADING;
		});
		builder.addCase(addProspect.fulfilled, (state, { payload, meta }) => {
			state.status = SUCCESS;
			state.referralCode = payload.data.referralCode;
		});
	},
});

export const {
	leadgenReset,
	updateSelectedBranch,
	updateReferral,
	updateSelectedSalesPersonnel,
	updateCheckICStatus,
	resetAddLeadForm,
	resetLeadIdNo,
} = slice.actions;
export default slice.reducer;

export const getLeadGen = createSelector(
	(state) => state.leadgen,
	(leadgen) => leadgen,
);
export const getAllProspect = createSelector(
	(state) => state.leadgen.prospects,
	(prospects) => {
		return formatProspectSectionList(prospects);
	},
);

export const getAllLeadGenProducts = createSelector(
	(state) => state.leadgen.products,
	(products) => {
		return _.sortBy(products, 'productName');
	},
);

export const getAllLeadGenBranches = createSelector(
	(state) => state.leadgen.branch,
	(branch) => {
		return branch;
	},
);

export const getAllLeadGenRegionBranches = createSelector(
	(state) => state.leadgen.regionBranch,
	(regionBranch) => {
		return regionBranch;
	},
);
