import React, { forwardRef } from 'react';
import { Formik } from 'formik';
import { ScrollView } from 'react-native';
import { FormType } from './forms.type';

export const Form = (
	{
		initialValues,
		onSubmit,
		validationSchema,
		children,
		enableReinitialize = false,
		alwaysBounceVertical = true,
		enableScrollView = true,
		header,
		button,
	}: FormType,
	ref,
) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize={enableReinitialize}
			innerRef={ref}
		>
			{() => (
				<>
					{header}
					{enableScrollView ? (
						<ScrollView
							alwaysBounceVertical={alwaysBounceVertical}
							showsVerticalScrollIndicator={false}
						>
							{children}
						</ScrollView>
					) : (
						<>{children}</>
					)}
					{button}
				</>
			)}
		</Formik>
	);
};

export default forwardRef(Form);
