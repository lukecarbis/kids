export const emojiCode = (emoji) => {
	return [...emoji]
		.map((e) => e.codePointAt(0).toString(16))
		.join(`-`)
		.toUpperCase();
};
