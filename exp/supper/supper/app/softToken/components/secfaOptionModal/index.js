import React, { useEffect, useState } from 'react';
import { SecfaOptionModalView } from './component';

export const SecfaOptionModal = ({ list, isVisible, onSuccess, onCancel }) => {
	const [visible, setVisible] = useState(false);

	const onPress = (key) => {
		setVisible(false);
		onSuccess({ selectedSecfa: key });
	};

	const closeModal = () => {
		setVisible(false);
		onCancel();
	};

	useEffect(() => {
		if (isVisible) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [isVisible]);

	const props = {
		closeModal,
		onPress,
		visible,
		list,
	};

	return <SecfaOptionModalView {...props} />;
};
