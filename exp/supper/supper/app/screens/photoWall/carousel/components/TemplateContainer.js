import React, { forwardRef } from 'react';
import ViewShot from 'react-native-view-shot';
import { useSelector } from 'react-redux';
import { getCardMessageById } from 'stores';
import { commonStyles } from 'styles';

export const TemplateContainer = ({ data, isSharing }, ref) => {
	const cardMessage = useSelector(getCardMessageById(data.id));

	return (
		<ViewShot
			ref={ref}
			style={commonStyles.fill}
			options={{ format: 'jpg', quality: 1, result: 'base64' }}
		>
			{data.render(
				cardMessage || {
					mainMsg: data?.data?.mainMsg,
					footer: data?.data?.footer,
					greeting: data?.data?.greeting,
				},
				isSharing,
			)}
		</ViewShot>
	);
};
export default forwardRef(TemplateContainer);
