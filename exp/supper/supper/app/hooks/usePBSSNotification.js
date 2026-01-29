import { useEffect } from 'react';
import routes from '../navigations/routes';
import { useSelector } from 'react-redux';
import { getNotification } from 'stores';

export const usePBSSNotification = (navigation) => {
	const { pushNotification } = useSelector(getNotification);
	const { isClicked } = pushNotification;

	useEffect(() => {
		if (isClicked) {
			setTimeout(() => {
				navigation.navigate(routes.NOTIFICATION_NAVIGATOR);
			}, 100);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pushNotification]);
};
