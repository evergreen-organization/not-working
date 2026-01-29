import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'atoms';
import { BottomModal } from 'molecules';
import { styles } from './styles';

export const InvitationsPendingListModal = ({ data, isVisible, closeModal }) => {
	return (
		<BottomModal isVisible={isVisible} onCancel={closeModal}>
			<ScrollView contentContainerStyle={styles.listContainer}>
				{data.map(({ departmentName, staffName }) => {
					return (
						<View key={departmentName} style={styles.item}>
							{!!departmentName && (
								<Text variant={'P4'} style={styles.text}>
									{departmentName}
								</Text>
							)}
							{staffName.map((item) => (
								<Text variant={'P3'} key={item} style={styles.subtext}>
									{item}
								</Text>
							))}
						</View>
					);
				})}
			</ScrollView>
		</BottomModal>
	);
};
