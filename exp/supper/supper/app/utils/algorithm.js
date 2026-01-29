const toMatrix = (arr, width) => {
	if (!arr || arr.length === 0) {
		return [];
	}
	if (!width || width <= 0) {
		return [];
	}

	return arr.reduce(
		(rows, key, index) =>
			(index % width === 0
				? rows.push({
						key: index,
						value: [key],
				  })
				: rows[rows.length - 1].value.push(key)) && rows,
		[],
	);
};

const toStaffNo = (adid) => {
	if (!adid || adid.length < 4) {
		return '';
	}
	// remove first 3 characters from ADID
	return adid.slice(3, adid.length);
};

export default { toMatrix, toStaffNo };
