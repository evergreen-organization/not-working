import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Dot from 'assets/icon/dot.png';
import { Text } from 'atoms';
import Warning from 'assets/icon/warning.png';

export const Detail3 = ({ warningList, detailList }) => (
	<>
		{detailList.map((item, index) => (
			<View key={index} style={styles.row}>
				<Image source={Dot} style={styles.dot} />
				<Text style={styles.text}>{item}</Text>
			</View>
		))}

		{warningList?.map((item, index) => (
			<View key={index} style={styles.row}>
				<Image source={Warning} style={styles.icon} />
				<Text style={styles.text}>{item}</Text>
			</View>
		))}
	</>
);

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
	text: {
		flex: 60,
		marginLeft: 10,
		fontSize: 14,
	},
	icon: {
		width: 15,
		height: 18,
		flex: 4,
	},
});
