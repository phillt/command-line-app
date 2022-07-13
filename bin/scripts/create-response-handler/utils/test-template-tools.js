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

	static buildDefaultComputedYield(computed_props = []) {
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
        ${this.buildDefaultComputedYield(computed_props)}
    };

    validateDefaultApiComputedData(${camel_name}, provideExpectedComputedValues);
		`;
	}

	static buildResponseComputedYield(computed_props, response) {
		let yields = "";

		computed_props.forEach(({ key, mapped_response }) => {
			yields += `yield ["${key}", ${mapped_response}, ${response}];
			`;
		});

		return yields;
	}

	static buildValidateResponseComputedData(mixin_name, response_name, response, computed_props) {
		return `
		 const provideExpectedComputedValuesWithResponse = function* () {
		     yield ["${response_name}", ${response}, ${response}];
		     ${this.buildResponseComputedYield(computed_props, response)}
		 }
		 
		 validateComputedDataWithResponse(${mixin_name}, provideExpectedComputedValuesWithResponse, (v) => v.${response_name}(), {});
		`;
	}
}

module.exports = TestTemplateTools;
