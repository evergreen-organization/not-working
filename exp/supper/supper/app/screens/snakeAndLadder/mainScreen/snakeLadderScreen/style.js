import { StyleSheet } from 'react-native';
import { boardHeight, boardWidth, layoutRatio, playerSize } from './conf';

/**
 * Styles for the game board and UI elements.
 * @typedef {Object} Styles
 * @property {Object} container - Styles for the container view.
 * @property {number} container.flex - Flex value for the container view.
 * @property {string} container.backgroundColor - Background color for the container view.
 * @property {string} container.alignItems - Alignment for the container view.
 * @property {string} container.justifyContent - Justification for the container view.
 * @property {Object} board - Styles for the game board view.
 * @property {number} board.width - Width of the game board.
 * @property {number} board.height - Height of the game board.
 * @property {string} board.alignItems - Alignment for the game board view.
 * @property {string} board.justifyContent - Justification for the game board view.
 * @property {string} board.position - Positioning for the game board view.
 * @property {number} board.left - Left offset for the game board view.
 * @property {Object} playerImage - Styles for the player image view.
 * @property {number} playerImage.width - Width of the player image view.
 * @property {number} playerImage.height - Height of the player image view.
 * @property {string} playerImage.position - Positioning for the player image view.
 * @property {Object} gameInfo - Styles for the game info view.
 * @property {number} gameInfo.padding - Padding for the game info view.
 * @property {string} gameInfo.alignItems - Alignment for the game info view.
 * @property {Object} infoText - Styles for the game info text.
 * @property {number} infoText.fontSize - Font size for the game info text.
 * @property {number} infoText.marginBottom - Bottom margin for the game info text.
 * @property {Object} button - Styles for the game button.
 * @property {number} button.padding - Padding for the game button.
 * @property {number} button.borderRadius - Border radius for the game button.
 * @property {number} button.borderWidth - Border width for the game button.
 * @property {string} button.borderColor - Border color for the game button.
 * @property {string} button.backgroundColor - Background color for the game button.
 * @property {Object} buttonText - Styles for the game button text.
 * @property {number} buttonText.fontSize - Font size for the game button text.
 * @property {string} buttonText.color - Color for the game button text.
 * @property {Object} rollText - Styles for the roll text.
 * @property {number} rollText.fontSize - Font size for the roll text.
 * @property {string} rollText.fontFamily - Font family for the roll text.
 * @property {string} rollText.color - Color for the roll text.
 * @property {number} rollText.marginBottom - Bottom margin for the roll text.
 */

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		alignItems: 'center',
		justifyContent: 'center',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},

	board: {
		width: boardWidth,
		height: boardHeight,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: layoutRatio > 2.1 ? 40 : 20,
	},

	playerImage: {
		width: playerSize + 18,
		height: playerSize + 18,
		position: 'absolute',
		zIndex: 10,
	},
	gameInfo: {
		// padding: 20,
		flex: 1,
		// backgroundColor: 'red',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	playerCol: {
		// padding: 20,
		flex: 1,
		// backgroundColor: 'red',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	},
	infoText: {
		fontSize: 15,
		position: 'absolute',
		right: 20,
		top: 15,
		fontWeight: 'bold',
		// marginBottom: 10,
	},
	button: {
		width: 120,
		height: 40,
	},
	playerStart: {
		width: 100,
		height: 20,
	},
	rollText: {
		fontSize: 60,
		fontFamily: 'monospace',
		color: 'green',
		marginBottom: 10,
	},
	grid: {
		flexDirection: 'column',
		// margin: 20,
		borderWidth: 2,
		borderColor: '#000',
		// marginTop: 75
	},
	box: {
		width: boardWidth / 5,
		height: boardHeight / 10,
		borderWidth: 1,
		borderColor: '#ccc',
		alignItems: 'center',
		justifyContent: 'center',
	},

	playerImageInBox: {
		width: 40,
		height: 40,
	},
	vwPopup: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},
	safeArea: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
		// marginBottom: 10,
	},
	secondRow: {
		flexDirection: 'row',
		// marginBottom: 10,
	},
	leftColumn: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	centerColumn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightColumn: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	iconButton: {
		width: 50,
		height: 50,
	},
	missionButton: {
		width: 160,
		height: 50,
	},
	bossDoorColumn: {
		flex: 1.3,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	diceCountColumn: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	bossDoor: {
		width: 50,
		height: 40,
	},
	diceCount: {
		width: 120,
		height: 45,
	},
	bottomRow: {
		flexDirection: 'row',
	},
	diceContainer: {
		position: 'absolute',
		top: '50%',
		left: 0,
		right: 0,
		alignItems: 'center',
		zIndex: 999,
	},
	popupImg: { width: '100%', height: '100%', resizeMode: 'contain' },
});
