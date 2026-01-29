import React from 'react';
import { PBSSCheckSecfa } from '../PBSSCheckSecfa';
import { PBSecureSign } from '../PBSecureSign';

export const PBSSSubmitView = ({
	onSecureSignComplete,
	onSecureSignCancel,
	transactionObj,
	initType,
	onSecfaComplete,
	onSecfaCancel,
	startSecureSign,
	startSecfaType,
}) => {
	return (
		<>
			<PBSSCheckSecfa
				onCancel={onSecfaCancel}
				onComplete={onSecfaComplete}
				data={transactionObj}
				activated={startSecfaType}
			/>
			<PBSecureSign
				transactionObj={transactionObj}
				onComplete={onSecureSignComplete}
				onCancel={onSecureSignCancel}
				activated={startSecureSign}
				initType={initType}
			/>
		</>
	);
};
