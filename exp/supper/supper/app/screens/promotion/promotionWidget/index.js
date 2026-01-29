import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPromoList, getPromotion } from 'stores';
import { PromotionWidgetView } from './component';
import { LOADING } from 'constant';
import { algorithm } from 'utils';

const count = 20;
const noOfColumns = 2;

export const PromotionWidget = ({ onPress }) => {
	const dispatch = useDispatch();
	const { promotionList, status } = useSelector(getPromotion);
	const [category] = useState(0);
	const [reachEnd, setReachEnd] = useState(false);
	const [promos, setPromos] = useState([]);

	useEffect(() => {
		dispatch(fetchPromoList({ lastId: 1, count, category }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPromos(algorithm.toMatrix(promotionList, noOfColumns));
		setReachEnd(promotionList.length < count);
	}, [promotionList]);

	const handlePromotionItem = (e, id) => {
		onPress(e, id);
	};

	const props = {
		handlePromotionItem,
		promos,
		reachEnd,
		loading: status === LOADING,
	};

	return <PromotionWidgetView {...props} />;
};
