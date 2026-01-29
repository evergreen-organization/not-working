import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Moment from 'moment';
import { Icon, Text } from 'atoms';
import { dateFormat } from 'components';
import {
	formatJSONObject,
	formatLeadInformationDate,
	LABELS,
	LEAD_CREATED,
	PENDING,
	PRODUCT_STATUS,
	RESPONSE_FROM_CRMA2,
	toTitleCase,
} from '../../utils';
import { styles } from './styles';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const ProductDetails = ({ item, testID }) => {
	const { name, status, statusDesc, note, additionalResponse, statusDate, responseStatus } = item;
	const { borderColor, color, image, statusDateTitle } = PRODUCT_STATUS[status];
	const [isProductVisible, setProductVisible] = useState(false);
	const statusItem = formatJSONObject(additionalResponse);
	const onProductPress = (_) => setProductVisible(!isProductVisible);
	return (
		<View style={styles.view}>
			<View style={[{ borderLeftColor: borderColor }, styles.border]} />
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					testID={testID}
					style={styles.productButtonContainer}
					onPress={onProductPress}
				>
					{/*Product title*/}
					<View style={styles.productViewContainer}>
						<Image source={image} style={styles.productStatusImage} />

						<Text variant={'P4'} style={styles.productName}>
							{name}
						</Text>
						<Text variant={'P4'} style={styles.productStatusTitle}>
							{statusDesc}
						</Text>
						<Icon
							type={'material'}
							name={'keyboard-arrow-down'}
							style={[
								styles.arrowIcon,
								{
									transform: [{ rotate: isProductVisible ? '360deg' : '270deg' }],
								},
							]}
						/>
					</View>
				</TouchableOpacity>

				{isProductVisible && (
					<Animated.View entering={FadeInDown} style={styles.detailsContainer}>
						{/*Details*/}
						<View style={styles.productItemContainer}>
							<ListItem
								label={LABELS.dateInterested}
								value={formatLeadInformationDate(item.dateInterested)}
							/>
							<ListItem label={LABELS.preferredBranch} value={item.preferredBranch} />
							<ListItem
								label={LABELS.dateCreated}
								value={formatLeadInformationDate(item.dateCreated)}
							/>
							{status !== LEAD_CREATED && status !== PENDING && (
								<ListItem
									label={statusDateTitle}
									value={formatLeadInformationDate(item.statusDate)}
								/>
							)}
						</View>

						{/*Status from CRMA2*/}
						<Text variant={'P4'} style={styles.status}>
							Status
						</Text>
						<View style={[{ backgroundColor: color }, styles.statusContainer]}>
							{status === LEAD_CREATED && (
								<>
									<ListItem label={RESPONSE_FROM_CRMA2.salesPerson} value={item.salesPerson} />
									<ListItem
										label={statusDateTitle}
										value={Moment(statusDate, dateFormat.BACKEND_DATE_TIME).format(
											dateFormat.DATE_TIME_AMPM_DISPLAY,
										)}
									/>
								</>
							)}
							{responseStatus && (
								<ListItem label={RESPONSE_FROM_CRMA2.responseStatus} value={responseStatus} />
							)}
							{statusItem &&
								Object.keys(statusItem).map((key) => (
									<ListItem key={key} label={toTitleCase(key)} value={statusItem[key]} />
								))}
							{note && <Text style={styles.statusText}>{note}</Text>}
						</View>
					</Animated.View>
				)}
			</View>
		</View>
	);
};

const ListItem = ({ label, value, index, testID }) => (
	<View testID={testID} style={styles.row} key={index}>
		<Text variant={'P3'} style={styles.labelText}>
			{label}
		</Text>
		<Text variant={'P3'} style={styles.valueText}>
			{value}
		</Text>
	</View>
);
