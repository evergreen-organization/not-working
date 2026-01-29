import React from 'react';
import { Form, FormButtonBottom } from 'components';
import { FormField } from '../../user/selfService/components';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Screen, Text } from 'atoms';
import { colors } from 'configs';
import { Header } from 'molecules';

export const MFAAADIDPasswordFormComp = ({
	handleSubmit,
	handleSecureTextPassword,
	initialValues,
	validationSchema,
	secureTextPassword,
}) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'AD ID Validation',
				}}
			/>
			<View style={{ flex: 1 }}>
				<Form
					initialValues={initialValues}
					enableReinitialize
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
					button={<FormButtonBottom title={'Confirm'} />}
				>
					<View style={{ marginVertical: 10, marginHorizontal: 20 }}>
						<View>
							<Text variant={'P2'}>AD ID</Text>
						</View>
						<FormField
							name="username"
							customKeyboard={true}
							inputTextStyle={{ flexDirection: 'row', alignItems: 'center' }}
						/>

						<View>
							<Text variant={'P2'}>Password</Text>
						</View>
						<FormField
							name="pWord"
							customKeyboard={true}
							secureTextEntry={secureTextPassword}
							inputTextStyle={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<HideShowIcon onPress={handleSecureTextPassword} enable={secureTextPassword} />
						</FormField>
					</View>
				</Form>
			</View>
		</Screen>
	);
};

const HideShowIcon = ({ onPress, enable }) => (
	<TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 5 }}>
		<Icon
			type={'material-community'}
			name={enable ? 'eye-off' : 'eye'}
			style={{ fontSize: 22, color: colors.primary }}
		/>
	</TouchableOpacity>
);
