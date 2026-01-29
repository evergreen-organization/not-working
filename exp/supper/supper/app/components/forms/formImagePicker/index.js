import React from 'react';
import { useFormikContext } from 'formik';
import { FormImagePickerView } from './component';

export const FormImagePicker = ({ testID, name }) => {
	const { setFieldValue, values, setStatus } = useFormikContext();

	const onUploadImage = (imageUri) => {
		setFieldValue(name, imageUri);
	};

	const props = {
		testID,
		name,
		onUploadImage,
		values,
		setStatus,
	};

	return <FormImagePickerView {...props} />;
};
