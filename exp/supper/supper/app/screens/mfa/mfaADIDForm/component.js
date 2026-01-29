import React from 'react';
import { View } from 'react-native';

import { Screen, Text } from 'atoms';
import { Form, FormField, FormButtonBottom } from 'components';

import { styles } from './styles';
import { Header } from 'molecules';

export const MFAAdidInputFormComp = ({ handleSubmit, initialValues, validationSchema }) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'PB SecureSign',
				}}
			/>
			<View style={{ flex: 1 }}>
				<Form
					initialValues={initialValues}
					enableReinitialize
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
					button={<FormButtonBottom title={'Scan QR'} />}
				>
					<View style={styles.formContainer}>
						<View>
							<Text variant={'P2'}>Please Enter AD ID</Text>
						</View>
						<FormField name="username" customKeyboard={true} inputTextStyle={styles.formField} />
					</View>
				</Form>
			</View>
		</Screen>
	);
};
