const TemplateManager = require("../../../../utils/template-manager/template-manager");
const mixin_template = require("./mixin-template");
const test_template = require("./test-template");
const HumanApi = require("../../../../utils/human-api");
const TextFilters = require("../../../../utils/text-filters/text-filters");
const PathsBuddy = require("../../../../utils/paths-buddy/paths-buddy");

const createHalMixin = function () {
	const humanApi = new HumanApi();
	humanApi.survey([
		{
			key: "name",
			question: "Name of this mixin?",
		},
		{
			key: "default_url",
			question: "What is the default URL the api should call?",
		},
	]);

	const templateManager = new TemplateManager({
		interpolation_data: humanApi.data,
		templates: [
			{
				name: TextFilters.toDashCase(humanApi.data.name),
				template: mixin_template,
				extension: ".js",
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

module.exports = createHalMixin;
