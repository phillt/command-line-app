const component_test_template = function ({ name, camel_name, dash_name }) {
	return `
import ${camel_name} from "./${dash_name}";
import { shallowMount } from "@vue/test-utils";
import { assert } from "@sinonjs/referee";

describe("${name} tests.", function () {
	it("renders", function () {
	    assert(shallowMount(${camel_name}).find({ref: "${dash_name}"}).exists());
	});
});
`;
};

module.exports = component_test_template;
