export type ProfileImageType = {
	uri: string;
};
export interface ChangeProfilePicPropTypes {
	handleAddProfileImage: () => {} | void;
	profileImage: ProfileImageType[];
	loading: boolean;

	handleGoBack: () => void;
}
