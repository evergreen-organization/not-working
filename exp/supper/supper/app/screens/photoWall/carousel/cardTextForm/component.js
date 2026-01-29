import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { AvoidKeyboard, Screen, Space } from 'atoms';
import { Form, FormButtonBottom, FormField } from 'components';
import { styles } from './styles';
import { colors } from 'configs';
import { ImageInput } from 'organisms';
import { Typography } from 'styles';
import { Header } from 'molecules';
import { USER_ANALYTICS } from 'constant';

const CardTextFormView = (
	{
		handleSubmitCardText,
		newInitialValues,
		validationSchema,
		images,
		handleHeaderLeftBtn,
		handleFormTouchEvents,
		handleTouchEvents,
		mainMsgMaxLength,
		greetingMaxLength,
	},
	ref,
) => {
	const { greeting, mainMsg, footer } = newInitialValues || {};

	return (
		<View style={{ flex: 1 }} ref={ref} onTouchStart={handleTouchEvents} collapsable={false}>
			<Screen>
				<Header
					leftComponent={{
						icon: 'chevron-left',
						type: 'font-awesome',
						testID: 'header-back-button',
						onPress: handleHeaderLeftBtn,
					}}
					centerComponent={{
						text: 'Edit eFestive Card',
						style: Typography.H6,
					}}
				/>
				<View style={styles.background}>
					<AvoidKeyboard>
						<Form
							onSubmit={handleSubmitCardText}
							initialValues={newInitialValues}
							validationSchema={validationSchema}
							button={<FormButtonBottom style={{ marginHorizontal: -20 }} title={'Save'} />}
						>
							{images && (
								<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
									{images.map((image, index) => (
										<ImageInput key={image.id} image={image} imageName={`Picture ${index + 1}`} />
									))}
								</View>
							)}

							<Space height={10} />
							{greeting && (
								<FormField
									name="greeting"
									label={'Header Text'}
									bold={false}
									multiline={true}
									style={styles.input}
									maxLength={greetingMaxLength ?? 70}
									showCounter
									onFocus={() => handleFormTouchEvents(USER_ANALYTICS.ECARD_ACTIONS.EDIT_GREETINGS)}
								/>
							)}

							{mainMsg && (
								<FormField
									name="mainMsg"
									label={'Main Message Text'}
									bold={false}
									multiline={true}
									style={styles.input}
									maxLength={mainMsgMaxLength ?? 150}
									showCounter
									onFocus={() =>
										handleFormTouchEvents(USER_ANALYTICS.ECARD_ACTIONS.EDIT_MAIN_MESSAGE)
									}
								/>
							)}

							{footer && (
								<FormField
									name="footer"
									label={'Footer Text'}
									bold={false}
									multiline={true}
									selectionColor={colors.black}
									style={styles.input}
									maxLength={70}
									showCounter
									onFocus={() => handleFormTouchEvents(USER_ANALYTICS.ECARD_ACTIONS.EDIT_FOOTER)}
								/>
							)}
						</Form>
					</AvoidKeyboard>
				</View>
			</Screen>
		</View>
	);
};

export default forwardRef(CardTextFormView);
