export interface WaterTrackerState {
	age: number;
	height: number;
	weight: number;
	wakeUpTime: string;
	sleepTime: string;
	dailyGoal: number;
	totalIntakeValue: number;
	dateRecorded: string;
	waterIntakeVolume: number;
	enableReminder: boolean;
	timeSchedule: Array<any>;
}
