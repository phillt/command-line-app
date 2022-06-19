const TestBuildingTools = require("../../utils/test-building-tools");
const TextFilter = require("../../../../utils/text-filters/text-filters");
const component_test_template = function ({ name, injection, slots }) {
	const dash_name = TextFilter.toDashCase(name);
	const camel_name = TextFilter.toCamelCase(name);

	return `
import ${camel_name} from "./${dash_name}";
import { shallowMount } from "@vue/test-utils";
import { assert } from "@sinonjs/referee";

const default_options = ${TestBuildingTools.buildDefaultOptions({ injection, slots })};
describe("${name} tests.", function () {
	it("renders", function () {
			assert(shallowMount(${camel_name}${
		injection ? ", default_options" : ""
	}).findComponent({ref: "${dash_name}"}).exists());
	});
	
	${TestBuildingTools.buildSlotTests(camel_name, slots)}
});
`;
};

module.exports = component_test_template;
