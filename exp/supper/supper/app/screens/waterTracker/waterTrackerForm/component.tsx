import React from 'react';
import { View } from 'react-native';

import { Form, FormButtonBottom } from 'components';
import { Screen, Text } from 'atoms';

import AgeIcon from 'assets/icon/age.png';
import HeightIcon from 'assets/icon/height.png';
import WeightIcon from 'assets/icon/weight.png';
import AlarmIcon from 'assets/icon/alarm.png';
import SleepIcon from 'assets/icon/sleep.png';

import { FormTextInput, FormDateTimePicker } from '../components';
import { styles } from './styles';
import { Header } from 'molecules';
import { WaterTrackerFormViewType } from '../waterTracker.type';

export const WaterTrackerFormView = ({
	handleFormSubmit,
	formInitialValues,
	formValidationSchema,
}: WaterTrackerFormViewType) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Water Tracker',
				}}
			/>
			<Form
				onSubmit={handleFormSubmit}
				initialValues={formInitialValues}
				validationSchema={formValidationSchema}
				button={
					<>
						<View style={styles.formFooterContainer}>
							<Text style={styles.formFooterText}>* Save will reset current tracking record.</Text>
						</View>
						<FormButtonBottom title={'Save'} />
					</>
				}
			>
				<View style={styles.content}>
					<Text bold style={styles.title}>
						Fill in your data
					</Text>
					<FormTextInput name={'age'} title={'Age'} image={AgeIcon} maxLength={3} />
					<FormTextInput name={'height'} title={'Height (cm)'} image={HeightIcon} maxLength={5} />
					<FormTextInput name={'weight'} title={'Weight (kg)'} image={WeightIcon} maxLength={5} />
					<FormDateTimePicker
						name={'wakeUpTime'}
						title={'Wake up time'}
						image={AlarmIcon}
						defaultTime={5}
					/>
					<FormDateTimePicker
						name={'sleepTime'}
						title={'Sleep time'}
						image={SleepIcon}
						defaultTime={21}
					/>
				</View>
			</Form>
		</Screen>
	);
};
