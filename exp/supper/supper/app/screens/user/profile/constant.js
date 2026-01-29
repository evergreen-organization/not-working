import IdCardIcon from 'assets/icon/id.png';
import UserIcon from 'assets/icon/user.png';
import FlagIcon from 'assets/icon/flag.png';
import BuildingIcon from 'assets/icon/building.png';

export const PROFILE_DETAIL_ITEMS = (user) => [
	{
		testID: 'profile-staff-id',
		icon: IdCardIcon,
		value: user?.staffId,
	},
	{
		testID: 'profile-designation',
		icon: UserIcon,
		value: user?.designation,
	},
	{
		testID: 'profile-cost-center',
		icon: FlagIcon,
		value: user?.costCenter,
	},
	{
		testID: 'profile-division',
		icon: BuildingIcon,
		value: user?.division,
	},
];
