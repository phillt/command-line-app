const TextFilter = require("../../../../utils/text-filters/text-filters");

const component_test_template = function ({ name, injection }) {
	const camel_name = TextFilter.toCamelCase(name);
	const dash_name = TextFilter.toDashCase(name);

	const buildDefaultOptions = function () {
		if (!injection) {
			return "";
		}

		const injectOptions = {};
		injection.forEach(
			({ injection, sample_injection }) => (injectOptions[injection] = sample_injection)
		);

		return `const default_options = {provide: ${JSON.stringify(injectOptions)}};`;
	};

	return `
import ${camel_name} from "./${dash_name}";
import { shallowMount } from "@vue/test-utils";
import { assert } from "@sinonjs/referee";

${buildDefaultOptions()}

describe("${name} tests.", function () {
	it("renders", function () {
			assert(shallowMount(${camel_name}${
		injection ? ", default_options" : ""
	}).find({ref: "${dash_name}"}).exists());
	});
});
`;
};

module.exports = component_test_template;
