import React from 'react';
import { View } from 'react-native';

import { Loading, Screen } from 'atoms';
import { Header } from 'molecules';
import { Form, FormButtonBottom, FormImagePicker, FormPicker } from 'components';

import { styles } from './styles';
import { SELF_TEST_RESULT } from '../utils/constant';
import { uploadSelfTestResultValidationSchema } from '../utils/validationSchema';
import { Typography } from 'styles';

export const UploadResultView = ({
	loading,
	approverList,
	initialValues,
	handleSubmit,
	handleBack,
}) => {
	return (
		<Screen>
			{loading && <Loading />}
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleBack,
				}}
				centerComponent={{
					text: 'Self Test Result Form',
					style: Typography.H6,
				}}
			/>
			<View style={styles.flex}>
				<Form
					initialValues={initialValues}
					validationSchema={uploadSelfTestResultValidationSchema}
					onSubmit={handleSubmit}
					button={
						<FormButtonBottom
							title="Submit"
							testID={'self-test-submit-button'}
							disabled={loading}
						/>
					}
				>
					<View style={styles.formView}>
						<FormImagePicker name={'base64Image'} testID={'self-test-image-picker'} />
						<FormPicker
							testID={'self-test-checker-picker'}
							label={'Checker'}
							name={'approverId'}
							enableSearch={true}
							data={approverList}
							dataLabel={'Name'}
							dataValue={'Id'}
							loading={!approverList || approverList?.length === 0}
							textInputStyle={styles.formTextInput}
						/>
						<FormPicker
							testID={'self-test-result-picker'}
							label={'Result'}
							name={'testResult'}
							data={SELF_TEST_RESULT}
							loading={!approverList || approverList?.length === 0}
							textInputStyle={styles.formTextInput}
						/>
					</View>
				</Form>
			</View>
		</Screen>
	);
};
