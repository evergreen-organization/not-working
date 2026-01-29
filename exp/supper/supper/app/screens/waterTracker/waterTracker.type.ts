import { FormikHelpers, FormikValues } from 'formik';
import { ImageSourcePropType } from 'react-native';

export interface FormDateTimePickerType {
	name: string;
	title: string;
	image: ImageSourcePropType;
	defaultTime: number;
}

export interface FormTextInputType {
	title: string;
	image: ImageSourcePropType;
	name: string;
	maxLength: number;
	showCounter?: boolean;
}

export interface WaterTrackerFormViewType {
	formInitialValues: FormikValues;
	handleFormSubmit: (
		values: FormikValues,
		formikHelpers: FormikHelpers<FormikValues>,
	) => void | Promise<any>;
	formValidationSchema: any;
}

export interface WaterTrackerViewType {
	dailyGoal: number;
	enableReminder: boolean;
	waterIntakeVolume: number;
	timeSchedule: Array<string>;
	handleDrink: () => {} | void;
	handleSwitchCup: (value: number) => {} | void;
	handleDrinkWaterReminder: (value: boolean) => void | Promise<void>;
	handleAddWaterIntake: () => {} | void;
}
