import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Linking } from 'react-native';
import { fetchPromoDetails, getPromotion } from 'stores';
import { fetchPDF } from 'apis';
import PromotionDetailsView from './component';

export const PromotionDetails = ({ route }) => {
	const dispatch = useDispatch();
	const promoId = route.params.promoId;
	const { promotionDetails, status } = useSelector(getPromotion);
	const scrollViewRef = useRef();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [source, setSource] = useState({ uri: '' });

	useEffect(() => {
		dispatch(fetchPromoDetails({ promoId }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOpenModalPDF = async (docUrl) => {
		setIsModalVisible(true);
		const response = await fetchPDF(docUrl);
		if (response.ok) {
			setSource({
				uri: 'data:application/pdf;base64,' + response.data,
				cache: true,
			});
		}
	};

	const handleClosePdfModal = () => {
		setSource({ uri: '' });
		setIsModalVisible(false);
	};

	const handleOpenUrl = (url) => Linking.openURL(url);

	const props = {
		handleOpenModalPDF,
		handleClosePdfModal,
		handleOpenUrl,
		promotionDetails,
		status,
		source,
		isModalVisible,
	};

	return <PromotionDetailsView {...props} ref={scrollViewRef} />;
};
