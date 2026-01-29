import { useRoute } from '@react-navigation/native';
import { COMPLETE_DEEP_LINKS, DEEP_LINKS, HOME_DEEP_LINKS } from 'constant';
import { routes } from 'navigations';
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getDeeplink, setDeeplink } from 'stores';

interface IUseHandleDeeplink {
	eventActions: Record<keyof typeof DEEP_LINKS, Function>;
	ignoreInitialUrl?: boolean;
	loginCallback?: () => void;
}

let isFirstTime = true;

const useHandleDeeplink = ({
	eventActions,
	ignoreInitialUrl,
	loginCallback,
}: IUseHandleDeeplink) => {
	const route = useRoute();
	const currentRouteName = route?.name;

	const dispatch = useDispatch();
	const homeInitialDeeplink = useSelector(getDeeplink);

	useEffect(() => {
		handleInitialDeeplink();

		if (homeInitialDeeplink) {
			handleDeepLink(homeInitialDeeplink);
		}

		const eventListener = Linking.addEventListener('url', (event) => {
			handleDeepLink(event?.url);
		});

		return () => {
			eventListener.remove();
			isFirstTime = false;
		};
	}, []);

	const handleInitialDeeplink = async () => {
		const initialUrl = ignoreInitialUrl || !isFirstTime ? null : await Linking.getInitialURL();

		handleDeepLink(initialUrl);
	};

	const handleDeepLink = (url?: string | null) => {
		if (!url) {
			return;
		}

		console.log(url);

		try {
			const pathName = getDeeplinkPathName(url);
			const isHome = currentRouteName === routes.HOME;

			if (!eventActions?.[pathName] && HOME_DEEP_LINKS.includes(pathName) && !isHome) {
				const linkObj = COMPLETE_DEEP_LINKS?.[pathName];
				dispatch(setDeeplink({ deeplink: linkObj?.deeplink }));
				loginCallback?.();
			} else {
				setTimeout(() => {
					eventActions?.[pathName]?.();
				}, 300);
				dispatch(setDeeplink({ deeplink: null }));
			}
		} catch (error) {
			console.error('Failed to handle deep link', error);
		}
	};

	const getDeeplinkPathName = (url: string) => {
		return url?.split('://')?.[1] as keyof typeof DEEP_LINKS;
	};

	return { homeInitialDeeplink };
};

export default useHandleDeeplink;
