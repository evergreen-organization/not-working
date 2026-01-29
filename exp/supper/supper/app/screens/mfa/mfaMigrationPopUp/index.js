import React from 'react';
import { MfaMigrationPopUpComp } from './component';

export const MfaMigrationPopUp = ({ isVisible, onClose, onAgree }) => {
	const props = { onAgree, isVisible, onClose };

	return <MfaMigrationPopUpComp {...props} />;
};
