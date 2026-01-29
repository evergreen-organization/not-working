import * as Yup from 'yup';

export const uploadSelfTestResultValidationSchema = Yup.object().shape({
	base64Image: Yup.string().ensure().required('Photo is required'),
	testResult: Yup.string().ensure().required('Test result is required'),
	approverId: Yup.string().ensure().required('Approver is required'),
});
