import React from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from 'atoms';
import { BottomModal } from 'molecules';

import { styles } from './styles';
export const DivisionModal = ({ isVisible, closeModal, data }) => {
	const { divisionName, staffList } = data || {};

	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal} fullScreen={false}>
			<ScrollView>
				<View style={styles.titleView}>
					<Text variant={'P7'} style={styles.title}>
						{divisionName}
					</Text>
				</View>
				{staffList.map((item, index) => {
					return (
						<View key={item.staffNo} style={styles.staffView}>
							<Text variant={'P9'}>{item.name}</Text>
						</View>
					);
				})}
			</ScrollView>
		</BottomModal>
	);
};
