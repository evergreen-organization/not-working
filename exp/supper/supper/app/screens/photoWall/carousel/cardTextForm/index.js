import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import CardTextFormView from './component';
import { useDispatch, useSelector } from 'react-redux';
import { addCardMessage, getAllCardMessage, getCurrentTemplate, updateCardMessage } from 'stores';
import { USER_ANALYTICS, validationMsg } from 'constant';
import { addAnalyticCheckpoint } from 'utils';

export const CardTextForm = ({ navigation, route }) => {
	const viewRef = useRef();
	const dispatch = useDispatch();
	const { data } = route.params || {};
	const cardMessageList = useSelector(getAllCardMessage);
	const currentTemplate = useSelector(getCurrentTemplate);
	const [touchLocation, setTouchLocation] = useState();

	//For Analytics
	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.E_CARDS,
		view: viewRef,
	};

	const existingCardMessage = cardMessageList.find((item) => item.id === currentTemplate);
	const {
		greeting: currentGreeting,
		mainMsg: currentMainMsg,
		footer: currentFooter,
		id,
	} = existingCardMessage || {};
	const newInitialValues = {
		greeting: currentGreeting ?? data?.greeting,
		mainMsg: currentMainMsg ?? data?.mainMsg,
		footer: currentFooter ?? data?.footer,
	};

	const validationSchema = Yup.object().shape({
		...(data?.greeting && {
			greeting: Yup.string().required(validationMsg.required),
		}),
		...(data?.mainMsg && {
			mainMsg: Yup.string().required(validationMsg.required),
		}),
		...(data?.footer && {
			footer: Yup.string().required(validationMsg.required),
		}),
	});

	const handleSubmitCardText = ({ greeting, mainMsg, footer }) => {
		const cardMessageItem = {
			greeting,
			mainMsg,
			footer,
		};
		existingCardMessage
			? dispatch(updateCardMessage({ id: id, ...cardMessageItem }))
			: dispatch(addCardMessage({ id: currentTemplate, ...cardMessageItem }));

		handleFormTouchEvents('formFieldSave').then();
		navigation.goBack();
	};

	const handleHeaderLeftBtn = () => {
		navigation.goBack();
	};

	const handleFormTouchEvents = async (action) => {
		const eCardsFormConfig = {
			screen: USER_ANALYTICS.ECARD_SCREENS.CARD_MESSAGE_FORM,
			buttonEvent: touchLocation,
			action,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...eCardsFormConfig });
	};

	const handleTouchEvents = async (e) => {
		e.persist();
		setTouchLocation(e.nativeEvent);
	};

	const props = {
		handleSubmitCardText,
		handleHeaderLeftBtn,
		handleFormTouchEvents,
		handleTouchEvents,
		newInitialValues,
		validationSchema,
		images: data?.images,
		greetingMaxLength: data?.greetingMaxLength,
		mainMsgMaxLength: data?.mainMsgMaxLength,
	};
	return <CardTextFormView {...props} ref={viewRef} />;
};
