const component_template = require("./component-template");
const test_template = require("./component-test-template");
const CreateComponent = require("../../../../utils/template-manager/template-manager");

const singleFileComponent = function () {
	const createComponent = new CreateComponent({
		templates: [
			{
				template: component_template,
				extension: ".vue",
			},
			{
				template: test_template,
				extension: ".spec.js",
			},
		],
		interpolation_question_map: [],
	});

	createComponent.buildComponent();
};

module.exports = singleFileComponent;
