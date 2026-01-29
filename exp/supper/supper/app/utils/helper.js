function debounce(func, delay) {
	let timeoutId;

	return function debouncedFunction(...args) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}

const clampValue = (value) => {
	if (value < 1) {
		return 0;
	}
	if (value > 255) {
		return 255;
	}
	return value;
};

const darkenHexColor = (hex, percent) => {
	const num = parseInt(hex.replace('#', ''), 16);
	const amt = Math.round(2.55 * percent);
	const R = (num >> 16) - amt;
	const G = ((num >> 8) & 0x00ff) - amt;
	const B = (num & 0x0000ff) - amt;

	const clampedR = clampValue(R);
	const clampedG = clampValue(G);
	const clampedB = clampValue(B);

	return '#' + (0x1000000 + clampedR * 0x10000 + clampedG * 0x100 + clampedB).toString(16).slice(1);
};

export { debounce, darkenHexColor };
