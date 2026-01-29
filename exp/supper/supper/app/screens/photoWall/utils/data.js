import AnimatedIcon from 'assets/festive/eCards/animated.png';
import TextIcon from 'assets/festive/eCards/text.png';
import { TemplateVideo } from '../carousel/components/TemplateVideo';
import VideoCard from 'assets/festive/eCards/animated-video-card.png';
import TextCard from 'assets/festive/eCards/edit-text-card.png';
import {
	EditableTextCard1,
	EditableTextCard2,
	EditableTextCard3,
	EditableTextCard4,
	EditableTextCard5,
} from 'assets/festive/eCards/editableTextCard';
import {
	PhotoCard1,
	PhotoCard2,
	PhotoCard3,
	PhotoCard4,
	PhotoCard5,
} from 'assets/festive/eCards/photoCard';
import {
	Thumbnail0,
	Thumbnail1,
	Thumbnail2,
	Thumbnail3,
	Thumbnail4,
} from 'assets/festive/eCards/thumbnail';
import EditableTextCardTemplate from '../components/editableTextCardTemplate';

const defaultCardMessage = {
	template1: {
		greeting: '',
		mainMsg:
			'May the Year of the Horse shower blessings upon you and all those you hold dear. Happy Lunar New Year!',
		footer: 'Best Wishes, Tan & Fly',
	},
	template2: {
		greeting: '',
		mainMsg:
			'Wishing  you a prosperous year filled with success, good health, and exciting opportunities to reach new heights!',
		footer: 'Regards, Mr. & Mrs.Ong ',
	},
	template3: {
		greeting: 'Dearest Low & Family',
		mainMsg:
			'May the Year of the Horse bring you a new year filled with love, peace, and prosperity.',
		footer: '',
	},
	template4: {
		greeting: '',
		mainMsg:
			'May this year bring success, vibrant health, and joy, guiding you to achieve your goals and embrace new beginnings!',
		footer: '',
	},
	template5: {
		greeting: '',
		mainMsg:
			'May all good things pave your way in the year ahead. Wishing you a happy New Year filled with prosperity and good fortune.',
		footer: '',
	},
};

export const PHOTO_TEXT_EDITABLE = 'photoTextEditable';
export const TEXT_EDITABLE_ONLY = 'textOnly';
export const GIF_ONLY = 'gifOnly';
export const DEFAULT = 'default';
export const VIDEO = 'video';

export const TemplateList = [
	// {
	// 	id: 'raya-2025-0',
	// 	type: VIDEO,
	// 	thumbnail: Thumbnail0,
	// 	isUnlocked: false,
	// 	data: { video: '/ecard-video-0.mp4' },
	// 	render: () => <TemplateVideo video={'ecard-video-0.mp4'} />,
	// },
	{
		id: 'festive-cny-2026-1',
		type: VIDEO,
		thumbnail: Thumbnail0,
		isUnlocked: false,
		data: { video: '/ecard-video-0.mp4' },
		render: (_, isSharing) => <TemplateVideo video={'ecard-video-0.mp4'} isSharing={isSharing} />,
	},
	{
		id: 'festive-cny-2026-2',
		type: VIDEO,
		thumbnail: Thumbnail1,
		isUnlocked: false,
		data: { video: '/ecard-video-1.mp4' },
		render: (_, isSharing) => <TemplateVideo video={'ecard-video-1.mp4'} isSharing={isSharing} />,
	},
	{
		id: 'festive-cny-2026-3',
		type: VIDEO,
		thumbnail: Thumbnail2,
		isUnlocked: false,
		data: { video: '/ecard-video-2.mp4' },
		render: (_, isSharing) => <TemplateVideo video={'ecard-video-2.mp4'} isSharing={isSharing} />,
	},
	{
		id: 'festive-cny-2026-4',
		type: VIDEO,
		thumbnail: Thumbnail3,
		isUnlocked: false,
		data: { video: '/ecard-video-3.mp4' },
		render: (_, isSharing) => <TemplateVideo video={'ecard-video-3.mp4'} isSharing={isSharing} />,
	},
	{
		id: 'festive-cny-2026-5',
		type: VIDEO,
		thumbnail: Thumbnail4,
		isUnlocked: false,
		data: { video: '/ecard-video-4.mp4' },
		render: (_, isSharing) => <TemplateVideo video={'ecard-video-4.mp4'} isSharing={isSharing} />,
	},
	{
		id: 'festive-cny-2026-6',
		thumbnail: PhotoCard1,
		isUnlocked: true,
		type: TEXT_EDITABLE_ONLY,
		data: {
			greeting: defaultCardMessage.template1.greeting,
			mainMsg: defaultCardMessage.template1.mainMsg,
			footer: defaultCardMessage.template1.footer,
			mainMsgMaxLength: 150,
		},
		render: (cardMessage) => (
			<EditableTextCardTemplate
				backgroundImage={EditableTextCard1}
				templateStyle="template1"
				cardMessage={cardMessage}
				greetTextTextStyle="greetText1"
				mainMsgTextStyle="mainText1"
				footerTextStyle="footerText1"
			/>
		),
	},
	{
		id: 'festive-cny-2026-7',
		thumbnail: PhotoCard2,
		isUnlocked: true,
		type: TEXT_EDITABLE_ONLY,
		data: {
			greeting: defaultCardMessage.template2.greeting,
			mainMsg: defaultCardMessage.template2.mainMsg,
			footer: defaultCardMessage.template2.footer,
		},
		render: (cardMessage) => (
			<EditableTextCardTemplate
				backgroundImage={EditableTextCard2}
				templateStyle="template2"
				cardMessage={cardMessage}
				mainMsgTextStyle="mainText2"
				greetTextTextStyle="greetText2"
				footerTextStyle="footerText2"
			/>
		),
	},
	{
		id: 'festive-cny-2026-8',
		thumbnail: PhotoCard3,
		isUnlocked: true,
		type: TEXT_EDITABLE_ONLY,
		data: {
			greeting: defaultCardMessage.template3.greeting,
			mainMsg: defaultCardMessage.template3.mainMsg,
			footer: defaultCardMessage.template3.footer,
		},
		render: (cardMessage) => (
			<EditableTextCardTemplate
				backgroundImage={EditableTextCard3}
				templateStyle="template3"
				cardMessage={cardMessage}
				mainMsgTextStyle="mainText3"
				greetTextTextStyle="greetText3"
				footerTextStyle="footerText3"
			/>
		),
	},
	{
		id: 'festive-deevapli-v2-2025-9',
		thumbnail: PhotoCard4,
		isUnlocked: true,
		type: TEXT_EDITABLE_ONLY,
		data: {
			greeting: defaultCardMessage.template4.greeting,
			mainMsg: defaultCardMessage.template4.mainMsg,
			footer: defaultCardMessage.template4.footer,
			mainMsgMaxLength: 150,
			footerMaxLength: 70,
		},
		render: (cardMessage) => (
			<EditableTextCardTemplate
				backgroundImage={EditableTextCard4}
				templateStyle="template4"
				cardMessage={cardMessage}
				greetTextTextStyle="greetText4"
				mainMsgTextStyle="mainText4"
				footerTextStyle="footerText4"
			/>
		),
	},
	{
		id: 'festive-deevapli-v2-2025-10',
		thumbnail: PhotoCard5,
		isUnlocked: true,
		type: TEXT_EDITABLE_ONLY,
		data: {
			greeting: defaultCardMessage.template5.greeting,
			mainMsg: defaultCardMessage.template5.mainMsg,
			footer: defaultCardMessage.template5.footer,
			mainMsgMaxLength: 150,
			footerMaxLength: 70,
		},
		render: (cardMessage) => (
			<EditableTextCardTemplate
				backgroundImage={EditableTextCard5}
				templateStyle="template5"
				cardMessage={cardMessage}
				greetTextTextStyle="greetText5"
				mainMsgTextStyle="mainText5"
				footerTextStyle="footerText5"
			/>
		),
	},
];

const filterEcardsTemplateType = (list, type) => list.filter((item) => item.type === type);

export const TEMPLATE_LIST_BY_TYPE = [
	{
		id: '1',
		title: 'Video cards',
		icon: AnimatedIcon,
		titleImage: VideoCard,
		data: filterEcardsTemplateType(TemplateList, VIDEO),
	},
	{
		id: '2',
		title: 'Editable text cards',
		icon: TextIcon,
		titleImage: TextCard,
		data: filterEcardsTemplateType(TemplateList, TEXT_EDITABLE_ONLY),
	},
];
