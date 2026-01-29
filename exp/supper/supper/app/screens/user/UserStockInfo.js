import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';

import { colors } from '../../configs/colors';
import { Config } from '../../../env';
import { logout } from 'stores';

const UserStockInfo = () => {
	const [marketPrice, setMarketPrice] = useState('');
	const [marketChange, setMarketChange] = useState('');
	const [marketChangePct, setMarketChangePct] = useState('');
	const [marketOpen, setMarketOpen] = useState('');
	const [marketPrevClose, setMarketPrevClose] = useState('');
	const [isChangePositive, setIsChangePositive] = useState(true);
	const [isDataAvailable, setIsDataAvailable] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getPbbStock();
	}, []);

	const getPbbStock = () => {
		fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=1295.KL', {
			method: 'GET',
			headers: {
				'x-rapidapi-key': Config.RAPID_API_KEY,
				'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
				useQueryString: true,
			},
			timeout: 10000,
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else if (response.status === 401) {
					logout();
				}
			})
			.then((responseJson) => {
				if (responseJson !== undefined) {
					setMarketPrice(responseJson.price.regularMarketPrice.fmt);
					setMarketChange(responseJson.price.regularMarketChange.fmt);
					setMarketChangePct(responseJson.price.regularMarketChangePercent.fmt);
					setMarketOpen(responseJson.price.regularMarketOpen.fmt);
					setMarketPrevClose(responseJson.price.regularMarketPreviousClose.fmt);
					if (responseJson.price.regularMarketChange.fmt.charAt() === '-') {
						setIsChangePositive(false);
					}
					setIsDataAvailable(true);
					setIsLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return isLoading ? (
		<View
			style={{
				...styles.container,
				overflow: 'hidden',
				alignItems: 'center',
			}}
		>
			<LottieView
				style={{
					width: '100%',
				}}
				source={require('../../assets/lottie/greeking4.json')}
				autoPlay
				loop
			/>
		</View>
	) : (
		<View style={{ ...styles.container, justifyContent: 'space-between' }}>
			<View style={styles.sectionContainer}>
				<View>
					<Text style={styles.heading2}>1925.KL</Text>
					<Text style={styles.paragraph}>Public Bank Berhad</Text>
				</View>
				<View>
					<Text style={styles.paragraph}>
						Prev. Close: {isDataAvailable ? marketPrevClose : '4.2400'}
					</Text>
					<Text style={styles.paragraph}>Open: {isDataAvailable ? marketOpen : '4.2400'}</Text>
				</View>
			</View>
			<View style={styles.sectionContainer}>
				<View>
					<Text
						style={{
							...styles.heading3,
							color: isChangePositive ? colors.success : colors.error,
						}}
					>
						{isDataAvailable && isChangePositive
							? '+' + marketChange
							: isDataAvailable && !isChangePositive
							? marketChange
							: '+0.04'}
					</Text>
					<Text
						style={{
							...styles.heading3,
							color: isChangePositive ? colors.success : colors.error,
						}}
					>
						(
						{isDataAvailable && isChangePositive
							? '+' + marketChangePct
							: isDataAvailable && !isChangePositive
							? marketChangePct
							: '+0.94%'}
						)
					</Text>
				</View>
				<Text style={styles.heading1}>{isDataAvailable ? marketPrice : '4.2800'}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 120,
		backgroundColor: 'rgba(255,255,255,0.6)',
		borderRadius: 15,
		paddingHorizontal: '6%',
		paddingVertical: '4%',
	},
	sectionContainer: {
		justifyContent: 'space-between',
	},
	heading1: { fontFamily: 'Montserrat-Bold', fontSize: RFValue(22, 812), color: colors.eerieBlack },
	heading2: {
		fontFamily: 'Montserrat-Bold',
		fontSize: RFValue(20, 812),
		color: colors.eerieBlack,
	},
	heading3: {
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(16, 812),
		textAlign: 'right',
	},
	paragraph: {
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(14, 812),
		color: colors.oldLavender,
	},
});

export default UserStockInfo;
