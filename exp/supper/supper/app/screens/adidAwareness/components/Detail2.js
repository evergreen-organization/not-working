import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Dot from 'assets/icon/dot.png';
import { Text } from 'atoms';

export const Detail2 = () => {
	return (
		<>
			<View style={styles.row}>
				<Image source={Dot} style={styles.dot} />
				<Text style={styles.bulletText}>
					On your office computer, open up Google Chrome
					{/* <Image source={GoogleChrome} style={styles.icon} /> */}
					<Text style={styles.edgeText}> or Microsoft Edge </Text>
					{/* <Image source={Edge} style={styles.icon} /> */}
				</Text>
			</View>

			<View style={styles.row}>
				<Image source={Dot} style={styles.dot} />
				<View style={styles.bulletTextView}>
					<Text style={styles.bookmarkText}>
						Go to the IAM Portal at at your browser’s bookmark tab, or type:
					</Text>
					<Text style={styles.link}> https://iam.pbb.my/portal</Text>
				</View>
			</View>

			<View style={styles.row}>
				<Image source={Dot} style={styles.dot} />
				<Text style={styles.text}>Login using your current AD ID and password</Text>
			</View>

			<View style={styles.row}>
				<Image source={Dot} style={styles.dot} />
				<Text style={styles.text}>Set your Challenge Questions and Answers</Text>
			</View>
			<Text style={styles.ensureText}>
				Ensure you have successfully enroled your Challenge Questions before procceding further.
			</Text>
		</>
	);
};

const styles = StyleSheet.create({
	row: {
		marginVertical: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	dot: {
		width: 5,
		height: 5,
		flex: 1,
	},
	bulletText: {
		flex: 60,
		marginLeft: 10,
		flexWrap: 'wrap',
		fontSize: 14,
		lineHeight: 22,
	},
	icon: {
		width: 15,
		height: 15,
		justifyContent: 'center',
	},
	bulletTextView: {
		flex: 60,
		marginLeft: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	text: {
		flex: 60,
		marginLeft: 10,
		fontSize: 14,
	},
	link: {
		fontSize: 14,
		color: '#0066FF',
	},
	edgeText: { fontSize: 14 },
	bookmarkText: { fontSize: 14, lineHeight: 22 },
	ensureText: { marginVertical: 8, marginHorizontal: 12, fontSize: 14 },
});
