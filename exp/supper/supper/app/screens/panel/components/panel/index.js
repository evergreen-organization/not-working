import React from 'react';
import { PanelComp } from './component';

export const Panel = ({ panelLength, marker, index, onCall, onOpenOnMap }) => {
	const handleCall = () => {
		onCall(`tel:${marker.tel}`);
	};

	const handleOpenOnMap = () => {
		onOpenOnMap(marker.lat, marker.long, marker.name);
	};

	const props = {
		handleCall,
		handleOpenOnMap,
		panelLength,
		marker,
		index,
	};

	return <PanelComp {...props} />;
};
