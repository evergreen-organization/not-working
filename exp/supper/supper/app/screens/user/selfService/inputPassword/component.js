import React from 'react';
import { Form, FormButtonBottom } from 'components';
import { TouchableOpacity, View } from 'react-native';
import { newPassword } from 'constant';
import { Icon, Screen, Text } from 'atoms';
import { FormField } from '../components';
import { styles } from './styles';
import { Header } from 'molecules';

export const NewPasswordView = ({
	handleSubmit,
	secureTextPassword,
	handleSecureTextPassword,
	secureTextConfirm,
	handleSecureTextConfirm,
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
					text: 'Set Password',
				}}
			/>
			<View style={styles.container}>
				<Form
					initialValues={{ pWord: '', confirm: '' }}
					onSubmit={handleSubmit}
					enableReinitialize={true}
					validationSchema={newPassword}
					button={<FormButtonBottom title={'Confirm'} />}
				>
					<View style={styles.formContainer}>
						<View>
							<Text variant={'P2'}>New Password</Text>
						</View>
						<FormField
							name="pWord"
							placeholder="New Password"
							customKeyboard={true}
							secureTextEntry={secureTextPassword}
							inputTextStyle={styles.input}
						>
							<HideShowIcon onPress={handleSecureTextPassword} enable={secureTextPassword} />
						</FormField>
						<View>
							<Text variant={'P2'}>Confirm Password</Text>
						</View>
						<FormField
							name="confirm"
							placeholder="Confirm Password"
							customKeyboard={true}
							secureTextEntry={secureTextConfirm}
							inputTextStyle={styles.input}
						>
							<HideShowIcon onPress={handleSecureTextConfirm} enable={secureTextConfirm} />
						</FormField>
					</View>
				</Form>
			</View>
		</Screen>
	);
};

const HideShowIcon = ({ onPress, enable }) => (
	<TouchableOpacity onPress={onPress} style={styles.iconView}>
		<Icon type={'material-community'} name={enable ? 'eye-off' : 'eye'} style={styles.icon} />
	</TouchableOpacity>
);
