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
			question: "file name (use dash for spaces IE: my-response). no extension.",
		},
		{
			key: "default_url",
			question: "What is the default URL the api should call?",
		},
		{
			key: "request_methods",
			optional: "Add request type?",
			continue_question: "Add another?",
			collection: [
				{
					key: "type",
					question: "What kind of request?",
					choices: ["fetch", "post", "delete", "patch", "put"],
				},
				{
					key: "name",
					question: "request name? (camel case IE myRequestMethod)",
				},
			],
		},
		{
			key: "raw_response",
			optional: "Import a raw response?",
			continue_question: "Add another?",
			object: [
				{
					key: "import",
					question:
						"variable we will be importing. If not default, please include curly braces: { my_var } ",
				},
				{
					key: "from",
					question: "from path, please don\t include quotes: ie path/to/file.js",
				},
			],
		},
		{
			key: "computed_props",
			optional: "Map computed properties (dont' include response) ?",
			continue_question: "Add another?",
			collection: [
				{
					key: "key",
					question: "computed name?",
				},
				{
					key: "default_value",
					question: "Default value?",
				},
				{
					key: "mapped_response",
					question: "Value when mapped with raw response?",
				},
			],
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
