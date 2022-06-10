const component_template = require("./component-template");
const test_template = require("./component-test-template");
const TemplateManager = require("../../../../utils/template-manager/template-manager");
const HumanApi = require("../../../../utils/human-api");
const path_map = require("../../../../salt-path-maps");
const PathsBuddy = require("../../../../utils/paths-buddy/paths-buddy");

const singleFileComponent = function () {
	const interpolation_question_map = [
		{
			key: "component_type",
			question: "What kind of component is this? (atom, molecule, organism)",
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
		{
			key: "slotted",
			optional: "Slotted?",
			value: true,
		},
	];

	const humanApi = new HumanApi();
	humanApi.survey(interpolation_question_map);

	const templateManager = new TemplateManager({
		interpolation_data: humanApi.data,
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
	});

	const templates = templateManager.buildTemplates();
	PathsBuddy.writeFiles(path_map[humanApi.data.component_type], templates);
};

module.exports = singleFileComponent;
