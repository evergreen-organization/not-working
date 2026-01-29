import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { BottomModal } from 'molecules';
import { Text, Toggle } from 'atoms';
import InfoIcon from 'assets/icon/info.png';
import { PRODUCT_INTERESTED_MESSAGE } from '../../utils';
import { leadgen_testID } from '../../../../../e2e/testID';
import { styles } from './styles';

export const ProductSelectionPopUpComp = ({
	handleSelectProduct,
	handleInfoPress,
	handleConfirm,
	getStatus,
	onClose,
	isInfoShow,
	visible,
	data,
	dataLabel,
}) => {
	return (
		<BottomModal
			testID={leadgen_testID.productInterestedPopUp}
			isVisible={visible}
			onCancel={onClose}
			onConfirm={handleConfirm}
		>
			<View style={{ padding: 8 }}>
				<View style={styles.titleView}>
					<Text variant={'P3'} style={styles.title}>
						Select Product & Service Interested
					</Text>
					<TouchableOpacity onPress={handleInfoPress}>
						<Image source={InfoIcon} style={styles.infoIcon} />
					</TouchableOpacity>
				</View>
				{isInfoShow && (
					<Text variant={'P3'} style={styles.infoText}>
						{PRODUCT_INTERESTED_MESSAGE}
					</Text>
				)}
			</View>

			<ScrollView>
				{data.map((item, index) => (
					<View key={item[dataLabel]}>
						<TouchableOpacity
							testID={`${leadgen_testID.productInterested}-${index}`}
							style={styles.productListView}
							onPress={() => handleSelectProduct(item)}
						>
							<Toggle
								variant={'radio'}
								value={getStatus(item)}
								onPress={() => handleSelectProduct(item)}
							/>
							<Text variant={'P6'} style={styles.itemText}>
								{item[dataLabel]}
							</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</BottomModal>
	);
};
