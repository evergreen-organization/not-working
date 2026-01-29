import { Image, Text, View } from 'react-native';
import { styles } from './styles';

export const EBizTutorialDetailTitle = ({ title, icon }) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={icon} />
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};
