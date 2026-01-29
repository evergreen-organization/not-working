import { Image, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Text } from 'atoms';
import { styles } from '../../eBizCardTutorialDetails/styles';
import { labelType } from '../../constant/constantEBCHelp';
import React from 'react';

export const EBizTutorialDetailItem = ({ details, onPressTag = () => {}, padding = 0 }) => {
	const { width } = useWindowDimensions();
	const renderHeader = (label) => <Text style={styles.lblHeading}>{label}</Text>;

	const renderImage = (image) => (
		<Image
			source={image}
			style={{
				...styles.image,
				width: width - 2 * padding,
				height: (width - 2 * padding) * 0.8,
			}}
		/>
	);

	const renderHeading2 = (label, id) => (
		<Text key={id} style={styles.lblHeading2}>
			{label}
		</Text>
	);

	const renderDescription = (label, id) => (
		<Text key={id} style={styles.lblDescription}>
			{label}
		</Text>
	);

	const renderNumberList = (numberList) => {
		if (numberList.length === 0) {
			return null;
		}
		return numberList.map((item, index) => (
			<>
				<View key={item.id} style={styles.vwNumberList}>
					<View style={styles.vwNumber}>
						<Text style={styles.lblNumber}>{index + 1}.</Text>
					</View>
					<View style={styles.vwNumberText}>
						<Text style={styles.lblNumber}>{item.label}</Text>
					</View>
				</View>
				{item.data && renderCharacterList(item.data)}
			</>
		));
	};

	const renderCharacterList = (characterList) => {
		if (characterList.length === 0) {
			return null;
		}

		return characterList.map((item, index) => (
			<>
				<View key={item.id} style={styles.vwCharacterList}>
					<View style={styles.vwNumber}>
						<Text style={styles.lblNumber}>{(index + 10).toString(36)}.</Text>
					</View>
					<View style={styles.vwNumberText}>
						<Text style={styles.lblNumber}>{item.label}</Text>
					</View>
				</View>
				{item.data && renderRomanList(item.data)}
			</>
		));
	};

	const lookup = [
		['M', 1000],
		['CM', 900],
		['D', 500],
		['CD', 400],
		['C', 100],
		['XC', 90],
		['L', 50],
		['XL', 40],
		['X', 10],
		['IX', 9],
		['V', 5],
		['IV', 4],
		['I', 1],
	];

	const toRomanNumeral = (num) =>
		lookup.reduce((acc, [k, v]) => {
			acc += k.repeat(Math.floor(num / v));
			num = num % v;
			return acc;
		}, '');

	const renderRomanList = (romansList) => {
		return romansList.map((item, index) => (
			<View key={item.id} style={styles.vwRomansList}>
				<View style={styles.vwRomans}>
					<Text style={styles.lblRomans}>{toRomanNumeral(index + 1)}.</Text>
				</View>
				<View style={styles.vwRomansText}>
					<Text style={styles.lblRomans}>{item.label}</Text>
				</View>
			</View>
		));
	};

	const renderCaption = (caption) => (
		<View style={styles.vwCaption}>
			<Text style={styles.lblCaption}>{caption}</Text>
		</View>
	);

	const renderTags = (tags) => {
		if (tags.length === 0) {
			return null;
		}
		return (
			<View style={styles.vwTags}>
				{tags.map((item) => {
					return (
						<TouchableOpacity
							key={item.id}
							style={styles.btnTags}
							onPress={() => onPressTag(item.indexes)}
						>
							<Text style={styles.lblTag}>{item.label}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const VIEW_FINDER = {
		[labelType.heading]: renderHeader,
		[labelType.heading2]: renderHeading2,
		[labelType.description]: renderDescription,
		[labelType.image]: renderImage,
		[labelType.numberList]: renderNumberList,
		[labelType.caption]: renderCaption,
		[labelType.tags]: renderTags,
		[labelType.characterList]: renderCharacterList,
	};

	const renderDetails = (data) => {
		if (!data) {
			return null;
		}

		return data.map((item) => {
			if (!VIEW_FINDER[item.type]) {
				return null;
			}
			return VIEW_FINDER[item.type](item.data, item.id);
		});
	};

	return <View style={{ flex: 1 }}>{renderDetails(details)}</View>;
};
