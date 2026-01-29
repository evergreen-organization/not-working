import React from 'react';
import { Image, View } from 'react-native';
import { ListItem } from 'molecules';
import { styles } from './styles';
import { Text } from 'atoms';

const variants = {
	viewable: 'viewable',
	default: 'default',
};

export const BookItem = ({ item, onPress, variant, testID }) => {
	const { title, url, author, publisher, year, isbn, issueNo, coverpageURL } = item;

	return (
		<ListItem
			testID={testID}
			onPress={onPress}
			disabled={variant !== variants.viewable}
			containerStyle={styles.bookRow}
			LeftComponent={
				<View style={styles.bookCoverSection}>
					<View style={styles.bookCoverContainer}>
						<Image
							source={{
								uri: variant === variants.viewable ? coverpageURL : url,
							}}
							style={styles.bookCover}
							resizeMode={'contain'}
						/>
					</View>
				</View>
			}
			title={title}
			titleNumberOfLine={3}
			titleStyle={styles.bookTitle}
			centerStyle={styles.bookDescSection}
			bottomSeparator={false}
		>
			{variant === variants.viewable ? (
				<ViewableBookDescription issueNo={issueNo} />
			) : (
				<DefaultBookDescription author={author} publisher={publisher} year={year} isbn={isbn} />
			)}
		</ListItem>
	);
};

const ViewableBookDescription = ({ issueNo }) => (
	<>
		<Text style={styles.bookAuthor}>{issueNo}</Text>
		<Text bold style={styles.bookISBN}>
			(e-Publication)
		</Text>
	</>
);

const DefaultBookDescription = ({ author, publisher, year, isbn }) => (
	<>
		<Text style={styles.bookAuthor}>{author}</Text>
		<Text style={styles.bookPublisher}>
			{publisher}, {year}
		</Text>
		<Text style={styles.bookISBN}>ISBN: {isbn}</Text>
		<Text bold style={styles.bookISBN}>
			(Available at Main Library)
		</Text>
	</>
);

BookItem.variants = variants;
