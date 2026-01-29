export const isArrayItemExist = (array) =>
	array !== null &&
	(array.length > 1 || (array.length === 1 && array[0] !== ''));

export const isArrayNotEmpty = (array) => array !== null && array.length > 0;

export const isContentNotEmpty = (content) =>
	content !== null &&
	(!Array.isArray(content) ? content !== '' : isArrayItemExist(content));

export const getContent = (content) =>
	Array.isArray(content) ? content[0] : content;
