import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { avatarStored, getAvatar } from 'stores';

import { AVATAR_PACK, showFestive } from 'constant';

import { ProfileView } from './component';
import { FestiveProfileView } from './componentFestive';
import { useNavigation } from '@react-navigation/native';

export const Profile = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const user = useSelector((state) => state.user);
	const avatar = useSelector(getAvatar);
	const [showChangeAvatar, setShowChangeAvatar] = useState(false);

	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};

	const handleChangeAvatar = (image) => {
		saveData(image);
		setShowChangeAvatar(false);
	};

	const saveData = (image) => {
		const avatarTemp = {
			image: image,
		};
		dispatch(avatarStored(avatarTemp));
	};

	const { image: avatarImage } = AVATAR_PACK.find((av) => av.id === avatar.image) || {
		image: AVATAR_PACK[0],
	};

	const props = {
		handleChangeAvatar,
		handleHeaderLeftBtn,
		setShowChangeAvatar,
		user,
		avatarImage,
		showChangeAvatar,
		avatar,
	};

	if (showFestive) {
		return <FestiveProfileView {...props} />;
	}
	return <ProfileView {...props} />;
};
