import React, { useEffect, useRef } from 'react';
import { PBStartHereView } from './component';

const PB_START_HERE = 'https://www.surveymonkey.com/r/pbstarthere';

export const PBStartHere = ({ navigation }) => {
	const isMounted = useRef(true);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	const handleBackPressed = () => {
		navigation.goBack();
	};

	const props = {
		uri: PB_START_HERE,
		handleBackPressed,
	};

	return <PBStartHereView {...props} />;
};
