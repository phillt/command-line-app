const component_template = require("./component-template");
const test_template = require("./component-test-template");
const TemplateManager = require("../../../../utils/template-manager/template-manager");
const HumanApi = require("../../../../utils/human-api");
const path_map = require("../../../../salt-path-maps");
const PathsBuddy = require("../../../../utils/paths-buddy/paths-buddy");
const SETTINGS = require("../../../../../settings");
const TextFilters = require("../../../../utils/text-filters/text-filters");

const singleFileComponent = function () {
	const interpolation_question_map = [
		{
			key: "component_type",
			question: "What kind of component is this? (atom, molecule, organism)",
			choices: ["atom", "molecule", "template", "organism"],
		},
		{
			key: "name",
			question: "What is the name of your component?",
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
			key: "slots",
			optional: "Slotted?",
			continue_question: "Add another?",
			collection: [{ key: "name", question: "Slot name: " }],
		},
	];

	const humanApi = new HumanApi();
	humanApi.survey(interpolation_question_map);

	const templateManager = new TemplateManager({
		interpolation_data: humanApi.data,
		templates: [
			{
				name: TextFilters.toDashCase(humanApi.data.name),
				template: component_template,
				extension: ".vue",
			},
			{
				name: TextFilters.toDashCase(humanApi.data.name),
				template: test_template,
				extension: ".spec.js",
			},
		],
	});

	const templates = templateManager.buildTemplates();

	try {
		const write_path = SETTINGS.SALT_PATH + path_map[humanApi.data.component_type.trim() + "s"];
		PathsBuddy.writeFiles(write_path, templates);
		console.log("New component created at: ", write_path);
	} catch (e) {
		console.error("Something went wrong", e);
	}
};

module.exports = singleFileComponent;
