import { createSelector } from '@reduxjs/toolkit';

export const getNews = createSelector(
	(state) => state.news,
	(news) => news,
);
