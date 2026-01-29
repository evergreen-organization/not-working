/**
 * Calculates the left value based on the direction and initial coordinates.
 * @param {number} direction - The direction of the calculation (1 for left-to-right, -1 for right-to-left).
 * @param {Object} initialCoordinates - The initial coordinates object containing the left and top values.
 * @param {number} initialCoordinates.left - The initial left value.
 * @param {number} initialCoordinates.top - The initial top value.
 * @param {number} columns - The number of columns in the grid.
 * @returns {number} - The calculated left value.
 */
import BgStory1 from '../../assets/board1/bg-story1.png';
import Board1 from '../../assets/board1/board1-summer.png';
import Back1 from '../../assets/board1/exit-black.png';
import Setting1 from '../../assets/board1/setting.png';
import DiceCount1 from '../../assets/board1/dice-count.png';
import BossDoor1 from '../../assets/board1/SummerBoard_BossTile.png';
import BgStory2 from '../../assets/board2/bg-story2.png';
import Board2 from '../../assets/board2/board2-autumn.png';
import Back2 from '../../assets/board2/exit-black2.png';
import Setting2 from '../../assets/board2/setting2.png';
import DiceCount2 from '../../assets/board2/dice-count2.png';
import BossDoor2 from '../../assets/board2/AutumnBoard_BossTile.png';
import BgStory3 from '../../assets/board3/bg-story3.png';
import Board3 from '../../assets/board3/board3-winter.png';
import Back3 from '../../assets/board3/exit-black3.png';
import Setting3 from '../../assets/board3/setting3.png';
import DiceCount3 from '../../assets/board3/dice_count3.png';
import BossDoor3 from '../../assets/board3/WinterBoard_BossTile.png';
import BgStory4 from '../../assets/board4/bg-story4.png';
import Board4 from '../../assets/board4/board4-spring.png';
import Back4 from '../../assets/board4/exit-black4.png';
import Setting4 from '../../assets/board4/setting4.png';
import DiceCount4 from '../../assets/board4/dice-count4.png';
import BossDoor4 from '../../assets/board4/SpringBoard_BossTile.png';
import { setCurrentPool } from 'stores';
import { Dimensions } from 'react-native';

export const allBoardSnakes = {
	0: {
		3: '7',
		12: '18',
		13: '9',
		17: '27',
		19: '30',
		20: '11',
		26: '36',
		28: '22',
		29: '23',
		34: '38',
		39: '48',
		40: '32',
		43: '35',
		47: '44',
		49: '42',
	},
	1: {
		3: '9',
		7: '14',
		16: '6',
		17: '8',
		18: '24',
		19: '11',
		21: '30',
		28: '22',
		31: '23',
		34: '26',
		37: '33',
		38: '44',
		45: '35',
		48: '39',
		49: '40',
	},
	2: {
		3: '9',
		8: '14',
		11: '19',
		15: '6',
		16: '27',
		18: '10',
		23: '17',
		31: '22',
		32: '20',
		35: '26',
		39: '48',
		43: '34',
		44: '33',
		46: '37',
		49: '41',
	},
	3: {
		8: '2',
		10: '22',
		12: '4',
		16: '3',
		18: '36',
		20: '9',
		26: '17',
		29: '41',
		30: '19',
		32: '23',
		34: '28',
		38: '27',
		42: '33',
		44: '35',
		47: '43',
	},
};

const { height, width } = Dimensions.get('window');

export const layoutRatio = height / width;
export const boardHeight = height * 0.65;
export const boardWidth = width * 0.9;

export const rows = 10;
export const columns = 5;
const tileHeight = boardHeight / rows;
const tileWidth = boardWidth / columns;

export const initialCordinates = { left: 40, bottom: 52 };
export const playerSize = 40;

export const boxCordinates = [];

for (let i = 0, bottomVal = 52; i < rows; i++, bottomVal += 56) {
	const boxRow = [];
	const direction = i % 2 === 0 ? 1 : -1;

	let leftVal = direction === 1 ? 0 : boardWidth - tileWidth;

	for (let j = 0; j < columns; j++) {
		const box = {
			x: leftVal + tileWidth / 2, // center of tile
			y: i * tileHeight + tileHeight / 2, // center of tile
		};
		boxRow.push(box);
		leftVal += direction * tileWidth;
	}

	boxCordinates.push(boxRow);
}

export const startCoordinate = {
	x: 50,
	y: -50,
};

export const boardAssets = {
	0: {
		background: BgStory1,
		board: Board1,
		back: Back1,
		setting: Setting1,
		diceBg: DiceCount1,
		bossDoor: BossDoor1,
	},
	1: {
		background: BgStory2,
		board: Board2,
		back: Back2,
		setting: Setting2,
		diceBg: DiceCount2,
		bossDoor: BossDoor2,
	},
	2: {
		background: BgStory3,
		board: Board3,
		back: Back3,
		setting: Setting3,
		diceBg: DiceCount3,
		bossDoor: BossDoor3,
	},
	3: {
		background: BgStory4,
		board: Board4,
		back: Back4,
		setting: Setting4,
		diceBg: DiceCount4,
		bossDoor: BossDoor4,
	},
};

export const generateQuestionMapping = (currentBoard) => {
	const tileSets = {
		1: [3, 12, 13, 17, 19, 20, 26, 28, 29, 34, 39, 40, 43, 47, 49],
		2: [3, 7, 12, 16, 17, 18, 19, 21, 28, 31, 34, 37, 38, 45, 48, 49],
		3: [3, 8, 11, 15, 16, 18, 23, 31, 32, 35, 39, 43, 44, 46, 49],
		4: [8, 10, 12, 16, 18, 20, 26, 29, 30, 32, 34, 38, 42, 44, 47],
	};

	const availableTiles = tileSets[currentBoard] || [];

	const questionMapping = {
		51: { type: '1' },
	};

	let typePool = shuffleTypes();

	for (let i = 0; i < availableTiles.length; i++) {
		if (typePool.length === 0) {
			typePool = shuffleTypes();
		}

		const tile = availableTiles[i];
		const type = typePool.pop();
		questionMapping[tile] = { type: String(type) };
	}

	return questionMapping;
};

export const getNextAvailableType = (dispatch, currentPool) => {
	let pool = Array.isArray(currentPool) ? [...currentPool] : [];

	if (pool.length === 0) {
		pool = shuffleTypes();
		dispatch(setCurrentPool(pool));
	}

	const nextType = pool[pool.length - 1];
	const newPool = pool.slice(0, -1);

	dispatch(setCurrentPool(newPool));

	return nextType;
};

export const shuffleTypes = () => {
	const types = [2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = types.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[types[i], types[j]] = [types[j], types[i]];
	}
	return types;
};

export const infoMessages = [
	'Fair labour practices and human rights are considerations under the social aspect of ESG.',
	'Physical, transition and liability risks are climate-related risks. ',
	'Deforestation is one of the causes of climate change.',
	'A Plug-in Hybrid Electric Vehicle (PHEV) is a type of hybrid vehicle that combines a traditional internal combustion engine (ICE) with an electric motor.',
	'ESG stands for Environmental, Social, and Governance.',
	'There are 17 Sustainable Development Goals (SDGs) adopted by the United Nations in 2015, aiming to achieve a more sustainable future for all by 2030.',
	'ESG means more than going green; it`s about caring for the planet, treating people fairly, and running businesses with integrity.',
	'Menara Public Bank 2 is a Gold Leadership in Energy and Environmental Design ("LEED") certified green building.',
	'Gender equality is one of the Sustainable Development Goals (SDG).',
	'The Paris Agreement is the landmark international treaty on climate change adopted in Paris in 2015.',
	'One of the indicators of a phishing website is subtle misspellings.',
	'A common tactic used in phone call scams in Malaysia is scammers impersonating government agencies or officers.',
	'APK files from unknown sources are often linked to scamware and malware. ',
	'A strong password should consist of a mix of uppercase and lowercase letters, numbers, and special characters.',
	'If your account is used for fraud (even unknowingly), you may be blacklisted by banks.',
	'Scams use psychological manipulation (trust, fear, greed or urgency) to influence victims’ emotions and decisions.',
	'Public Bank’s "Fund Lock" is an anti - fraud feature that allows you to lock a specific amount in your account, protecting it from unauthorised transactions and potential scams.',
	'Call 997, and the authorities in charge will coordinate with financial institutions to help stop your money from being stolen.',
	'Quishing or QR code phishing, is a new type of cyberattack where QR codes are used to trick individuals into visiting harmful websites or disclosing sensitive information.',
	'AI voice cloning is now used to impersonate loved ones like children in distress, tricking parents into sending money urgently.',
	'The late Tan Sri Dato’ Sri Dr Teh Hong Piow founded Public Bank in year 1966.',
	'Public Bank has spent RM2.5million on the community, benefitting over 7,000 people in 2024.',
	'Public Bank Group pre-tax profit surpassed RM8 billion for the first time in financial year 2022.',
	'Public Bank Vietnam became a wholly owned subsidiary of Public Bank Berhad in 2016.',
	'Public Islamic Bank Berhad opened its first full-fledged Islamic branch in 2010.',
	'Public Bank was awarded The Best Bank in Malaysia by Alpha Southeast Asia in 2025.',
	'Public Bank has maintained an impeccable track record of 59 unbroken years of profitability.',
	'Public Bank Group has adopted the Bougainvillea flower as its corporate flower.',
	'Public Bank Berhad has been listed on Bursa Malaysia since 6 April 1967.',
	'Public Bank first opened its doors for business at No. 4 Jalan Gereja, Kuala Lumpur.',
	'The U.S. National Academies of Sciences, Engineering, and Medicine determined that an adequate daily water consumption is about 15.5 cups (3.7 litres) for males and 11.5 cups (2.7 litres) for females.',
	'Reading for just six minutes can lower your stress by 68%, which is more effective than listening to music, drinking tea, or taking a walk.',
	'Globally, the average person looks at their phone 58 times a day,about every 10 minutes. Are you above or below average?',
	'Moving your body helps lower stress, boosts creativity, and is perfect for maintaining work-life balance on a busy day.',
	'Taking a short break while working can significantly improve your concentration and help you feel refreshed.',
	'To maintain good health, consume a balanced diet of fruits, vegetables, whole grains, and lean proteins.',
	'Wearing a face mask can help prevent the spread of infectious diseases to others and keep you safe as well.',
	'Playing sports is like giving both your body and mind a boost , it strengthens your physical health and sharpens your mental well-being.',
	'Keyboards, phones, and door handles can all collect germs, including bacteria and viruses, making it important to keep them clean.',
	'For most adults, aiming for 7,000 to 10,000 steps each day is a great way to boost your health.',
	'The three key principles of service recovery are show empathy, take responsibility, and provide solutions.',
	'The purpose of service recovery is to turn a negative experience into a positive one and regain trust.',
	'Customers with speech disabilities are considered vulnerable customers.',
	'Great customer service doesn’t just keep customers but it turns them into advocates as well. When you truly impress someone, they will share their experience with others.',
	'In customer service, a simple nod and genuine eye contact can make customers feel truly understood as your body language speaks louder than words.',
	'Poor customer service in banking can damage a bank’s profitability, reputation, and long-term stability.',
	'Being customer-centric means putting customers at the heart of everything we do.',
	'A customer’s complaint can be one of the most valuable tools for improving customer service.',
	'Listening is one of the most important skills in customer service. It helps you understand their needs and build stronger relationships.',
	'A positive attitude can make conversations more pleasant and build stronger connections.',
	'Public Bank Group has committed to achieve Carbon Neutral position (Scope 1 and Scope 2) by 2030 and Net Zero Carbon by 2050.',
	'Sitting for long periods can be as harmful as smoking. Prolonged sitting increases the risk of obesity, heart disease, and early death.',
	'Cold showers may help strengthen your immune system and make you more resilient.',
	'According to a research conducted by Yale, people who read books tend to live longer than non-readers.',
	'Chewing gum doesn’t just freshen your breath, it can also give your brain a little boost in focus and alertness.',
	'Consuming dark chocolate in moderation can be heart-healthy. The flavanols in it may help improve blood flow, lower blood pressure slightly, and support overall cardiovascular health.',
	'Laughing for 10–15 minutes a day can burn a few extra calories while lowering stress hormones and boosting endorphins.',
	'Your left lung is smaller than your right lung to make room for your heart. This unique design helps protect your heart and allows it to function properly within your chest.',
	'Your heart beats about 100,000 times every day and that’s roughly 2.5 billion beats over an average lifetime.',
	'Regular meditation can strengthen the prefrontal cortex and the brain area linked to focus and decision-making. Even short daily sessions, like 10 minutes, may start building benefits over time.',
];
