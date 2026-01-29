import { displayPromoDate } from '../utils/utils';
import algorithm from '../../../utils/algorithm';

test('Promotion- Create expire date correctly', () => {
	const promotionDetails1 = {
		promoStartPeriod: '2022-12-31T00:00:00',
	};

	const promotionDetails2 = {
		promoEndPeriod: '2022-12-30T00:00:00',
	};

	const promotionDetails3 = {
		promoStartPeriod: '2022-12-23T00:00:00',
		promoEndPeriod: '2022-12-30T00:00:00',
	};

	const promotionDetails4 = {};

	expect(displayPromoDate({ promotionDetails: promotionDetails1 })).toBe(
		'31 Dec 2022',
	);

	expect(displayPromoDate({ promotionDetails: promotionDetails2 })).toBe(
		'30 Dec 2022',
	);

	expect(displayPromoDate({ promotionDetails: promotionDetails3 })).toBe(
		'23 Dec 2022-30 Dec 2022',
	);

	expect(displayPromoDate({ promotionDetails: promotionDetails4 })).toBe(null);
});

test('Promotion- Create new promotion list', () => {
	const list = [{ key: 1 }, { key: 2 }, { key: 3 }];
	const formattedList = [
		{
			key: 0,
			value: [{ key: 1 }, { key: 2 }],
		},
		{
			key: 1,
			value: [{ key: 3 }],
		},
	];
	expect(algorithm.toMatrix(list, 2)).toStrictEqual(formattedList);
});
