import { captureRef } from 'react-native-view-shot';
import { userActionAdded } from 'stores';
import RNFS from 'react-native-fs';
import moment from 'moment';

const saveImage = async (viewRef) => {
	return captureRef(viewRef, {
		format: 'jpg',
		quality: 0.0,
	}).then(
		(uri) => {
			return uri;
		},
		(error) => {
			console.error(error);
			return null;
		},
	);
};

export const addAnalyticCheckpoint = async (props) => {
	const { module, screen, action, dispatch, buttonEvent } = props;

	const uri = '';

	const { timestamp, pageX, pageY } = buttonEvent || {};

	const checkpoint = {
		id: String(timestamp),
		module,
		screen,
		action,
		positionX: pageX?.toFixed(0) ?? 0,
		positionY: pageY?.toFixed(0) ?? 0,
		imageUrl: uri,
		timeStamp: String(timestamp),
	};

	dispatch(userActionAdded(checkpoint));
};

export const formatAnalyticsLogs = (data) => {
	return data.map((item) => ({
		...item,
		imageUrl: null,
	}));
};

export const deleteScreenshot = (filepath) => {
	if (filepath !== null) {
		RNFS.exists(filepath)
			.then((result) => {
				if (result) {
					return RNFS.unlink(filepath)
						.then(() => {
							console.log('FILE DELETED');
						})
						.catch((err) => {
							console.log('deleteFile:' + err.message);
						});
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	}
};

export const dummyActionEvent = () => ({
	timestamp: moment().unix(),
	pageX: 0,
	pageY: 0,
	locationX: 0,
	locationY: 0,
});
