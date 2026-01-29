import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NameCardDetail } from './NameCardDetail';
import React, { useRef } from 'react';
import { colors } from 'configs';

import SvgIcon from './SvgIcon';
import { Text } from 'atoms';

const cardRatio = 1.75;
const logoRatio = 100 / 127;
const logoPaddingRatio = 24 / 1050;
const iconRatio = 24 / 1050;
const nameRatio = 40 / 1050;
const branchNameRatio = 26 / 1050;
const designationRatio = 28 / 1050;
const detailsRatio = 18 / 1050;

export const NameCardComponent = ({
	name,
	designation,
	branchName,
	branchAddress,
	officeAddress,
	branchTel,
	branchFax,
	mobileNumber,
	email,
	directTelNo1,
	directTelNo2,
	companyCode,
	width,
	isLoading,
}) => {
	const cardPadding = width / 31.0;
	const logoWidth = width / 10.5;
	const logoPadding = logoPaddingRatio * width;
	const textPadding = logoWidth + logoPadding;
	const logoHeight = logoWidth / logoRatio;

	const iconSize = width * iconRatio * 1.1;
	const nameSize = width * nameRatio;
	const designationSize = width * designationRatio;
	const branchNameSize = width * branchNameRatio;
	const detailsSize = width * detailsRatio;

	const fontSize = detailsSize;

	const branchNameLines = useRef(0);

	const telLines = useRef(0);
	const faxLines = useRef(0);
	const mobileLines = useRef(0);
	const emailLines = useRef(0);

	const extensionLines = useRef(0);
	const extensionLines2 = useRef(0);

	const iconProps = {
		style: {
			marginRight: 4,
			height: iconSize,
			width: iconSize,
		},
	};
	const details = [
		{
			id: 1,
			icon: <SvgIcon.BankAddress {...iconProps} />,
			label: branchAddress,
			lines: branchNameLines,
		},
		{
			id: 2,
			icon: <SvgIcon.BankAddress {...iconProps} />,
			label: officeAddress,
			lines: branchNameLines,
		},
		{
			id: 3,
			icon: <SvgIcon.BankTel {...iconProps} />,
			label: branchTel,
			lines: telLines,
		},
		{
			id: 4,
			icon: <SvgIcon.BankDirect1 {...iconProps} />,
			label: directTelNo1,
			lines: extensionLines,
		},
		{
			id: 5,
			icon: <SvgIcon.BankDirect2 {...iconProps} />,
			label: directTelNo2,
			lines: extensionLines2,
		},
		{
			id: 6,
			icon: <SvgIcon.Bankfax {...iconProps} />,
			label: branchFax,
			lines: faxLines,
		},
		{
			id: 7,
			icon: <SvgIcon.BankMobile {...iconProps} />,
			label: mobileNumber,
			lines: mobileLines,
		},
		{
			id: 8,
			icon: <SvgIcon.BankEmail {...iconProps} />,
			label: email,
			lines: emailLines,
		},
	];

	if (isLoading) {
		return (
			<View style={{ ...styles.container, width, padding: cardPadding }}>
				<ActivityIndicator color={colors.primary} size="small" />
			</View>
		);
	}

	return (
		<View style={{ ...styles.container, width, padding: cardPadding }}>
			<SvgIcon.BankLogo
				fill="#ED1C24"
				style={{
					...styles.logo,
					width: logoWidth,
					marginRight: logoPadding,
				}}
			/>

			<View style={styles.rightSection}>
				<View style={{ ...styles.topContainer }}>
					<Text style={{ ...styles.lblName, fontSize: nameSize }}>{name}</Text>
					<Text style={{ ...styles.lblDesignation, fontSize: designationSize }}>
						{designation?.replace(
							/(^\w|\s\w)(\S*)/g,
							(_, m1, m2) => m1.toUpperCase() + m2.toLowerCase(),
						)}
					</Text>
				</View>
				<View
					style={{
						...styles.logoContainer,
						height: logoHeight,
					}}
				>
					<SvgIcon.BankName
						companyCode={companyCode?.toUpperCase()}
						fill="#ED1C24"
						style={{
							...styles.iconBankName,
							height: logoHeight,
						}}
					/>
				</View>

				<View style={{ ...styles.bottomContainer, marginRight: textPadding }}>
					{!!branchName && (
						<Text
							style={{ ...styles.lblBranchName, fontSize: branchNameSize }}
							onTextLayout={(event) => (branchNameLines.current = event.nativeEvent.lines.length)}
						>
							{branchName}
						</Text>
					)}
					{details.map((detail) => {
						const { id, label } = detail;
						if (!label) {
							return <View key={id} />;
						}
						return (
							<NameCardDetail {...detail} key={id} fontSize={fontSize} iconSize={iconSize}>
								{label}
							</NameCardDetail>
						);
					})}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		aspectRatio: cardRatio,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightSection: {
		flex: 1,
	},
	topContainer: {
		flex: 1,
	},
	logoContainer: {},
	iconBankName: {
		height: '100%',
		flex: 1,
		width: undefined,
		resizeMode: 'stretch',
	},
	bottomContainer: {
		flex: 1,
	},
	logo: {
		height: undefined,
		aspectRatio: logoRatio,
		resizeMode: 'contain',
	},
	lblName: {
		color: colors.black,
		textAlign: 'right',
		fontWeight: 'bold',
	},
	lblDesignation: {
		paddingTop: 2,
		color: colors.black,
		textAlign: 'right',
		fontSize: 8,
	},
	lblBranchName: {
		fontWeight: 'bold',
	},
});
