import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, PrimaryButton, Text } from 'atoms';
import ShareCardIcon from 'assets/eBizCard/share.png';

import { PopUp } from '../../components';
import { colors, dateFormat } from 'configs';

import { preTags } from '../../constant/constant';
import { styles } from './styles';
import moment from 'moment';

export const AddTagPopUp = ({
	isPopUpVisible,
	setIsPopUpVisible,
	onPressShareQR,
	tag,
	setTag,
	onPressClosePopUp,
	isLoading,
	setIsLoading,
}) => {
	const isTagEmpty = tag === '';
	const color = isTagEmpty ? colors.lightGrey : colors.primary;

	return (
		<PopUp isVisible={isPopUpVisible} setVisible={setIsPopUpVisible}>
			<View>
				<View style={styles.$popUpHeader}>
					<Text style={{ fontSize: 16, fontWeight: 700 }}>Add A Tag</Text>

					<TouchableOpacity onPress={onPressClosePopUp} style={styles.$crossIconContainer}>
						<Icon type={'entypo'} name={'squared-cross'} style={styles.$crossIcon} />
					</TouchableOpacity>
				</View>
				<View
					style={{
						marginVertical: 30,
					}}
				>
					<Text style={styles.$popUpText}>
						You can add a tag to keep track of whom to share your Dynamic eBiz Card to.
					</Text>

					<Text style={[styles.$popUpText, { marginBottom: 0 }]}>
						Tags can help you identify incoming requests to view/refresh your Dynamic eBiz Card
						profile.
					</Text>
				</View>

				<View>
					<Text style={styles.$tagDescription}>Tag Description</Text>

					<TextInput
						style={styles.$input}
						value={tag}
						placeholder={'Sunway Pyramid Roadshow'}
						onChangeText={(e) => setTag(e)}
					/>

					<View
						style={{
							flexDirection: 'column',
						}}
					>
						<View style={styles.$tagView}>
							{preTags.map((i) => (
								<TouchableOpacity key={i} style={styles.$tagContainer} onPress={() => setTag(i)}>
									<Text style={styles.$tagText}>{i}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
					<Text style={styles.$tagDate}>{moment().format(dateFormat.DATE_DISPLAY)}</Text>
				</View>

				<PrimaryButton
					fill={false}
					title="Share Dynamic eBiz Card"
					leftIcon={ShareCardIcon}
					isTitleBold
					buttonStyle={[{ backgroundColor: color }]}
					shadowColor={color}
					loading={isLoading}
					color={isTagEmpty ? colors.lightGrey : colors.primary}
					disabled={isTagEmpty || isLoading}
					onPress={(e) => {
						setIsLoading(true);
						onPressShareQR(e);
					}}
				/>
			</View>
		</PopUp>
	);
};
