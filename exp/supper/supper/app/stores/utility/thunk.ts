import { createAsyncThunk } from '@reduxjs/toolkit';
import client from 'apis/client';
import { NEW_YEAR_PDF_NAME } from 'constant';

export const fetchNewYearPdfUploaded = createAsyncThunk('fetchNewYearPdfUploaded', async () => {
	const response = await client.get(`/pbexperience/${NEW_YEAR_PDF_NAME}`, undefined, {
		headers: {
			Accept: 'application/pdf',
		},
		responseType: 'arraybuffer',
	});

	return {
		data: { isUploaded: response.status === 200 },
	};
});
