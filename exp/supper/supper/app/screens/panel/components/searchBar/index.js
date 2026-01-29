import React from 'react';
import { TextInput, View } from 'react-native';

import { Icon } from 'atoms';
import { styles } from './styles';

export const SearchBar = ({ userInput, onChangeText, searchOnFocus }) => {
	return (
		<View style={styles.searchView}>
			<View style={styles.searchItem}>
				<TextInput
					placeholder="Search"
					value={userInput}
					style={styles.searchInput}
					onFocus={() => searchOnFocus(userInput.toString())}
					onChangeText={(text) => onChangeText(text)}
				/>
				<View pointerEvents={'none'} style={styles.iconView}>
					<Icon type={'ionicon'} name={'search'} style={styles.searchIcon} />
				</View>
			</View>
		</View>
	);
};
