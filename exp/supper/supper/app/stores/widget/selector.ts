import { createSelector } from '@reduxjs/toolkit';
import { IInitialState } from './reducer';

//@ts-ignore
export const getQuickLinks = createSelector(
	(state) => state.widget,
	(widget: IInitialState) => widget?.quickLinks ?? [],
);

//@ts-ignore
export const getMiniQuickLinks = createSelector(
	(state) => state.widget,
	(widget: IInitialState) => widget?.miniQuickLinks ?? [],
);
