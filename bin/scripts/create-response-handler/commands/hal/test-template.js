const TextFilter = require("../../../../utils/text-filters");

const testTemplate = function ({ name, dash_name, camel_name, snake_name }, { default_url }) {
	return `
import ${camel_name} from "./${dash_name}";
// Update to correct path!
import {
    validateComputedDataWithResponse,
    validateDefaultApiComputedData,
    validateDefaultApiStateData,
    validateFetchMethod,
    validateFetchMethodHandlesErrors,
} from "response-handler-tests-factory";

describe("${name} tests", function () {
    validateDefaultApiStateData(${camel_name}, "${snake_name}_api", "/numberstracker/api/member/22055/year/");

    const provideExpectedComputedValues = function* () {
        yield ["${camel_name}_response", null];
    };

    validateDefaultApiComputedData(${camel_name}, provideExpectedComputedValues);

    const provideExpectedComputedValuesWithResponse = function* () {
        yield ["year_response", halYearResponseSample, halYearResponseSample];
       
    };

	// @todo validate year with response
    // validateComputedDataWithResponse();

    const provideFetchMethodArgumentsAndExpectedUrl = function* () {
        yield ["${TextFilter.toCamelCase(`fetch ${name}`)}", [], "${default_url}"];
    };

    validateFetchMethod(${camel_name}, "${snake_name}_api", provideFetchMethodArgumentsAndExpectedUrl);

    validateFetchMethodHandlesErrors(${camel_name}, "${snake_name}_api", "${TextFilter.toCamelCase(
		`fetch ${name}`
	)}");
});
`;
};

module.exports = testTemplate;
