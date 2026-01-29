import React, { createRef, forwardRef, useEffect, useRef } from 'react';
import MapComp from './component';

export const PanelMap = (
	{
		region,
		currentCoordinate,
		selectedPanel,
		focusedPanel,
		onMapPress,
		onMarkerPress,
	},
	ref,
) => {
	const panelsRef = useRef([]);

	useEffect(() => {
		if (selectedPanel) {
			panelsRef.current = selectedPanel.map(() => createRef());

			setTimeout(() => {
				openCallout();
			}, 800);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPanel]);

	useEffect(() => {
		openCallout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [focusedPanel]);

	const openCallout = () => {
		if (panelsRef.current[focusedPanel]?.current?.showCallout) {
			panelsRef.current[focusedPanel].current.showCallout();
		}
	};

	const props = {
		region,
		currentCoordinate,
		selectedPanel,
		onMapPress,
		onMarkerPress,
	};

	const refs = {
		map: ref,
		panelsRef,
	};

	return <MapComp {...props} ref={refs} />;
};

export default forwardRef(PanelMap);
