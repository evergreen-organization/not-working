import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { configureStore as configure } from '@reduxjs/toolkit';
import reducer from './reducer';
import { forceLogout } from './middleware';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: [
		'biometric',
		'clinic',
		'notificationNew',
		'guided',
		'trainingCampaign',
		'circular',
		'avatar',
		'waterTracker',
		'pin',
		'softToken',
		'photoWallChristmas',
		'adAwareness',
		'dataCollection',
		'eCardsAdventNew',
		'bingoQuestion',
		'bingoBoard',
		'mfa',
		'tnc',
		'widget',
		'utility',
		'snakeAndLadder',
	], //First layer persist rehydrate all children values if whitelisted.
	timeout: 0,
	version: 2, // need to update whenever new reducer or new key added any reducer
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore() {
	return configure({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(forceLogout),
		enhancers: (getDefaultMiddleware) =>
			__DEV__
				? [...getDefaultMiddleware(), require('../../ReactotronConfig').default.createEnhancer()]
				: getDefaultMiddleware(),
	});
}
