import React, { createRef, useEffect, useRef, useState } from 'react';
import { Platform, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouritePath, updatedPath } from 'stores/regulation/reducer';
import { fetchPDF } from 'apis';
import { showFailure, showInfo } from 'utils';
import RegulationDetailsView from './component';
import {
	findDialog,
	formatImageUri,
	getPreviousAnswer,
	getSavedDialog,
	getStepCopunt,
	isFavouritePath,
	isFinalStep,
	onShowMessage,
	saveAnswer,
	saveDialog,
} from './utils';
import { getFavouritePath } from 'stores';
import { colorBlue, colorRed } from './styles';
import { navigate } from 'navigations/RootNavigation';
import { routes } from 'navigations';

const _carousel = createRef();

export const RegulationDetails = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const { regulationDetails, selectedPath } = route.params || {};
	const {
		dialogs: regulationDialogs,
		circularCategoryDetails,
		answerMappings,
		name: headerTitle,
	} = regulationDetails;
	const favouritePath = useSelector(getFavouritePath);

	const [activeTab, setActiveTab] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [previousSelectionVisible, setPreviousSelectionVisible] = useState(false);
	const [previousSelection, setPreviousSelection] = useState([]);
	const [tabs, setTabs] = useState([regulationDialogs[0]]);

	const [isDefinitionsModalVisible, setIsDefinitionsModalVisible] = useState(false);
	const [isPDFModalVisible, setIsPDFModalVisible] = useState(false);
	const [isAttachmentModalVisible, setIsAttachmentModalVisible] = useState(false);

	const [source, setSource] = useState({ uri: '' });
	const [definitions, setDefinitions] = useState([]);
	const [attachments, setAttachments] = useState([]);
	const [images, setImages] = useState([]);
	const [imageUri, setImageUri] = useState([{}]);
	const [imageVisible, setImageVisible] = useState(false);
	const [imageIndex, setImageIndex] = useState();

	const carouselRef = useRef(null);

	useEffect(() => {
		if (selectedPath) {
			applySavedPath();
		}
	}, []);

	const applySavedPath = () => {
		const { dialogs, answers } = selectedPath.path || {};

		//Reset steps
		setSelectedAnswers(answers);
		setTabs([dialogs[0]]);
		setActiveTab(0);
		carouselRef.current.scrollToIndex({ index: 0 });

		// Snap carousel to final step in saved path
		const presetTabs = getSavedDialog(dialogs, regulationDialogs);
		setTabs(presetTabs);
		presetTabs.forEach((item, index) => {
			if (index > 0) {
				setTimeout(() => {
					carouselRef.current.scrollToIndex({ index });
					setActiveTab(index);
				}, index * 200);
			}
		});
		updatePrevSelection(answers, presetTabs.length);
	};

	const onStepProgressPress = (stepPosition) => {
		if (stepPosition < tabs.length) {
			setActiveTab(stepPosition);
			carouselRef.current.scrollToIndex({ index: stepPosition });
		}
	};

	const onSelectedAnswerPress = () => setPreviousSelectionVisible(!previousSelectionVisible);
	const handleSaveToFavourite = () => {
		Vibration.vibrate(Platform.OS === 'android' ? 50 : [50]);
		if (favouritePath.length > 5) {
			return onShowMessage(
				'Opps...Max favourite paths reached',
				'Please remove unwanted path in previous page',
				'danger',
				colorRed,
				'danger',
			);
		}

		const { circularId } = circularCategoryDetails;
		const answers = saveAnswer(selectedAnswers, activeTab);
		if (!circularId || answers.length === 0) {
			return showInfo('Cannot save empty path');
		}

		if (isFavouritePath(favouritePath, answers)) {
			return onShowMessage(
				'Opps...Existing favourite path',
				'Please save a different path',
				'danger',
				colorRed,
				'danger',
			);
		}

		dispatch(
			addFavouritePath({
				circularId,
				path: { dialogs: saveDialog(tabs, activeTab), answers },
			}),
		);
		return onShowMessage('Success', 'Path saved as favourite', 'info', colorBlue, 'info');
	};

	const updateActiveTab = ({ tab, answers }) => {
		if (tab !== activeTab) {
			setActiveTab(tab);
			carouselRef.current.scrollToIndex({ index: tab });
		}
		updatePrevSelection(answers, tab);
	};

	const updatePrevSelection = (answer, currentTab) => {
		setPreviousSelectionVisible(false);
		const tempPrevSelection = answer.filter((item, index) => index < currentTab);
		setPreviousSelection(tempPrevSelection);
	};

	const handleOpenImage = (index) => {
		setIsAttachmentModalVisible(false);
		setImageIndex(index);
		setTimeout(() => {
			navigate(routes.IMAGE_VIEW, { data: imageUri });
		}, 400);
	};

	const closeModalPDF = () => {
		setSource({ uri: '' });
		setIsPDFModalVisible(false);
	};

	const closeModalAttachment = () => {
		setIsAttachmentModalVisible(false);
	};

	const closeDefinitionsModal = () => {
		setIsDefinitionsModalVisible(false);
	};

	const handleDialogProgress = (dialogLevel, answer, toDialog) => {
		//Update current answer
		const answers = selectedAnswers.filter((item, index) => index < dialogLevel);
		answers.push(answer);
		setSelectedAnswers(answers);
		dispatch(updatedPath({ answers }));

		if (!toDialog) {
			toDialog = answerMappings.find((answer) =>
				answers.every((ans) => answer.answerCombination.includes(ans.answerId)),
			)?.toDialog;
		}

		const nextTab = findDialog(regulationDialogs, toDialog);
		if (!nextTab) {
			return onShowMessage(
				'Opps... Next dialog not found',
				'Please request assist from back office.',
				'danger',
				colorRed,
				'danger',
			);
		}

		//Update current and next tab
		const tempTabs = tabs.filter((item) => item?.dialogLevel <= dialogLevel);
		tempTabs.push(nextTab);
		setTabs(tempTabs);

		updateActiveTab({ tab: dialogLevel + 1, answers });
	};

	const handleOnOpenPDF = async ({ attachmentUrl }) => {
		const response = await fetchPDF(attachmentUrl);
		setIsAttachmentModalVisible(false);
		if (!response.ok) {
			return showFailure('Failed to fetch PDF. Please try again later.');
		}
		setSource({
			uri: 'data:application/pdf;base64,' + response.data,
			cache: true,
		});
		setTimeout(() => setIsPDFModalVisible(true), 500);
	};

	const onInfoPress = (termDefinitions) => {
		setDefinitions(termDefinitions);
		setIsDefinitionsModalVisible(true);
	};

	const onAttachmentPress = ({ attachments, images: tabImages }) => {
		setAttachments(attachments);
		setImages(tabImages);
		setImageUri(formatImageUri(images));
		setIsAttachmentModalVisible(true);
	};

	const props = {
		onStepProgressPress,
		handleSaveToFavourite,
		handleDialogProgress,
		onInfoPress,
		onAttachmentPress,
		updateActiveTab,
		closeDefinitionsModal,
		closeModalAttachment,
		handleOnOpenPDF,
		handleOpenImage,
		closeModalPDF,
		onSelectedAnswerPress,
		headerTitle,
		activeTab,
		previousSelection,
		previousSelectionVisible,
		tabs,
		isDefinitionsModalVisible,
		definitions,
		isAttachmentModalVisible,
		attachments,
		images,
		isPDFModalVisible,
		source,
		imageVisible,
		imageUri,
		imageIndex,
		setImageVisible,
		_carousel,
		navigation,
		isFinalStep: isFinalStep(tabs, activeTab),
		stepCount: getStepCopunt(regulationDialogs),
		previousAnswer: getPreviousAnswer(activeTab, selectedAnswers),
	};

	return <RegulationDetailsView {...props} ref={carouselRef} />;
};
