import React, { forwardRef } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import { Screen, Text } from 'atoms';
import { Header } from 'molecules';
import { PBSSSubmit } from 'softToken';
import { Typography } from 'styles';
import { Form, FormButtonBottom } from 'components';
import { FormField } from '../user/selfService/components';

import { stepIndicatorStyles, styles } from './styles';
import { getInitialValue, getQuestionArray } from './utils';
import { answerKey, validationScheme } from './constant';

export const ChallengeQuestionsView = (props, ref) => {
	const {
		handleComplete,
		handleCancel,
		handleStepIndicator,
		preHandleSubmitAnswer,
		name,
		currentIndex,
		questions,
		transactionObj,
		startSecureSign,
		submissionLoading,
		handleHeaderLeftBtn,
	} = props;

	const { viewableItemsChanged, carouselRef } = ref;
	const { width } = useWindowDimensions();

	const renderQuestions = ({ item, index }) => (
		<View style={{ ...styles.formContainer, width }} key={index}>
			<Form
				initialValues={getInitialValue(index)}
				onSubmit={preHandleSubmitAnswer}
				enableReinitialize={true}
				validationSchema={validationScheme[index]}
				enableScrollView={false}
				button={
					<FormButtonBottom
						testID={`challenge-question-next-button-${index}`}
						title={'Next'}
						loading={submissionLoading}
					/>
				}
			>
				<View style={styles.formView}>
					<View>
						<Text variant={'P7'} style={styles.labelQuestion}>
							{item}
						</Text>
					</View>
					<FormField
						testID={`challenge-question-${index}`}
						name={answerKey[index]}
						placeholder="Your answer here"
						trim
					/>
				</View>
			</Form>
		</View>
	);

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: name,
					style: Typography.H6,
				}}
			/>
			<View style={styles.container}>
				<View style={styles.stepIndicator}>
					<StepIndicator
						customStyles={stepIndicatorStyles}
						currentPosition={currentIndex}
						stepCount={3}
						onPress={handleStepIndicator}
					/>
				</View>
				<FlatList
					ref={carouselRef}
					data={getQuestionArray(questions)}
					renderItem={renderQuestions}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_, i) => i.toString()}
					scrollEventThrottle={32}
					onViewableItemsChanged={viewableItemsChanged}
					scrollEnabled={false}
					pagingEnabled
					viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
				/>
			</View>
			<PBSSSubmit
				transactionObj={transactionObj}
				activated={startSecureSign}
				onComplete={handleComplete}
				onCancel={handleCancel}
			/>
		</Screen>
	);
};

export default forwardRef(ChallengeQuestionsView);
