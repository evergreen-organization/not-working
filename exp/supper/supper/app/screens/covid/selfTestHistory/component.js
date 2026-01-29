import React from 'react';
import { ScrollView, View } from 'react-native';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading, Screen, Tag, Text } from 'atoms';
import { Header, ListItem } from 'molecules';
import { LOADING, SUCCESS } from 'constant';

import { STATUS_TAG_COLOR_SCHEME } from '../utils/constant';
import { styles } from './styles';
import { Typography } from 'styles';

export const SelfTestHistoryView = ({
	handleHistoryPress,
	handleNavigation,
	navigation,
	list,
	status,
}) => {
	const { bottom } = useSafeAreaInsets();
	const handleHeaderLeftBtn = () => {
		return navigation.goBack();
	};
	return (
		<Screen>
			{status === LOADING && <Loading />}

			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'Self Test Result History',
					style: Typography.H6,
				}}
				rightComponent={{
					icon: 'plus',
					type: 'entypo',
					testID: 'add-self-test-button',
					onPress: handleNavigation,
					style: styles.icon,
				}}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={[styles.background, { paddingBottom: bottom }]}
			>
				{status === SUCCESS && list?.length > 0 ? (
					list.map((item, index) => (
						<ListItem
							testID={`self-test-history-list-${index}`}
							key={item.date}
							onPress={() => handleHistoryPress(item)}
							title={moment(item.date, 'M/D/YYYY').format('D MMM YYYY')}
							description={item.result}
							descriptionStyle={styles.descriptionStyle}
							containerStyle={styles.listStyle}
							centerStyle={styles.contentStyle}
							RightComponent={
								<View style={styles.tagView}>
									<Tag title={item.status} colorScheme={STATUS_TAG_COLOR_SCHEME[item.status]} />
								</View>
							}
						/>
					))
				) : (
					<View testID={'no-self-test-list-view'} style={styles.emptyView}>
						<Text variant={'P4'}>No History Found</Text>
					</View>
				)}
			</ScrollView>
		</Screen>
	);
};
