import React from 'react';
import ThumbnailMore from 'assets/festive/eCards/preview/preview-more.png';
import Thumbnail1 from 'assets/festive/eCards/preview/preview-1.mp4';

export const E_CARD_CAROUSEL_TYPE = {
	DEFAULT: 'default',
	VIDEO: 'video',
	MORE: 'more',
};
export const CAROUSEL_POP_UP = [
	{
		id: '0',
		type: E_CARD_CAROUSEL_TYPE.VIDEO,
		thumbnail: Thumbnail1,
	},
	{
		id: '1',
		type: E_CARD_CAROUSEL_TYPE.VIDEO,
		thumbnail: Thumbnail1,
	},
	{
		id: '2',
		type: E_CARD_CAROUSEL_TYPE.VIDEO,
		thumbnail: Thumbnail1,
	},
	{
		id: '3',
		type: E_CARD_CAROUSEL_TYPE.VIDEO,
		thumbnail: Thumbnail1,
	},
	{
		id: '4',
		type: E_CARD_CAROUSEL_TYPE.VIDEO,
		thumbnail: Thumbnail1,
	},
	{
		id: '100',
		type: E_CARD_CAROUSEL_TYPE.MORE,
		thumbnail: ThumbnailMore,
	},
];
