import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Icon } from 'atoms';
export const SearchBar = ({
	searchInput,
	onPressSearch,
	onChangeText,
	onPressClear,
	placeholder,
	style,
	testID,
}) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.inputContainer}>
				<TextInput
					testID={testID}
					onChangeText={onChangeText}
					onSubmitEditing={onPressSearch}
					value={searchInput}
					placeholder={placeholder}
					style={styles.input}
				/>
				{searchInput.length !== 0 && (
					<TouchableOpacity style={styles.clearButton} onPress={onPressClear}>
						<Text style={styles.clearButtonText}>&times;</Text>
					</TouchableOpacity>
				)}
			</View>
			<TouchableOpacity style={styles.iconContainer} onPress={onPressSearch}>
				<Icon type={'evilicon'} name={'search'} style={styles.icon} />
			</TouchableOpacity>
		</View>
	);
};
