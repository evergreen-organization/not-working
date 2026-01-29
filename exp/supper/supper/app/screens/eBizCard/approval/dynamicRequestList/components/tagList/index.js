import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';

import { Button, IconNew, Text, Toggle } from 'atoms';
import { colors, dateFormat } from 'configs';
import moment from 'moment';

export const TagList = ({
	item,
	isSelected,
	handleSelection,
	setIsApproveVisible,
	onPressGenerateQRCode,
}) => {
	const { isActive, key } = item;
	const [isRenewVisible, setIsRenewVisible] = useState(false);
	const buttonActiveColor = isActive ? colors.green : colors.red;
	const buttonTextColor = isRenewVisible ? colors.white : buttonActiveColor;
	const buttonActiveText = isActive ? 'Active' : 'Expired';
	const buttonTextText = isRenewVisible ? 'Renew' : buttonActiveText;
	const buttonBackgroundColor = isRenewVisible ? colors.green : colors.white;

	const handleToggleButton = () => {
		// show renew button when clicked
		if (!isRenewVisible) {
			return setIsRenewVisible(!isRenewVisible);
		}

		// trigger renew action when renewed is clicked
		handleSelection(item);
		setIsApproveVisible(true);
	};

	const onSelect = () => handleSelection(item);

	return (
		<TouchableOpacity onPress={(e) => onPressGenerateQRCode(e, item)} key={key}>
			<ShadowedView style={styles.selectionButton}>
				<View style={styles.container}>
					<Toggle
						inputInnerStyle={styles.toggleInner}
						inputOuterStyle={styles.toggleOuter}
						value={isSelected}
						variant={'checkbox'}
						onPress={onSelect}
						checkboxIcon={<IconNew type={'font-awesome'} name={'check'} size={15} color={'#fff'} />}
					/>

					<View style={styles.textContainer}>
						<Text style={styles.textDescription}>{item.description}</Text>
						<Text>{moment(item.creationDate).format(dateFormat.DATE_DISPLAY)}</Text>
					</View>
				</View>
				<Button
					style={{
						...styles.btnExpire,
						backgroundColor: buttonBackgroundColor,
					}}
					onPress={handleToggleButton}
				>
					<Text variant={'P9'} style={{ color: buttonTextColor }}>
						{buttonTextText}
					</Text>
				</Button>
			</ShadowedView>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textContainer: {
		flex: 1,
	},
	selectionButton: {
		backgroundColor: colors.white,
		marginTop: 12,
		borderRadius: 6,
		flexDirection: 'row',
		shadowColor: colors.lightGrey,
		shadowOpacity: 0.6,
		shadowRadius: 10,
	},
	btnExpire: {
		marginVertical: 20,
		paddingHorizontal: 10,
		marginHorizontal: 20,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textDescription: {
		fontSize: 14,
		fontWeight: '400',
	},
	toggleInner: {
		backgroundColor: colors.primary,
	},
	toggleOuter: {
		marginHorizontal: 12,
		marginVertical: 26,
		borderColor: '#C7C7C7',
	},
});
