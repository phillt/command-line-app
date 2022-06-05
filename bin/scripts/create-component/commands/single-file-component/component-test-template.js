const component_test_template = `
import $$component-camel-name$$ from "./$$component-dash-name$$";
import { shallowMount } from "@vue/test-utils";
import { assert } from "@sinonjs/referee";

describe("$$component-name$$ tests.", function () {
	it("renders", function () {
	    assert(shallowMount($$component-camel-name$$).find({ref: "$$component-dash-name$$"}).exists());
	});
});
	`;

module.exports = component_test_template;
