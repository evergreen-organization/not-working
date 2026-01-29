import React, { useEffect } from 'react';
import Moment from 'moment';
import { fetchNewsList, getNews, newsReset } from 'stores';
import { useDispatch, useSelector } from 'react-redux';

import { showFailure } from 'utils';
import { LOADING } from 'constant';

import { NewsView } from './component';
import { NEWS_TYPE } from './constant';

export const News = ({ navigation }) => {
	const { news, status } = useSelector(getNews);
	const dispatch = useDispatch();
	Moment.locale('en');

	useEffect(() => {
		dispatch(newsReset());
		(async () => await fetchNews(NEWS_TYPE.FETCH))();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchNews = async (type) => {
		if (type === NEWS_TYPE.REFRESH) {
			dispatch(newsReset());
		}
		const { payload } = await dispatch(
			fetchNewsList({
				startWith: type === NEWS_TYPE.MORE ? news.length : 0,
				count: 10,
			}),
		);
		if (payload?.problem) {
			return showFailure(payload.problem);
		}
	};

	const handleRefresh = () => fetchNews(NEWS_TYPE.REFRESH);

	const handleReachEnd = () => fetchNews(NEWS_TYPE.MORE);

	const props = {
		handleRefresh,
		handleReachEnd,
		news,
		loading: status === LOADING,
		navigation,
	};

	return <NewsView {...props} />;
};
