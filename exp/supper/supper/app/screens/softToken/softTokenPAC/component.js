import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Config } from '../../../../env';
import { BackButton, Loading, Screen, Text } from 'atoms';
import { colors } from 'configs';
import { PacInput } from 'organisms';
import { styles } from './styles';
import { LOADING } from 'constant';
import { SectionHeader } from 'molecules';

const labelButton = 'Request a new activation password';
const subtitle = 'An activation password was sent to';
const title = 'IAM Portal';

export const SoftTokenPACView = (props) => {
	const {
		requestedRecently,
		allowReqPac,
		loadPac,
		requestAgainTimer,
		auth,
		error,
		pac,
		handleChange,
	} = props;

	return (
		<Screen singlePage>
			<BackButton />
			<View style={styles.container}>
				{requestedRecently ? (
					<View style={styles.recentlyContainer}>
						<Text style={styles.heading2}>You requested an activation password recently</Text>
						{allowReqPac ? (
							<TouchableOpacity onPress={loadPac}>
								<Text bold style={[styles.text, { color: colors.primary }]}>
									{labelButton}
								</Text>
							</TouchableOpacity>
						) : (
							<Text bold style={styles.text}>
								{labelButton} in {requestAgainTimer}
							</Text>
						)}
					</View>
				) : (
					<>
						<SectionHeader
							style={styles.heading}
							subtitle={subtitle}
							title={auth.status === LOADING ? '' : title}
						/>
						<Text style={styles.serialNoText}>S/N: {auth.pacSeqNo}</Text>
						<Text style={styles.serialNoText}>{Config.IAM}</Text>
						{auth.pacSeqNo && <PacInput errorTitle={error} value={pac} onChange={handleChange} />}
					</>
				)}
				{auth.status === LOADING && <Loading />}
			</View>
		</Screen>
	);
};
