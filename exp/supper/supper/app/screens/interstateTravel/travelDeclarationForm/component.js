import React from 'react';
import Collapsible from 'react-native-collapsible';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AvoidKeyboard, Screen, Space, Text } from 'atoms';
import { colors } from 'configs';
import { Form, FormButtonBottom, FormCalendarModal, FormPicker, FormTextInput } from 'components';
import { Header } from 'molecules';
import { Typography } from 'styles';

import { TRAVEL_TYPES, travelDeclarationValidationSchema, getMaxDate, getMinDate } from '../utils';
import { styles } from './styles';

export const TravelDeclarationFormComp = ({
	handleFormSubmission,
	handleStateSelection,
	handleTravelTypeSelection,
	handleFromDatePress,
	initialValues,
	stateList,
	cityList,
	purposeList,
	continentList,
	selectedTravelType,
	selectedFromDate,
	isDisabledDateFields,
	isDisabledCityField,
}) => {
	const navigation = useNavigation();
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

	return (
		<Screen>
			<Form
				initialValues={initialValues}
				onSubmit={handleFormSubmission}
				validationSchema={travelDeclarationValidationSchema}
				button={<FormButtonBottom title="Submit" testID={'submit-travel-declaration-button'} />}
			>
				<AvoidKeyboard>
					<Header
						leftComponent={{
							icon: 'chevron-left',
							type: 'font-awesome',
							testID: 'header-back-button',
							onPress: handleHeaderLeftBtn,
						}}
						centerComponent={{
							text: 'Travel Declaration Form',
							style: Typography.H6,
						}}
					/>
					<View style={{ paddingHorizontal: 20 }}>
						<FormPicker
							testID={'travel-type-button'}
							name={'travelType'}
							label={'Travel'}
							data={TRAVEL_TYPES}
							dataLabel={'name'}
							dataValue={'name'}
							mandatory={true}
							onSelect={handleTravelTypeSelection}
						/>
						<View style={styles.datesContainer}>
							<FormCalendarModal
								label="From"
								name="fromDate"
								minimumDate={getMinDate('from', '')}
								maximumDate={getMaxDate('from', selectedTravelType)}
								mandatory={true}
								pastScrollRange={11}
								futureScrollRange={selectedTravelType === 'Domestic' ? 1 : 3}
								dateFormat={'DD/MM/YYYY'}
								disabled={isDisabledDateFields}
								onDayPress={handleFromDatePress}
							/>
							<Space height={5} />
							<FormCalendarModal
								label="To"
								name="toDate"
								minimumDate={getMinDate('to', selectedFromDate)}
								maximumDate={getMaxDate('to', selectedTravelType)}
								mandatory={true}
								pastScrollRange={11}
								futureScrollRange={selectedTravelType === 'Domestic' ? 1 : 3}
								dateFormat={'DD/MM/YYYY'}
								disabled={isDisabledDateFields}
							/>
						</View>
						<Space height={5} />
						<Collapsible collapsed={selectedTravelType !== 'Domestic'}>
							<FormPicker
								testID={'state-button'}
								name={'stateId'}
								label={'State'}
								data={stateList}
								dataLabel={'name'}
								dataValue={'stateId'}
								onSelect={handleStateSelection}
								mandatory={true}
							/>
							<Space height={5} />
							<FormPicker
								testID={'city-button'}
								name={'cityName'}
								label={'City'}
								data={cityList}
								dataLabel={'name'}
								dataValue={'name'}
								mandatory={true}
								disabled={isDisabledCityField}
							/>
							<Space height={5} />
						</Collapsible>

						<Collapsible collapsed={selectedTravelType !== 'International'}>
							<FormPicker
								testID={'continent-button'}
								name={'continent'}
								label={'Continent'}
								data={continentList}
								dataLabel={'continentName'}
								dataValue={'continentName'}
								mandatory={true}
							/>
							<Space height={5} />
							<FormTextInput
								name={'country'}
								label={'Country'}
								textInputStyle={{ color: colors.shadow }}
								maxLength={100}
								placeholder="Please fill in the name of country/countries"
								editable
								mandatory={true}
							/>
						</Collapsible>
						<Space height={5} />
						<FormPicker
							testID={'purpose-button'}
							name={'remarks'}
							label={'Purpose'}
							data={purposeList}
							dataLabel={'desc'}
							dataValue={'desc'}
							mandatory={true}
						/>
						<Space height={5} />
						<Text variant={'H6'}>Optional</Text>
						<Space height={5} />
						<FormTextInput
							testID={'travel-remarks-text-input'}
							name={'otherRemarks'}
							label={'Remarks'}
							textInputStyle={{ color: colors.shadow }}
							maxLength={100}
							placeholder="Enter travel remarks"
							editable
						/>
					</View>
				</AvoidKeyboard>
			</Form>
		</Screen>
	);
};
