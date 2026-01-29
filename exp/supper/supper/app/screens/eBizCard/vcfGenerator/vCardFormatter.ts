import { Platform } from 'react-native';
import { FormattedAddressParams, FormattedPhotoParams, VCardObject } from './vcf.type';
import Moment from 'moment';

export const vCardFormatter = () => {
	let majorVersion = 3;
	function encodeString(value: string | string[]): string {
		if (value) {
			if (typeof value !== 'string') {
				value = '' + value;
			}
			if (Platform.OS === 'android') {
				return value.replace(/\n/g, '\n').replace(/,/g, ',').replace(/;/g, ';');
			} else {
				return value.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
			}
		}
		return '';
	}

	function newLine() {
		return '\r\n';
	}

	function getFormattedPhoto(props: FormattedPhotoParams) {
		const { photoType, url, mediaType, base64 } = props;
		let params;

		if (majorVersion >= 4) {
			params = base64 ? `;ENCODING=b;MEDIATYPE=image/${mediaType}` : ';MEDIATYPE=image/';
		} else if (majorVersion === 3) {
			params = base64 ? `;TYPE=${mediaType};ENCODING=b` : ';TYPE=';
		} else {
			params = base64 ? ';ENCODING=BASE64;' : ';';
		}

		return photoType + params + ':' + url + newLine();
	}

	function getFormattedAddress(props: FormattedAddressParams) {
		const { encodingPrefix, address, type } = props;

		let formattedAddress = '';

		if (
			address.label ||
			address.street ||
			address.city ||
			address.stateProvince ||
			address.postalCode ||
			address.countryRegion
		) {
			if (majorVersion >= 4) {
				formattedAddress =
					'ADR' +
					encodingPrefix +
					';TYPE=' +
					type +
					(address.label ? ';LABEL="' + encodeString(address.label) + '"' : '') +
					':;;' +
					encodeString(address.street) +
					';' +
					encodeString(address.city) +
					';' +
					encodeString(address.stateProvince) +
					';' +
					encodeString(address.postalCode) +
					';' +
					encodeString(address.countryRegion) +
					newLine();
			} else {
				if (address.label) {
					formattedAddress =
						'LABEL' +
						encodingPrefix +
						';TYPE=' +
						type +
						':' +
						encodeString(address.label) +
						newLine();
				}
				formattedAddress +=
					'ADR' +
					encodingPrefix +
					';TYPE=' +
					type +
					':;;' +
					encodeString(address.street) +
					';' +
					encodeString(address.city) +
					';' +
					encodeString(address.stateProvince) +
					';' +
					encodeString(address.postalCode) +
					';' +
					encodeString(address.countryRegion) +
					newLine();
			}
		}

		return formattedAddress;
	}

	function getFormattedString(vCard: VCardObject): string {
		let formattedVCardString = '';
		formattedVCardString += 'BEGIN:VCARD' + newLine();
		formattedVCardString += 'VERSION:' + vCard.version + newLine();
		let encodingPrefix = majorVersion >= 4 ? '' : ';CHARSET=UTF-8';

		formattedVCardString += formatName(vCard, encodingPrefix);

		formattedVCardString += formatEmails(vCard, encodingPrefix);

		if (vCard.gender) {
			formattedVCardString += 'GENDER:' + encodeString(vCard.gender) + newLine();
		}

		if (vCard.birthday) {
			formattedVCardString += 'BDAY:' + Moment(vCard.birthday).format('YYYYMMDD') + newLine();
		}

		if (vCard.anniversary) {
			formattedVCardString +=
				'ANNIVERSARY:' + Moment(vCard.anniversary).format('YYYYMMDD') + newLine();
		}

		formattedVCardString += formatPhotos(vCard);

		formattedVCardString += formatPhones(vCard);

		formattedVCardString += formatAddresses(vCard, encodingPrefix);

		formattedVCardString += formatOtherFields(vCard, encodingPrefix);

		formattedVCardString += 'REV:' + Moment().format() + newLine();
		formattedVCardString += 'END:VCARD' + newLine();
		return formattedVCardString;
	}

	function formatName(vCard: VCardObject, encodingPrefix: any): string {
		let formattedName =
			vCard.formattedName ||
			[vCard.firstName, vCard.middleName, vCard.lastName].filter(Boolean).join(' ');
		return (
			'FN' +
			encodingPrefix +
			':' +
			encodeString(formattedName) +
			newLine() +
			'N' +
			encodingPrefix +
			':' +
			encodeString(vCard.lastName) +
			';' +
			encodeString(vCard.firstName) +
			';' +
			encodeString(vCard.middleName) +
			';' +
			encodeString(vCard.namePrefix) +
			';' +
			encodeString(vCard.nameSuffix) +
			newLine()
		);
	}

	function formatEmails(vCard: VCardObject, encodingPrefix: any): string {
		let formattedEmails = '';
		[vCard.email, vCard.workEmail].filter(Boolean)?.forEach((email) => {
			formattedEmails += 'EMAIL' + encodingPrefix + ';type=WORK:' + encodeString(email) + newLine();
		});
		return formattedEmails;
	}

	function formatPhotos(vCard: VCardObject): string {
		let formattedPhotos = '';
		[vCard.logo, vCard.photo]
			.filter((photo) => photo.url)
			.forEach((photo) => {
				formattedPhotos += getFormattedPhoto({
					photoType: 'PHOTO',
					url: photo.url,
					mediaType: photo.mediaType,
					base64: photo.base64,
				});
			});
		return formattedPhotos;
	}

	function formatPhones(vCard: VCardObject): string {
		try {
			let formattedPhones = '';
			[...(vCard.cellPhone || []), ...(vCard.pagerPhone || []), ...(vCard.homePhone || [])]
				.filter(Boolean)
				.forEach((phone) => {
					if (majorVersion >= 4) {
						formattedPhones +=
							'TEL;VALUE=uri;TYPE="voice,cell":' + +encodeString(phone) + newLine();
					} else {
						formattedPhones += 'TEL;TYPE=CELL:' + encodeString(phone) + newLine();
					}
				});
			[...(vCard.workPhone || [])].filter(Boolean).forEach((phone) => {
				if (majorVersion >= 4) {
					formattedPhones += 'TEL;VALUE=uri;TYPE="voice,work":' + encodeString(phone) + newLine();
				} else {
					formattedPhones += 'TEL;TYPE=WORK,VOICE:' + encodeString(phone) + newLine();
				}
			});
			[...(vCard.workDirect || [])].filter(Boolean).forEach((phone) => {
				if (majorVersion >= 4) {
					formattedPhones += 'TEL;VALUE=uri;TYPE="voice,work":' + encodeString(phone) + newLine();
				} else {
					formattedPhones += 'TEL;TYPE=WORK,VOICE:' + encodeString(phone) + newLine();
				}
			});
			[...(vCard.workDirect2 || [])].filter(Boolean).forEach((phone) => {
				if (majorVersion >= 4) {
					formattedPhones += 'TEL;VALUE=uri;TYPE="voice,work":' + encodeString(phone) + newLine();
				} else {
					formattedPhones += 'TEL;TYPE=WORK,VOICE:' + encodeString(phone) + newLine();
				}
			});
			[...(vCard.workFax || [])].filter(Boolean).forEach((fax) => {
				if (majorVersion >= 4) {
					formattedPhones += 'TEL;VALUE=uri;TYPE="fax,work":' + encodeString(fax) + newLine();
				} else {
					formattedPhones += 'TEL;VALUE=uri;TYPE=WORK,FAX:' + encodeString(fax) + newLine();
				}
			});
			[...(vCard.homeFax || [])].filter(Boolean).forEach((fax) => {
				if (majorVersion >= 4) {
					formattedPhones += 'TEL;VALUE=uri;TYPE="fax,home":' + encodeString(fax) + newLine();
				} else {
					formattedPhones += 'TEL;VALUE=uri;TYPE=HOME,FAX:' + encodeString(fax) + newLine();
				}
			});
			return formattedPhones;
		} catch (error) {
			console.log('error o=phones', error);
		}
	}

	function formatAddresses(vCard: VCardObject, encodingPrefix: any): string {
		try {
			let formattedAddresses = '';
			['HOME', 'WORK'].forEach((type) => {
				formattedAddresses += getFormattedAddress({
					encodingPrefix,
					address: vCard[`${type.toLowerCase()}Address`],
					type,
				});
			});
			return formattedAddresses;
		} catch (error) {
			console.log('adress error', error);
		}
	}

	function formatOtherFields(vCard: VCardObject, encodingPrefix: any): string {
		try {
			let formattedFields = '';
			['title', 'role', 'organization', 'url', 'workUrl', 'note', 'source']
				.filter((field) => vCard[field])
				?.forEach((field) => {
					formattedFields +=
						field.toUpperCase() + encodingPrefix + ':' + encodeString(vCard[field]) + newLine();
				});
			if (vCard.socialUrls) {
				for (let key in vCard.socialUrls) {
					if (vCard.socialUrls.hasOwnProperty(key) && vCard.socialUrls[key]) {
						formattedFields +=
							'X-SOCIALPROFILE' +
							encodingPrefix +
							';TYPE=' +
							key +
							':' +
							encodeString(vCard.socialUrls[key]) +
							newLine();
					}
				}
			}
			return formattedFields;
		} catch (error) {
			console.log('otherfields error', error);
		}
	}

	return {
		getFormattedString,
	};
};
