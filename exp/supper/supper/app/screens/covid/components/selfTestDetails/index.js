import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Loading, Screen, Text } from 'atoms';
import { Header, ListItem, PrimaryBottomButton } from 'molecules';
import { colors } from 'configs';
import { styles } from './styles';
import { commonStyles, initialBottom, Typography } from 'styles';
import { navigate } from 'navigations/RootNavigation';
import { routes } from 'navigations';

const variants = {
	review: 'review',
	approve: 'approve',
};

export const SelfTestDetails = ({
	headerTitle,
	loading,
	imageUri,
	detailList,
	status,
	variant,
	onReject,
	onSubmit,
	onWithdraw,
	scrollViewTestID,
}) => {
	const navigation = useNavigation();
	const { bottom } = useSafeAreaInsets();
	const gap = bottom < 10 ? 10 : bottom;
	const uri = `data:image/png;base64,${imageUri}`;

	const handleBack = () => navigation.goBack();

	const onPressImage = () => {
		navigate(routes.IMAGE_VIEW, { data: [{ uri }] });
	};

	const renderButton = () => {
		if (variant === variants.approve) {
			return (
				<View style={[styles.container, { paddingBottom: initialBottom }]}>
					<Button
						disabled={!imageUri}
						onPress={onReject}
						buttonTitle={'Reject'}
						color={colors.oldLavender}
					/>
					<Button
						testID={'approve-self-test-button'}
						disabled={!imageUri}
						onPress={onSubmit}
						buttonTitle={'Submit'}
					/>
					<View style={{ height: gap }} />
				</View>
			);
		}

		return (
			<PrimaryBottomButton disabled={loading} onPress={onWithdraw} title="Withdraw" isTitleBold />
		);
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleBack,
				}}
				centerComponent={{
					text: headerTitle,
					style: Typography.H6,
				}}
			/>
			{loading && <Loading />}
			<View style={[commonStyles.fill]}>
				<ScrollView testID={scrollViewTestID}>
					<View style={styles.background}>
						{imageUri ? (
							<TouchableOpacity activeOpacity={1} onPress={onPressImage} style={styles.image}>
								<Image source={{ uri }} style={styles.image} />
							</TouchableOpacity>
						) : (
							<Loading />
						)}
					</View>
					<View style={styles.detailView}>
						{detailList.map((item) => (
							<ListItem
								key={item.label}
								title={item.label}
								titleTypography={'P3'}
								RightComponent={
									<Text variant={'P4'} style={{ color: item.color }}>
										{item.value}
									</Text>
								}
								bottomSeparator={false}
								disabled={true}
							/>
						))}
					</View>
				</ScrollView>
				{status === 'Pending' && renderButton()}
			</View>
		</Screen>
	);
};

SelfTestDetails.variants = variants;

const Button = ({ testID, disabled, onPress, buttonTitle, color }) => (
	<TouchableOpacity
		testID={testID}
		disabled={disabled}
		style={[
			styles.button,
			{ backgroundColor: color ?? colors.primary },
			{
				...(disabled && {
					backgroundColor: colors.medium,
				}),
			},
		]}
		onPress={onPress}
	>
		<Text variant={'P4'} style={styles.label}>
			{buttonTitle}
		</Text>
	</TouchableOpacity>
);
