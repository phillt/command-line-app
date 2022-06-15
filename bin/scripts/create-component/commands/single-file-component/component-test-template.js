const TextFilter = require("../../../../utils/text-filters/text-filters");
const TestBuildingTools = require("../../utils/test-building-tools");

const component_test_template = function ({ name, injection }) {
	const camel_name = TextFilter.toCamelCase(name);
	const dash_name = TextFilter.toDashCase(name);

	return `
import ${camel_name} from "./${dash_name}";
import { shallowMount } from "@vue/test-utils";
import { assert } from "@sinonjs/referee";

const default_options = ${TestBuildingTools.buildDefaultOptions({ injection })}

describe("${name} tests.", function () {
	it("renders", function () {
			assert(shallowMount(${camel_name}, default_options).find({ref: "${dash_name}"}).exists());
	});
});
`;
};

module.exports = component_test_template;
