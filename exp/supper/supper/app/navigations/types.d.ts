export interface IImageViewerItem {
	uri: string;
}

export type AppNavigatorParamsList = {
	imageView: {
		data: Array<IImageViewerItem>;
		index?: number;
	};
	quickLinks: {
		isMini?: boolean;
	};
};
