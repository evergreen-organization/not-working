import { LogBox } from 'react-native';

const log = (error) => console.log(error);

const start = () => {
	LogBox.ignoreLogs(['EventEmitter.remove']);
	// LogBox.ignoreAllLogs(true)
};

export default {
	log,
	start,
};
