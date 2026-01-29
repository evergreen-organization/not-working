import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
	/* Column Layouts */
	col: {
		flexDirection: 'column',
	},
	colReverse: {
		flexDirection: 'column-reverse',
	},
	colCenter: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	colVCenter: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	colHCenter: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	/* Row Layouts */
	row: {
		flexDirection: 'row',
	},
	rowReverse: {
		flexDirection: 'row-reverse',
	},
	rowCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rowVCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	rowHCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	/* Default Layouts */
	center: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	fillCenter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flexWrap: {
		flexWrap: 'wrap',
	},
	borderWidth1: {
		borderWidth: 1,
	},
	alignItemsCenter: {
		alignItems: 'center',
	},
	alignItemsStart: {
		alignItems: 'flex-start',
	},
	alignItemsStretch: {
		alignItems: 'stretch',
	},
	alignItemsEnd: {
		alignItems: 'flex-end',
	},
	justifyContentCenter: {
		justifyContent: 'center',
	},
	justifyContentAround: {
		justifyContent: 'space-around',
	},
	justifyContentBetween: {
		justifyContent: 'space-between',
	},
	justifyContentEnd: {
		justifyContent: 'flex-end',
	},
	scrollSpaceAround: {
		flexGrow: 1,
		justifyContent: 'space-around',
	},
	scrollSpaceBetween: {
		flexGrow: 1,
		justifyContent: 'space-between',
	},
	selfStretch: {
		alignSelf: 'stretch',
	},
	selfEnd: {
		alignSelf: 'flex-end',
	},
	selfCenter: {
		alignSelf: 'center',
	},
	selfStart: {
		alignSelf: 'flex-start',
	},
	overFlowHidden: {
		overflow: 'hidden',
	},
	/* Sizes Layouts */
	fill: {
		flex: 1,
	},
	noFill: { flex: 0 },
	flexGrow: {
		flexGrow: 1,
	},
	fullSize: {
		height: '100%',
		width: '100%',
	},
	fullWidth: {
		width: '100%',
	},
	halfWidth: {
		width: '50%',
	},
	fullHeight: {
		height: '100%',
	},
	bottomRightView: {
		flex: 0.6,
	},
	bottomLeftView: {
		flex: 0.4,
	},
	/* Operation Layout */
	mirror: {
		transform: [{ scaleX: -1 }],
	},
	rotate90: {
		transform: [{ rotate: '90deg' }],
	},
	rotate90Inverse: {
		transform: [{ rotate: '-90deg' }],
	},
	// Position
	relative: {
		position: 'relative',
	},
	absolute: {
		position: 'absolute',
	},
	top0: {
		top: 0,
	},
	bottom0: {
		bottom: 0,
	},
	left0: {
		left: 0,
	},
	right0: {
		right: 0,
	},
	textCenter: {
		textAlign: 'center',
	},
	textJustify: {
		textAlign: 'justify',
	},
	textLeft: {
		textAlign: 'left',
	},
	textRight: {
		textAlign: 'right',
	},
	textLineThrough: {
		textDecorationLine: 'line-through',
	},
	aspectRatio1: {
		aspectRatio: 1,
	},
	zIndex1: {
		zIndex: 1,
	},
});

export default commonStyles;
