import { vCard } from '../vcfGenerator';
import utf8 from 'utf8';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Alert, NativeModules, Platform } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { isIos, WIDGET_APP_GROUP, WIDGET_SHARED_STORAGE_KEY } from 'constant';

const { SharedStorage } = NativeModules;

export const convertToObject = (cardData) => {
	const cardInfo = {};
	cardData?.forEach((item) => {
		if (item.isVisible) {
			cardInfo[item.key] = item.value;
		}
	});

	return cardInfo;
};
export const getBase64FromTempFile = async (tempFileUrl) => {
	try {
		const base64String = await RNFS.readFile(tempFileUrl, 'base64');

		return base64String;
	} catch (error) {
		console.error('Error reading file:', error);
	}
};
export const captureBusinessCard = (businessCardRef) => {
	return new Promise((resolve) => {
		businessCardRef.current?.capture().then((uri) => {
			getBase64FromTempFile(uri).then((cardScreenshot) => {
				resolve(cardScreenshot);
			});
		});
	});
};
export const cardImageShare = async (cardImage) => {
	const url = `data:image/png;base64,${cardImage}`;
	const shareOptions = {
		title: 'Share via',
		url: url,
	};
	await Share.open(shareOptions);
};
export const handleShare = (eBizData, cardImage) => {
	const cardInfo = convertToObject(eBizData);

	const {
		name,
		company,
		branchTel,
		email,
		mobileNumber,
		branchName,
		branchFax,
		branchAddress,
		officeAddress,
		directTelNo1,
		directTelNo2,
		designation,
	} = cardInfo;

	vCard.firstName = name;

	vCard.organization = company;

	vCard.workFax = branchFax ? branchFax.replace(/ /g, '').split(',') : '';

	vCard.email = email || '';
	vCard.cellPhone = mobileNumber ? mobileNumber.replace(/ /g, '').split(',') : '';
	const base64Image = cardImage;
	vCard.logo = { url: base64Image, mediaType: 'PNG', base64: true };
	vCard.photo = { url: base64Image, mediaType: 'PNG', base64: true };
	vCard.workPhone = branchTel ? branchTel.replace(/ /g, '').split(',') : '';
	vCard.workDirect = directTelNo1 ? directTelNo1.replace(/ /g, '').split(',') : '';
	vCard.workDirect2 = directTelNo2 ? directTelNo2.replace(/ /g, '').split(',') : '';

	vCard.title = designation;

	let tempAddress =
		!!branchName && (!!branchAddress || !!officeAddress)
			? branchName + ', ' + (branchAddress || officeAddress)
			: branchName;

	vCard.workAddress = {
		label: '',
		street: '',
		city: tempAddress,
		stateProvince: '',
		postalCode: '',
		countryRegion: '',
	};

	const vCardBytes = utf8.encode(vCard.getFormattedString());

	const vCardBase64 = ReactNativeBlobUtil.base64.encode(vCardBytes);

	if (Platform.OS === 'android') {
		Share.open({
			url: 'data:text/x-vcard;base64,' + vCardBase64,
			filename: 'VCard',
		}).catch((err) => {
			console.log(err);
		});
	} else {
		const filepath = ReactNativeBlobUtil.fs.dirs.CacheDir + '/vcard.vcf';
		ReactNativeBlobUtil.fs
			.writeFile(filepath, vCardBase64, 'base64')
			.then(async () => {
				await Share.open({
					url: 'file://' + filepath,

					filename: 'VCard',
				});
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(async () => {
				await ReactNativeBlobUtil.fs.unlink(filepath);
			});
	}
};

export const eBizErrorPrompt = (payload) => {
	const problemMessage = payload?.problem ?? 'Network Error';
	Alert.alert('Error', problemMessage, [{ text: 'OK' }]);
};

export const storeEbizCardInSharedStorage = (cardImage: string) => {
	if (!cardImage) {
		return;
	}

	SharedStorage.setData(
		WIDGET_SHARED_STORAGE_KEY.eBizCard,
		isIos ? cardImage : 'data:image/png;base64,' + cardImage,
		WIDGET_APP_GROUP,
		() => {},
	);
};

export const removeEbizCardInSharedStorage = () => {
	SharedStorage.removeData(WIDGET_SHARED_STORAGE_KEY.eBizCard, WIDGET_APP_GROUP, () => {});
};
