import { SecurePacDisplayView } from './component';
import React, { useEffect, useState } from 'react';

export const SecurePacDisplay = ({
	isVisible,
	onSuccess,
	data,
	state,
	dispatch,
}) => {
	const { signature } = data || {};

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setVisible(true);
		}
	}, [isVisible]);

	const closePac = () => {
		setVisible(false);
		onSuccess();
	};

	const onClose = async () => {
		setLoading(true);
		// Call retrieve transaction status api with transaction ID -- const { transactionId } = data || {};
		setLoading(false);
		closePac();
	};

	const props = {
		onClose,
		visible,
		signature,
		loading,
	};

	return <SecurePacDisplayView {...props} />;
};
