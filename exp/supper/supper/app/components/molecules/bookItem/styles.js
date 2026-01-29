import { StyleSheet } from 'react-native';
import { colors } from 'configs';

export const styles = StyleSheet.create({
	bookRowContainer: { backgroundColor: colors.white, paddingTop: 20 },
	bookRow: {
		flexDirection: 'row',
		paddingHorizontal: 0,
		paddingVertical: 0,
		marginHorizontal: 30,
		paddingBottom: 20,
		marginBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.medium,
	},
	bookCoverSection: { flex: 1, marginRight: 10 },
	bookCoverContainer: { height: 135, width: 95, borderRadius: 20 },
	bookCover: { width: '100%', height: '100%', borderRadius: 20 },
	bookDescSection: { flex: 2, marginLeft: 10, justifyContent: 'flex-start' },
	bookTitle: { fontSize: 13, fontWeight: 'bold' },
	bookAuthor: { fontFamily: 'Montserrat-Italic', fontSize: 12, marginTop: 8 },
	bookPublisher: {
		fontFamily: 'Montserrat-Italic',
		fontSize: 11,
		marginTop: 2,
	},
	bookISBN: { fontSize: 11, marginTop: 8 },
});
