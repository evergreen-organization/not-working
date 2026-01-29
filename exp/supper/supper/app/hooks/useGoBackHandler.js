import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

export const useGoBackHandler = (onGoBack) => {
	const navigation = useNavigation();

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onGoBack);
		navigation.addListener('gestureStart', onGoBack);

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', onGoBack);
			navigation.removeListener('gestureStart', onGoBack);
		};
	}, [navigation, onGoBack]);
};
