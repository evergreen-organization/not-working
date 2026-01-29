import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const quickLinkStyles = StyleSheet.create({
	cardImage: {
		width: width * 0.9,
		borderRadius: 22,
		overflow: 'hidden',
		paddingVertical: 19,
		paddingHorizontal: 16,
	},
	cardImage2: {
		width: width * 0.5,
		borderRadius: 22,
		overflow: 'hidden',
		paddingVertical: 19,
		paddingHorizontal: 16,
	},
	itemContainer: {
		backgroundColor: 'rgba(0, 0 ,0 , 0.4)',
		flex: 1,
		paddingVertical: 5,
		borderRadius: 8,
		borderWidth: 3,
	},
	itemImage: {
		width: 32,
		aspectRatio: 1,
		alignSelf: 'center',
	},
	contentContainer: {
		flex: 1,
		marginHorizontal: 24,
		marginTop: 24,
	},
	tapText: {
		marginTop: 5,
		marginBottom: 10,
	},
	labelText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,
	},
	divider: {
		borderBottomColor: '#DDDDDD',
		borderBottomWidth: 1,
		width: '95%',
		marginBottom: 10,
	},
	listImage: {
		marginRight: 15,
	},

	quickItemContainer: {
		marginTop: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	quickLinkList: {
		marginTop: 20,
	},
	listContainer: {
		paddingBottom: 100,
	},
	addLabel: {
		marginTop: 10,
		textAlign: 'center',
	},
});

export default quickLinkStyles;
