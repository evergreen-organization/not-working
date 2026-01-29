export interface FormattedPhotoParams {
	photoType: string;
	url: string;
	mediaType: string;
	base64: boolean;
}

export interface VCFAddressType {
	label?: string;
	street?: string;
	city?: string;
	stateProvince?: string;
	postalCode?: string;
	countryRegion?: string;
}

export interface VCardSocialMediaObject {
	facebook?: string;
	linkedIn?: string;
	twitter?: string;
	flickr: string;
}
export interface FormattedAddressParams {
	encodingPrefix: string;
	address: VCFAddressType;
	type: string;
}

export interface VCardPhotoObject {
	url: string;
	mediaType: string;
	base64: boolean;
}

export interface VCardObject {
	anniversary?: string;
	birthday?: string;
	cellPhone?: string[];
	pagerPhone?: string[];
	email?: string;
	workEmail?: string;
	firstName?: string;
	formattedName?: string;
	gender?: 'M' | 'F';
	homeAddress?: VCFAddressType['details'];
	homePhone?: string[];
	homeFax?: string[];
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
	workPhone?: string[];
	workDirect?: string[];
	workDirect2?: string[];
	workFax?: string[];
	version?: string;
}
