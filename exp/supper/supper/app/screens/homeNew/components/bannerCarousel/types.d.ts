import { GestureResponderEvent } from 'react-native';

export type TModal = { type: 'PDF'; pdfUrl?: IPdfUrl } | { type: 'WIDGET' } | null;

export interface IPdfUrl {
	ios: number;
	android: number;
}

export interface IItem {
	id: string;
	type: string;
	banner: any;
	routes?: string;
	pdfUrl?: IPdfUrl;
}
export interface IBannerCarousel {
	list: IItem[];
	onPress: (e: GestureResponderEvent, route: string, params?: Record<string, any>) => void;
}
