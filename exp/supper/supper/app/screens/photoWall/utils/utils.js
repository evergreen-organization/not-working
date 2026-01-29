import { GIF_ONLY, TemplateList, VIDEO } from './data';
import { convertToBase64 } from './base14Converter';
import Share from 'react-native-share';
import { Platform } from 'react-native';
import { showInfo } from 'utils';

export const isTemplateEditable = (id) => {
	const template = TemplateList.find((template) => template.id === id);
	return !(template?.type === GIF_ONLY || template?.type === VIDEO);
};

export const removeLeadingSlashFromPath = (filePath) => {
	return filePath.startsWith('/') ? filePath.slice(1) : filePath;
};

export const formatVideoMedia = async (video) => {
	const videoBase64 = Platform.OS === 'ios' ? '' : await convertToBase64(video).then();
	return {
		url:
			Platform.OS === 'ios'
				? removeLeadingSlashFromPath(video)
				: `data:video/mp4;base64,${videoBase64}`,
		type: 'video/mp4',
	};
};

const formatShareOptions = async ({ type, data, photoBase64 }) => {
	if (type === VIDEO) {
		return formatVideoMedia(data.video);
	}

	if (type === GIF_ONLY) {
		const gifBase64 = await convertToBase64(data.gif).then();
		return {
			url: 'data:image/gif;base64,' + gifBase64,
		};
	}

	if (!photoBase64) {
		return showInfo('Image is not ready. Please try again.');
	}

	return {
		url: photoBase64,
	};
};
export const shareMediaFile = async ({ type, data, photoBase64 }) => {
	const shareOptions = await formatShareOptions({ type, data, photoBase64 });
	return Share.open(shareOptions)
		.then((res) => {})
		.catch((err) => {
			console.log('err share', err);
		});
};
