import React from 'react';

import { CustomImagePicker } from 'organisms';
import { TextHelper } from 'atoms';
import { useFormikContext } from 'formik';
import { View } from 'react-native';

export const FormImagePickerView = ({ testID, name, onUploadImage }) => {
	const { values, touched, errors } = useFormikContext();

	return (
		<View style={{ marginBottom: 20 }}>
			<CustomImagePicker
				testID={testID}
				imageUri={values[name]}
				onUploadImage={onUploadImage}
			/>

			{touched[name] && (
				<TextHelper
					isValid={!errors[name]}
					errorMsg={errors[name]}
					showCount={false}
				/>
			)}
		</View>
	);
};
