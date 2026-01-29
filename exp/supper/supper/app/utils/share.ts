import Share from 'react-native-share';

export const formatImageUri = (uri: string) => {
	const formattedUri = uri.replace(/(\r\n|\n|\r)/gm, '');
	return `data:image/png;base64,${formattedUri}`;
};
export const share = (url: string) => {
	return Share.open({ url })
		.then()
		.catch((err) => console.log(err));
};
