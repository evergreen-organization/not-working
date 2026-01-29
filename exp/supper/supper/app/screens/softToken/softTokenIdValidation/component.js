import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { AvoidKeyboard, BackButton, Screen, Text } from 'atoms';
import { Form, FormButtonBottom, FormField } from 'components';
import { styles } from './styles';
import { SectionHeader } from 'molecules';

const keyboardTypes = {
	numberPad: 'number-pad',
	default: 'default',
};

const validationSchema = Yup.object().shape({
	id: Yup.string().required().label('IC'),
});
export const SoftTokenIdValidationView = (props) => {
	const { handleSubmit, handleMore, loading } = props;

	return (
		<Screen>
			<AvoidKeyboard>
				<BackButton />
				<View style={styles.container}>
					<SectionHeader
						subtitle="To continue with PB SecureSign Activation,"
						title="Enter your IC no."
					/>
					<Form
						initialValues={{ id: '' }}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
						alwaysBounceVertical={false}
						button={
							<FormButtonBottom
								testID={'check-ic-submit-button'}
								style={styles.buttonSubmit}
								title={'Next'}
								loading={loading}
							/>
						}
					>
						<FormField
							testID={'check-ic-input'}
							bold
							name="id"
							keyboardType={keyboardTypes.numberPad}
							style={styles.inputIC}
							maxLength={12}
							showCounter={true}
						/>

						<TouchableOpacity style={styles.btn} onPress={handleMore}>
							<Text style={styles.labelMoreInfo}>More info about PB SecureSign</Text>
						</TouchableOpacity>
					</Form>
				</View>
			</AvoidKeyboard>
		</Screen>
	);
};
