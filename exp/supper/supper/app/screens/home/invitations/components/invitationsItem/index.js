import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { Text } from 'atoms';

export const InvitationsItem = ({
	title,
	subtitle,
	children,
	icon,
	extraIcon,
	onPress,
	onReload,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Image source={icon} style={styles.extraIcon} />
			</View>
			<View style={styles.flex}>
				{!!title && (
					<Text variant={'P9'} style={styles.title}>
						{title}
					</Text>
				)}
				{!!subtitle && (
					<Text variant={'P10'} style={styles.subtitle}>
						{subtitle}
					</Text>
				)}
				{children}
			</View>
			{extraIcon && (
				<TouchableOpacity style={styles.extraIconContainer} onPress={onPress}>
					<Image source={extraIcon} style={styles.extraIcon} />
				</TouchableOpacity>
			)}
			{onReload && (
				<TouchableOpacity onPress={onReload} style={styles.reload}>
					<MaterialCommunityIcons name="reload" style={styles.reloadIcon} />
				</TouchableOpacity>
			)}
		</View>
	);
};
