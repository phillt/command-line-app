const component_template = require("./component-template");
const test_template = require("./component-test-template");
const TemplateManager = require("../../../../utils/template-manager/template-manager");
const HumanApi = require("../../../../utils/human-api");
const TextFilters = require("../../../../utils/text-filters/text-filters");
const PathsBuddy = require("../../../../utils/paths-buddy/paths-buddy");

const singleFileComponent = function () {
	const humanApi = new HumanApi();
	humanApi.survey([
		{
			key: "name",
			question: "What is the name of your component?",
		},
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
	]);

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
		const write_path = process.cwd();
		PathsBuddy.writeFiles(write_path, templates);
		console.log("New component created at: ", write_path);
	} catch (e) {
		console.error("Something went wrong", e);
	}
};

module.exports = singleFileComponent;
