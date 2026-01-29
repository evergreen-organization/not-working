import { VCardPhotoObject, VCardSocialMediaObject, VCFAddressType } from './vcf.type';
import { vCardFormatter } from './vCardFormatter';
export class VCard {
	//constructor to store the vCard
	anniversary?: string;
	birthday?: string;
	cellPhone?: string;
	pagerPhone?: string;
	email?: string;
	workEmail?: string;
	firstName?: string;
	formattedName?: string;
	gender?: 'M' | 'F';
	homeAddress?: VCFAddressType['details'];
	homePhone?: string;
	homeFax?: string;
	lastName?: string;
	logo?: VCardPhotoObject;
	middleName?: string;
	namePrefix?: string;
	nameSuffix?: string;
	nickname?: string;
	note?: string;
	organization?: string;
	photo?: VCardPhotoObject;
	role?: string;
	socialUrls?: VCardSocialMediaObject;
	source?: string;
	title?: string;
	url?: string;
	workUrl?: string;
	workAddress?: VCFAddressType['details'] | string;
	workPhone?: string | string[];
	workDirect?: string | string[];
	workDirect2?: string | string[];
	workFax?: string;
	version?: string;

	constructor() {
		this.anniversary = '';
		this.birthday = '';
		this.cellPhone = '';
		this.pagerPhone = '';
		this.email = '';
		this.workEmail = '';
		this.firstName = '';
		this.formattedName = '';
		this.gender = null;
		this.homeAddress = this.getMailingAddress();
		this.homePhone = '';
		this.homeFax = '';
		this.lastName = '';
		this.logo = this.getPhoto();
		this.middleName = '';
		this.namePrefix = '';
		this.nameSuffix = '';
		this.nickname = '';
		this.note = '';
		this.organization = '';
		this.photo = this.getPhoto();
		this.role = '';
		this.socialUrls = this.getSocialUrls();
		this.source = '';
		this.title = '';
		this.url = '';
		this.workUrl = '';
		this.workAddress = this.getMailingAddress();
		this.workPhone = '';
		this.workDirect = '';
		this.workDirect2 = '';
		this.workFax = '';
		this.version = '3.0';
	}

	getSocialUrls() {
		return {
			facebook: '',
			linkedIn: '',
			twitter: '',
			flickr: '',
		};
	}

	getPhoto(url = '', mediaType = 'JPEG', attachFromUrl = true) {
		return {
			url,
			mediaType,
			base64: !attachFromUrl,
		};
	}

	getMailingAddress() {
		return {
			label: '',
			street: '',
			city: '',
			stateProvince: '',
			postalCode: '',
			countryRegion: '',
		};
	}

	getMajorVersion() {
		let majorVersionString = this.version ? this.version.split('.')[0] : '4';
		if (!majorVersionString) {
			return Number(majorVersionString);
		}
		return 4;
	}

	getFormattedString() {
		return vCardFormatter().getFormattedString(this);
	}
}

export const vCard = new VCard();
