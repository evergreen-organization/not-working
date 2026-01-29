// import Expo from 'expo';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

// Preload sounds on object creation help with loading times
export default class Sounds {
	constructor() {
		this.playerDeath = new Sound(require('../assets/sound_bits/player_death.mp3'));
		this.enemyPlayerCollision = new Sound(
			require('../assets/sound_bits/enemy_player_collision.mp3'),
		);
		this.playerProjectile = new Sound(require('../assets/sound_bits/player_projectile.mp3'));
		this.enemyProjectile = new Sound(require('../assets/sound_bits/enemy_projectile.mp3'));
		this.enemyProjectileCollision = new Sound(
			require('../assets/sound_bits/enemy_projectile_collision.mp3'),
		);
		this.playerCollectibleCollision = new Sound(
			require('../assets/sound_bits/player_collectible_collision.mp3'),
		);
		this.playerHeartCollision = new Sound(
			require('../assets/sound_bits/player_heart_collision.mp3'),
		);
		this.playerAsteroidCollision = new Sound(
			require('../assets/sound_bits/player_asteroid_collision.mp3'),
		);
		this.playerEProjectileCollision = new Sound(
			require('../assets/sound_bits/player_eprojectile_collision.mp3'),
		);
		this.playerOutOfAmmo = new Sound(require('../assets/sound_bits/player_out_of_ammo.mp3'));
	}

	playPlayerDeath = () => {
		this.playerDeath.stop(() => this.playerDeath.play());
	};

	playEnemyPlayerCollision = () => {
		this.enemyPlayerCollision.stop(() => this.enemyPlayerCollision.play());
	};

	playPlayerProjectile = () => {
		this.playerProjectile.stop(() => this.playerProjectile.play());
	};

	playEnemyProjectile = () => {
		this.enemyProjectile.stop(() => this.enemyProjectile.play());
	};

	playEnemyProjectileCollision = () => {
		this.enemyProjectileCollision.stop(() => this.enemyProjectileCollision.play());
	};

	playPlayerCollectibleCollision = () => {
		this.playerCollectibleCollision.stop(() => this.playerCollectibleCollision.play());
	};

	playPlayerHeartCollision = () => {
		this.playerHeartCollision.stop(() => this.playerHeartCollision.play());
	};

	playPlayerAsteroidCollision = () => {
		this.playerAsteroidCollision.stop(() => this.playerAsteroidCollision.play());
	};

	playPlayerEProjectileCollision = () => {
		this.playerEProjectileCollision.stop(() => this.playerEProjectileCollision.play());
	};

	playPlayerOutOfAmmo = () => {
		this.playerOutOfAmmo.stop(() => this.playerOutOfAmmo.play());
	};
}
