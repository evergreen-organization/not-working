import React from 'react';
import { NameCard } from '../../NameCard';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const FrontCard = ({ cardInfo }) => {
	return <NameCard cardInfo={cardInfo} width={windowWidth * 0.89} />;
};
