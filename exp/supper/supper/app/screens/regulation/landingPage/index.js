import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'navigations/routes';
import { pathsReset, removeFavouritePath } from 'stores/regulation/reducer';
import { fetchPDF } from 'apis/pdfAPI';
import { getRegulations } from 'stores/regulation';
import { RegulationLandingPageComponent } from './component';
import { showFailure } from 'utils';
import { navigate } from 'navigations/RootNavigation';

export const RegulationLandingPage = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { regulationDetails } = route.params || {};
	const { landingPageDetail: landingDetails, name: headerTitle } = regulationDetails;
	const { favouritePath } = useSelector(getRegulations);

	const [swipeableItem] = useState([]);
	const contentWebViewRef = useRef();
	const [source, setSource] = useState({ uri: '' });
	const [imageVisible, setImageVisible] = useState(false);
	const [isResourceModalVisible, setIsResourceModalVisible] = useState(false);
	const [isPDFModalVisible, setIsPDFModalVisible] = useState(false);
	const [isRateModalVisible, setIsRateModalVisible] = useState(false);
	const [imageUri, setImageUri] = useState([{}]);
	const [resourceUrl, setResourceUrl] = useState('');
	const [imageIndex] = useState(0);
	const [isModalGuideVisible, setIsModalGuideVisible] = useState(false);

	const selectedRow = useRef();

	const handleSwipeToOpen = (_selectedRow) => (selectedRow.current = _selectedRow);
	const handleOnDeleteFavouritePath = (index) => {
		selectedRow.current?.close();
		dispatch(removeFavouritePath({ index }));
	};

	const handleOnPressStart = () => {
		dispatch(pathsReset());
		goToDetails();
	};

	const handleOnSelectSavedPath = (index) => goToDetails(favouritePath[index]);

	const goToDetails = (selectedPath) =>
		navigation.navigate(routes.REGULATION_DETAILS, {
			regulationDetails,
			selectedPath,
		});

	const openModalResources = (url) => {
		setIsModalGuideVisible(false);

		setResourceUrl(url);
		setTimeout(() => {
			setIsResourceModalVisible(true);
		}, 1000);
	};

	const openModalImage = (uri) => {
		setImageUri([{ uri }]);
		navigate(routes.IMAGE_VIEW, { data: [{ uri }] });
	};

	const openModalPDF = async (url) => {
		setIsModalGuideVisible(false);

		setTimeout(() => {
			setIsPDFModalVisible(true);
		}, 1000);
		const response = await fetchPDF(url);

		if (!response?.ok) {
			setIsPDFModalVisible(false);
			return showFailure('Failed to fetch PDF. Please try again later.');
		}
		setSource({
			uri: 'data:application/pdf;base64,' + response.data,
			cache: true,
		});
	};

	const closeModalPDF = () => {
		setSource({ uri: '' });
		setIsPDFModalVisible(false);
	};

	const closeModalRate = () => {
		setIsRateModalVisible(false);
	};

	const closeModalResource = () => {
		setIsResourceModalVisible(false);
	};

	const webViewOnLoad = () => {
		const script = `var body= document.body,html = document.documentElement
      window.ReactNativeWebView.postMessage(JSON.stringify({'bodyScrollHeight': body.scrollHeight, 
        'bodyOffsetHeight': body.offsetHeight, 
        'bodyClientHeight': body.clientHeight,
        'htmlClientHeight': html.clientHeight,
        'htmlScrollHeight': html.scrollHeight,
        'htmlOffsetHeight': html.offsetHeight
      }))`;

		contentWebViewRef.current.injectJavaScript(script);
	};

	const handleSwipeableRightWillOpen = (_selectedRow) => {
		if (selectedRow.current && selectedRow.current !== _selectedRow) {
			if (selectedRow.current) {
				selectedRow.current.close();
			}
		}
	};

	const handleLongPress = (_selectedRow) => {
		selectedRow.current?.close();
		selectedRow.current = _selectedRow;
		selectedRow.current.openRight();
	};

	const onRate = () => setIsRateModalVisible(true);

	const onGuidePress = () => setIsModalGuideVisible(true);
	const onGuideClose = () => setIsModalGuideVisible(false);

	const props = {
		headerTitle,
		landingDetails,
		contentWebViewRef,
		webViewOnLoad,
		favouritePath,
		handleSwipeToOpen,
		swipeableItem,
		handleSwipeableRightWillOpen,
		handleOnDeleteFavouritePath,
		handleOnSelectSavedPath,
		handleLongPress,
		handleOnPressStart,
		isResourceModalVisible,
		closeModalResource,
		resourceUrl,
		isPDFModalVisible,
		closeModalPDF,
		source,
		isRateModalVisible,
		closeModalRate,
		imageVisible,
		imageUri,
		imageIndex,
		setImageVisible,
		openModalPDF,
		openModalImage,
		openModalResources,
		navigation,
		onRate,
		onGuidePress,
		onGuideClose,
		isModalGuideVisible,
	};

	return <RegulationLandingPageComponent {...props} />;
};
