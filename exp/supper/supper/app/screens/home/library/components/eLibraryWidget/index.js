import React from 'react';
import { Image, View } from 'react-native';

import { Card, Text } from 'atoms';
import eBooksIcon from 'assets/library/ebook.png';
import ePublicationsIcon from 'assets/library/pdf-2.png';

import { styles } from './styles';

export const ELibraryWidget = ({ onEbooksPress, onEPublicationPress }) => {
	return (
		<>
			<Text variant={'P2'} style={styles.heading}>
				e-Library
			</Text>
			<View style={styles.eLibrarySection}>
				<View style={styles.eLibraryLeftItemContainer}>
					<Card style={styles.eLibraryItemView} onPress={onEbooksPress}>
						<Card.Content>
							<Card.Image source={eBooksIcon} containerStyle={styles.icon} />
							<Card.Title
								title={'e-Books'}
								titleStyle={styles.eLibraryTitle}
								titleTypography={'P9'}
							/>
						</Card.Content>
					</Card>
				</View>
				<View style={styles.eLibraryRightItemContainer}>
					<Card
						testID={'e-Publications-card'}
						style={styles.eLibraryItemView}
						onPress={onEPublicationPress}
					>
						<Card.Content>
							<Card.Image source={ePublicationsIcon} containerStyle={styles.icon} />
							<Card.Title
								title={'e-Publications'}
								titleStyle={styles.eLibraryTitle}
								titleTypography={'P9'}
							/>
						</Card.Content>
					</Card>
				</View>
			</View>
		</>
	);
};
