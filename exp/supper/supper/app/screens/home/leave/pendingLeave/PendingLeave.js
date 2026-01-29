import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import useApi from '../../../../hooks/useApi';
import { fetchPendingLeave, getLeave } from '../../../../stores/leave';
import PendingLeaveList from './PendingLeaveList';
import { showFailure } from '../../../../utils/message';
import { Loading, Screen } from 'atoms';
import { StyleSheet, View } from 'react-native';
import { Header } from 'molecules';

const PendingLeave = () => {
	const { pendingLeaveList } = useSelector(getLeave);
	const fetchPendingLeaveApi = useApi(fetchPendingLeave);
	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(
		useCallback(() => {
			loadPendingLeave();

			// eslint-disable-next-line
		}, []),
	);

	const loadPendingLeave = async (refresh) => {
		if (refresh) {
			setRefreshing(true);
		}
		const response = await fetchPendingLeaveApi.request();
		if (response.problem) {
			return showFailure('Error loading list');
		}
		if (refresh) {
			setRefreshing(false);
		}
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
				}}
				centerComponent={{
					text: 'Pending Leave',
				}}
			/>

			<View style={styles.container}>
				<PendingLeaveList
					data={pendingLeaveList}
					loading={fetchPendingLeaveApi.loading}
					refreshing={refreshing}
					onRefresh={() => loadPendingLeave(true)}
				/>
				{fetchPendingLeaveApi.loading && <Loading />}
			</View>
		</Screen>
	);
};

export default PendingLeave;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
