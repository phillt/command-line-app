const TestBuildingTools = require("../../utils/test-building-tools");
const TextFilter = require("../../../../utils/text-filters/text-filters");
const component_test_template = function ({ name, injection }) {
	const dash_name = TextFilter.toDashCase(name);
	const camel_name = TextFilter.toCamelCase(name);

	return `
import ${camel_name} from "./${dash_name}";
import { shallowMount } from "@vue/test-utils";
import { assert } from "@sinonjs/referee";

${TestBuildingTools.buildDefaultOptions(injection)}
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
