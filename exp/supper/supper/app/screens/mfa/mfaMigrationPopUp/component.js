import React from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { colors } from 'configs';
import { Button, Text } from 'atoms';
import LottieView from 'lottie-react-native';
import SecurityLottie from 'assets/lottie/security.json';
import { BaseModal } from 'molecules';
import { commonStyles } from 'styles';

export const MfaMigrationPopUpComp = ({ onAgree, isVisible, onClose }) => {
	const { width } = useWindowDimensions();

	return (
		<BaseModal
			transparent={true}
			visible={isVisible}
			onBackdropPress={onClose}
			onRequestClose={onClose}
		>
			<View style={[commonStyles.center]}>
				<View
					style={{
						width: width * 0.9,
						backgroundColor: colors.white,
						borderRadius: 10,
						padding: 10,
					}}
				>
					<TouchableOpacity onPress={onClose}>
						<Text
							variant={'P4'}
							style={{
								fontSize: 13,
								color: colors.primary,
								marginRight: 8,
								textAlign: 'right',
							}}
						>
							Close
						</Text>
					</TouchableOpacity>

					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<LottieView autoPlay loop source={SecurityLottie} style={{ width: 150, height: 150 }} />
						<View>
							<Text variant={'P7'} style={{ textAlign: 'center' }}>
								Exciting news! We've introduced a new and improved authentication service.
							</Text>

							<Text variant={'P6'} style={{ marginTop: 10 }}>
								You can accept "Migration" for a seamless transition or "Cancel" if you prefer to
								stay with the current setup.
							</Text>

							<Text style={{ marginTop: 10 }}>
								You've got three chances to make your decision. Take your time!
							</Text>
							<Text style={{ marginTop: 10 }}>
								If no action is taken after the third attempt, the app will automatically migrate
								you to the new authentication service during your next login.
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							marginVertical: 10,
							marginTop: 20,
						}}
					>
						<Button
							title={'Cancel'}
							style={{
								backgroundColor: colors.lightGrey,
								marginHorizontal: 10,
							}}
							labelStyle={{ backgroundColor: colors.lightGrey }}
							typography={'P7'}
							onPress={onClose}
						/>
						<Button
							title={'Agree'}
							typography={'P7'}
							style={{ marginHorizontal: 10 }}
							onPress={onAgree}
						/>
					</View>
				</View>
			</View>
		</BaseModal>
	);
};
