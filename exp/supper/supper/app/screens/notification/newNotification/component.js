import React from 'react';
import { View } from 'react-native';
import Moment from 'moment';

import { AvoidKeyboard, Screen } from 'atoms';
import { Header } from 'molecules';
import {
	Form,
	FormButtonBottom,
	FormCalendarModal,
	FormPicker,
	FormTextInput,
} from 'components';
import { Typography } from 'styles';

import {
	NOTIFICATION_CATEGORY_LIST,
	NOTIFICATION_COMPANY_LIST,
	submitNewAnnouncementValidationSchema,
} from '../constant';
import { styles } from './styles';

export const NewNotificationView = ({
	handleBack,
	handleSubmit,
	initialValues,
}) => {
	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleBack,
				}}
				centerComponent={{
					text: 'New Notification',
					style: Typography.H6,
				}}
			/>
			<AvoidKeyboard>
				<Form
					initialValues={initialValues}
					validationSchema={submitNewAnnouncementValidationSchema}
					onSubmit={handleSubmit}
					button={<FormButtonBottom title={'Preview'} />}
				>
					<View style={styles.view}>
						<FormPicker
							name={'company'}
							label={'Company'}
							data={NOTIFICATION_COMPANY_LIST}
							dataLabel={'name'}
							dataValue={'code'}
						/>
						<FormPicker
							name={'category'}
							label={'Type'}
							data={NOTIFICATION_CATEGORY_LIST}
							dataLabel={'name'}
							dataValue={'id'}
						/>
						<FormTextInput name={'title'} label={'Title'} />
						<FormTextInput name={'body'} label={'Sub-title'} />
						<FormTextInput
							name={'description'}
							label={'Message'}
							numberOfLines={3}
							multiline={true}
							textInputStyle={styles.message}
						/>
						<FormCalendarModal
							name={'validDuration'}
							label={'Valid on'}
							minimumDate={Moment().add(1, 'days').format('YYYY-MM-DD')}
						/>
					</View>
				</Form>
			</AvoidKeyboard>
		</Screen>
	);
};
