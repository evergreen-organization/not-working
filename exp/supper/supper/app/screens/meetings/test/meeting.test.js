import {
	checkDuplicateFirstItem,
	checkLoadingMoreMeetings,
	getLatestMeetingEvent,
	isCloseToBottom,
} from '../utils/utils';
import {
	CLOSE_TO_BOTTOM,
	CURRENT_MEETING_LIST,
	FOUND_MEETINGS,
	LATEST_MEETING_EVENT,
	NEW_MEETING_LIST,
	NEW_MEETING_LIST_2,
} from './testData';

test('Meeting- Check is close to bottom', () => {
	expect(isCloseToBottom(CLOSE_TO_BOTTOM)).toBe(true);
});

test('Meeting- Check is Duplicate Fist Item from Latest Event', () => {
	expect(
		checkDuplicateFirstItem({
			meetings: NEW_MEETING_LIST,
			currentList: CURRENT_MEETING_LIST,
		}),
	).toEqual(FOUND_MEETINGS);
});

test('Meeting- Check is Loading More Meeting Items', () => {
	expect(
		checkLoadingMoreMeetings({
			meetings: NEW_MEETING_LIST_2,
			currentList: CURRENT_MEETING_LIST,
		}),
	).toBe(false);
});

test('Meeting- Get latest meeting event', () => {
	expect(getLatestMeetingEvent(CURRENT_MEETING_LIST)).toEqual(
		LATEST_MEETING_EVENT,
	);
});
