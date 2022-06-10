const TextFilter = require("../../../../utils/text-filters/text-filters");
const PathsBuddy = require("../../../../utils/paths-buddy/paths-buddy");

const testTemplate = function ({ name, default_url }) {
	const dash_name = TextFilter.toDashCase(name);
	const camel_name = TextFilter.toCamelCase(name);
	const snake_name = TextFilter.toSnakeCase(name);

	const api_namespace = snake_name + "_api";
	const api_response = snake_name + "_response";
	const mixin_import = camel_name;

	return `
import ${mixin_import} from "./${dash_name}";
// Update to correct path!
import {
    validateComputedDataWithResponse,
    validateDefaultApiComputedData,
    validateDefaultApiStateData,
    validateFetchMethod,
    validateFetchMethodHandlesErrors,
} from "${PathsBuddy.getRelativePathTo("response-handler-tests-factory")}";

describe("${name} tests", function () {
    validateDefaultApiStateData(${mixin_import}, "${api_namespace}", "${default_url}");

    const provideExpectedComputedValues = function* () {
        yield ["${api_response}", null];
    };

    validateDefaultApiComputedData(${mixin_import}, provideExpectedComputedValues);

	// @todo validate year with response
    // validateComputedDataWithResponse();

    const provideFetchMethodArgumentsAndExpectedUrl = function* () {
        yield ["${TextFilter.toCamelCase(`fetch ${name}`)}", [], "${default_url}"];
        yield ["${TextFilter.toCamelCase(
			`fetch ${name}`
		)}", ["with/arbitrary/url"], "with/arbitrary/url"];
    };

    validateFetchMethod(${mixin_import}, "${api_namespace}", provideFetchMethodArgumentsAndExpectedUrl);

    validateFetchMethodHandlesErrors(${mixin_import}, "${api_namespace}", "${TextFilter.toCamelCase(
		`fetch ${name}`
	)}");
});
`;
};

module.exports = testTemplate;
