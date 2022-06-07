const TextFilter = require("../../../../utils/text-filters/text-filters");

const testTemplate = function ({ name, dash_name, camel_name, snake_name }, { default_url }) {
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
} from "response-handler-tests-factory";

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
