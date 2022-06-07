const TextFilter = require("./text-filters");
const { assert } = require("@sinonjs/referee");

describe("TextFilter", function () {
	describe("TextFilter.toCamelCase", function () {
		const provideCamelCaseTestCases = function* () {
			yield ["hello there", "helloThere"];
			yield ["With Caps", "withCaps"];
			yield ["With Multiple WoRdS", "withMultipleWords"];
		};

		for (const conditions of provideCamelCaseTestCases()) {
			const [given_text_to_convert, expected_converted_text] = conditions;
			it(given_text_to_convert, function () {
				assert.equals(
					TextFilter.toCamelCase(given_text_to_convert),
					expected_converted_text
				);
			});
		}
	});

	describe("TextFilter.toDashCase", function () {
		const provideCamelCaseTestCases = function* () {
			yield ["hello there", "hello-there"];
			yield ["With Caps", "with-caps"];
			yield ["With Multiple WoRdS", "with-multiple-words"];
		};

		for (const conditions of provideCamelCaseTestCases()) {
			const [given_text_to_convert, expected_converted_text] = conditions;
			it(given_text_to_convert, function () {
				assert.equals(
					TextFilter.toDashCase(given_text_to_convert),
					expected_converted_text
				);
			});
		}
	});

	describe("TextFilter.toSnakeCase", function () {
		const provideCamelCaseTestCases = function* () {
			yield ["hello there", "hello_there"];
			yield ["With Caps", "with_caps"];
			yield ["With Multiple WoRdS", "with_multiple_words"];
		};

		for (const conditions of provideCamelCaseTestCases()) {
			const [given_text_to_convert, expected_converted_text] = conditions;
			it(given_text_to_convert, function () {
				assert.equals(
					TextFilter.toSnakeCase(given_text_to_convert),
					expected_converted_text
				);
			});
		}
	});
});
