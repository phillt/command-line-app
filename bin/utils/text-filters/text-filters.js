class TextFilters {
	static toCamelCase(string) {
		const split_name = string.split(" ");
		if (split_name.length > 1) {
			let [first_word, ...last_words] = split_name;
			first_word = first_word.toLowerCase();

			let last_words_cased = last_words.map(
				(last_word) => last_word.charAt(0).toUpperCase() + last_word.slice(1).toLowerCase()
			);

			return [first_word, ...last_words_cased].toString().replaceAll(",", "");
		}

		return split_name.toString().toLowerCase();
	}

	static toDashCase(string) {
		return string.replace(/\s/g, "-").toLowerCase();
	}

	static toSnakeCase(string) {
		return string.replace(/\s/g, "_").toLowerCase();
	}
}

module.exports = TextFilters;
