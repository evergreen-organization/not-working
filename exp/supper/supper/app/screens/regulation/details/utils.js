import { showMessage } from 'react-native-flash-message';

export const isFinalStep = (tabs, activeTab) => {
	const activeTabDetails = tabs?.find(
		(dialog) => dialog?.dialogLevel === activeTab,
	);
	return activeTabDetails?.answers?.length === 0;
};

export const getStepCopunt = (regulationDialogs) => {
	const highestLevelDialog = regulationDialogs.reduce((acc, item) => {
		acc = acc.dialogLevel > item.dialogLevel ? acc : item;
		return acc;
	}, 0);
	return highestLevelDialog?.dialogLevel + 1;
};

export const getPreviousAnswer = (activeTab, selectedAnswers) =>
	activeTab > 0 ? selectedAnswers[activeTab - 1]?.answerText : '';

export const formatImageUri = (images) =>
	images.map((image) => {
		return { uri: image.imageUri };
	});

export const onShowMessage = (
	message,
	description,
	type,
	backgroundColor,
	icon,
) => {
	showMessage({
		message,
		description,
		type,
		backgroundColor,
		icon,
	});
};

export const saveAnswer = (selectedAnswers, activeTab) => {
	if (!selectedAnswers || selectedAnswers.length === 0) {
		return [];
	}
	return selectedAnswers?.filter((item, index) => index < activeTab);
};
export const saveDialog = (tabs, activeTab) =>
	tabs.filter((_, index) => index <= activeTab).map(({ dialogId }) => dialogId);

export const isFavouritePath = (favouritePath, answers) => {
	const favourites = favouritePath.map(({ path }) => path?.answers);
	return favourites.some(
		(arr) =>
			arr?.length === answers?.length &&
			arr.every((item, index) => item === answers[index]),
	);
};

export const findDialog = (array, dialogId) =>
	array.find((item) => item.dialogId == dialogId);

export const getSavedDialog = (dialogs, regulationDialogs) =>
	dialogs.map((dialog) => {
		return findDialog(regulationDialogs, dialog);
	});
