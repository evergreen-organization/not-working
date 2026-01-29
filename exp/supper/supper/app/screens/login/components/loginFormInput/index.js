import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon, Text } from 'atoms';
import { TextInput } from 'organisms';

import { styles } from './styles';
import { isIos } from 'constant';

export default React.forwardRef(
	(
		{
			title,
			isMasked,
			value,
			toggleTitle,
			onPressToggle,
			icon,
			onChangeText,
			secureTextEntry,
			...props
		},
		ref,
	) => {
		const renderTextInput = () => {
			if (isMasked) {
				return (
					<Text variant={'P1'} style={styles.lblValue}>
						{value}
					</Text>
				);
			}
			return (
				<TextInput
					ref={ref}
					custom={!isIos}
					onChangeText={onChangeText}
					value={value}
					style={styles.textInput}
					secureTextEntry={secureTextEntry}
					{...props}
				/>
			);
		};

		return (
			<>
				<View>
					<Text variant={'P2'} style={styles.title}>
						{title}
					</Text>
				</View>
				<View style={styles.textInputContainer}>
					<View style={styles.input}>{renderTextInput()}</View>
					<TouchableOpacity disabled={isMasked} style={styles.toggleBtn} onPress={onPressToggle}>
						{toggleTitle && (
							<Text variant={'P4'} style={styles.toggleTitle}>
								{toggleTitle}
							</Text>
						)}
						<Icon type={'material-community'} name={icon} style={styles.icon} />
					</TouchableOpacity>
				</View>
			</>
		);
	},
);
