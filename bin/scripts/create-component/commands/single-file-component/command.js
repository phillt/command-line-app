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
		interpolation_question_map: [
			{
				key: "injection",
				optional: "Add injected data?",
				continue_question: "Add another?",
				collection: [
					{ key: "injection", question: "Name of provided value?" },
					{ key: "sample_injection", question: "Sample value of this injected value: " },
				],
			},
			{
				key: "props",
				optional: "Add props?",
				continue_question: "Add another?",
				collection: [
					{ key: "prop_name", question: "Prop name: " },
					{ key: "prop_type", question: "Prop type: " },
					{ key: "required", question: "required (true/false)? " },
					{ key: "default_value", question: "default value (press enter if none)? " },
				],
			},
		],
	});

	templateManager.buildComponent();
};

module.exports = singleFileComponent;
