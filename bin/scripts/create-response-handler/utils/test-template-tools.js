const PathsBuddy = require("../../../utils/paths-buddy/paths-buddy");

class TestTemplateTools {
	static buildRequestMethodGeneratorYieldStatement(
		requestMethodName,
		requestType,
		url,
		mixinNameSpace
	) {
		return `yield [ 
					${requestMethodName},
					${requestType},
					[{sample: "x"}],
					[{sample: "x"}, ${url}],
					${mixinNameSpace},
                ];
		`;
	}

	static buildRawResponseImport(response_import) {
		if (!response_import) {
			return "";
		}

		return `import ${response_import.import} from "${response_import.from}";
			`;
	}

	static importResponseHandlerTestsFactory() {
		return `import {
    validateComputedDataWithResponse,
    validateDefaultApiComputedData,
    validateDefaultApiStateData,
    validateFetchMethod,
    validateFetchMethodHandlesErrors,
} from "${PathsBuddy.getRelativePathTo("response-handler-tests-factory")}";`;
	}

	static buildDefaultComputedResponseYield(computed_props = []) {
		let yields = "";

		computed_props.forEach(({ default_value, key }) => {
			yields += ` yield ["${key}", ${default_value}];
			`;
		});
		return yields;
	}

	static buildValidateDefaultComputedData(response_name, camel_name, computed_props) {
		return `
		 const provideExpectedComputedValues = function* () {
        yield ["${response_name}", null];
        ${this.buildDefaultComputedResponseYield(computed_props)}
    };

    validateDefaultApiComputedData(${camel_name}, provideExpectedComputedValues);
		`;
	}

	static buildValidateResponseComputedData(response_name, response) {
		return `
		 const provideExpectedComputedValuesWithResponse = function* () {
		     yield ["${response_name}", ${response}, ${response}]
		 }
		`;
	}
}

module.exports = TestTemplateTools;
