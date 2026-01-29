import moment from 'moment';
import { DateTimeFormat } from 'constant';

export const formatRegulationDateTime = (timeStamp) =>
	moment(timeStamp, DateTimeFormat);

export const checkLatestRegulation = (
	cachedRegulationDetail,
	cachedTimeStamp,
	lastTimeStamp,
) =>
	!cachedRegulationDetail ||
	formatRegulationDateTime(cachedTimeStamp) <
		formatRegulationDateTime(lastTimeStamp);
