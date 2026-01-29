import React, { useCallback } from 'react';
import { TModal } from '../bannerCarousel/types';
import WidgetModal from '../widgetModal';
import { PdfModal } from 'organisms';
import { isIos } from 'constant';

const BannerPopUp = ({
	modalType,
	setModalType,
}: {
	modalType: TModal;
	setModalType: (value: TModal) => void;
}) => {
	const closeModal = useCallback(() => {
		setModalType(null);
	}, [modalType]);

	if (modalType?.type === 'WIDGET') {
		return <WidgetModal isVisible={!!modalType} closeModal={closeModal} />;
	}
	if (modalType?.type === 'PDF') {
		const pdfSource = isIos ? modalType?.pdfUrl?.ios : { uri: modalType?.pdfUrl?.android };
		return <PdfModal source={pdfSource} isVisible={!!modalType} closeModal={closeModal} />;
	}

	return null;
};

export default BannerPopUp;
