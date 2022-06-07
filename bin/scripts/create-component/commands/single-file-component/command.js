const component_template = require("./component-template");
const test_template = require("./component-test-template");
const TemplateManager = require("../../../../utils/template-manager/template-manager");

const singleFileComponent = function () {
	const templateManager = new TemplateManager({
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

	templateManager.buildComponent();
};

module.exports = singleFileComponent;
