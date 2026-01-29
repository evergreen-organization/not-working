import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	DEEP_LINK_PREFIX,
	DEEP_LINKS,
	WIDGET_APP_GROUP,
	WIDGET_SHARED_STORAGE_KEY,
} from 'constant';
import { NativeModules } from 'react-native';

const { SharedStorage } = NativeModules;

export interface IQuickLink {
	id: string;
	label: string;
	icon: string;
	deeplink: string;
}

export interface IInitialState {
	quickLinks: Array<IQuickLink | null>;
	miniQuickLinks: Array<IQuickLink | null>;
}

const initialState: IInitialState = {
	quickLinks: [
		{
			id: 'token',
			label: 'Token',
			icon: 'token_disabled',
			deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.token}`,
		},
		null,
		null,
		null,
	],
	miniQuickLinks: [
		{
			id: 'token',
			label: 'Token',
			icon: 'token_disabled',
			deeplink: `${DEEP_LINK_PREFIX}/${DEEP_LINKS.token}`,
		},
		null,
	],
};

const slice = createSlice({
	name: 'widget',
	initialState,
	reducers: {
		setQuickLinks: (
			state,
			{ payload }: PayloadAction<{ quickLinks: IInitialState['quickLinks'] }>,
		) => {
			state.quickLinks = payload.quickLinks;

			SharedStorage.setData(
				WIDGET_SHARED_STORAGE_KEY.quickLinks,
				JSON.stringify({
					firstSlot: payload?.quickLinks?.[0],
					secondSlot: payload?.quickLinks?.[1],
					thirdSlot: payload?.quickLinks?.[2],
					forthSlot: payload?.quickLinks?.[3],
				}),
				WIDGET_APP_GROUP,
				() => {},
			);
		},
		setMiniQuickLinks: (
			state,
			{ payload }: PayloadAction<{ miniQuickLinks: IInitialState['miniQuickLinks'] }>,
		) => {
			state.miniQuickLinks = payload.miniQuickLinks;

			SharedStorage.setData(
				WIDGET_SHARED_STORAGE_KEY.miniQuickLinks,
				JSON.stringify({
					firstSlot: payload?.miniQuickLinks?.[0],
					secondSlot: payload?.miniQuickLinks?.[1],
				}),
				WIDGET_APP_GROUP,
				(error) => {
					if (error) {
						console.error('Error setting data:', error);
					} else {
						console.log('Data set successfully');
					}
				},
			);
		},
	},
});

export const { setQuickLinks, setMiniQuickLinks } = slice.actions;
export default slice.reducer;
