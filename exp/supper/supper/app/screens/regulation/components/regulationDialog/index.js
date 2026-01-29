import React, { useState } from 'react';
import { Vibration } from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getRegulations, updateDateLastStamp } from 'stores/regulation';
import { RegulationDialogView } from './component';
import { isArrayItemExist, isArrayNotEmpty, isContentNotEmpty } from './utils';
import { BACKEND_DATE_TIME } from 'configs/dateFormat';

export const RegulationDialog = ({
	tab,
	onChange,
	onInfoPress,
	onAttachmentPress,
}) => {
	const dispatch = useDispatch();
	const { paths } = useSelector(getRegulations);
	const {
		dialogHeader,
		termDefinitions,
		attachments,
		images,
		dialogContent,
		answers,
		dialogLevel,
		dialogId,
	} = tab;
	const [lastTabPress, setLastTabPress] = useState(null);

	const handleAnswerCardPress = async ({ answerId, answerText, toDialog }) => {
		if (new Date().getTime() - lastTabPress <= 1000) {
			return setLastTabPress(new Date().getTime());
		}

		if (dialogLevel <= 0) {
			await dispatch(
				updateDateLastStamp({
					dialogId,
					answerId,
					clickStamp: moment().format(BACKEND_DATE_TIME),
				}),
			);
		}

		Vibration.vibrate(10);
		setTimeout(() => {
			onChange(dialogLevel, { answerId, answerText }, toDialog);
		}, 100);
	};

	const isAnswerSelected = ({ answerId }) =>
		paths[dialogLevel]?.answerId === answerId || false;

	const props = {
		tab,
		onInfoPress,
		onAttachmentPress,
		handleAnswerCardPress,
		isAnswerSelected,
		headerNotEmpty: isArrayItemExist(dialogHeader),
		contentNotEmpty: isContentNotEmpty(dialogContent),
		termDefinitionsNotEmpty: isArrayNotEmpty(termDefinitions),
		attachmentsNotEmpty: isArrayNotEmpty(attachments),
		imagesNotEmpty: isArrayNotEmpty(images),
		answerNotEmpty: isArrayNotEmpty(answers),
	};

	return <RegulationDialogView {...props} />;
};
