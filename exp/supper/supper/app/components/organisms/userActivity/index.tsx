import { useAppState } from 'hooks';
import React, { ReactNode, useEffect, useState } from 'react';
import CheckActivity from 'react-native-user-inactivity';

const UserActivity = ({
	children,
	onAction,
	timeForInactivity = 300000, // 5 minutes
}: {
	children: ReactNode;
	onAction: (active: boolean) => void;
	timeForInactivity?: number;
}) => {
	const appState = useAppState();
	const [isInactive, setIsInactive] = useState(false);

	useEffect(() => {
		if (appState) {
			// Reset inactivity state when app becomes active again
			setIsInactive(false);
			onAction(true); // User is active on returning
		}
	}, [appState, onAction]);

	const handleAction = (active: boolean) => {
		setIsInactive(!active);
		onAction(active);
	};

	return (
		<CheckActivity
			timeForInactivity={timeForInactivity}
			isActive={!isInactive}
			onAction={handleAction}
		>
			{children}
		</CheckActivity>
	);
};

export default UserActivity;
