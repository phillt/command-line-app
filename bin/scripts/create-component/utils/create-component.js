const fs = require("fs");
const TextFilters = require("../../../utils/text-filters/text-filters");
const HumanApi = require("../../../utils/human-api");

class CreateComponent {
	name;
	#interpolated_templates = [];
	#interpolation_question_map = [];
	templates = [];
	humanApi;

	constructor({ templates, interpolation_question_map }) {
		this.templates = templates;
		this.humanApi = new HumanApi();

		this.#interpolation_question_map = [
			...this.#interpolation_question_map,
			...interpolation_question_map,
		];
	}

	get interpolationData() {
		return this.humanApi.data;
	}

	buildComponent() {
		this.requestComponentName();
		this.gatherInterpolationData(this.#interpolation_question_map);
		this.interpolateTemplates();
		this.writeComponentFile();
		console.log("Done dude!");
	}

	requestComponentName() {
		this.humanApi.askFor("name", "What's the name of the component?");
	}

	interpolateTemplates() {
		this.templates.forEach(({ template, ...data }) => {
			let interpolated_template;
			if (typeof template === "function") {
				interpolated_template = template(
					{
						snake_name: TextFilters.toSnakeCase(this.humanApi.data.name),
						name: this.humanApi.data.name,
						camel_name: this.component_component_camel_name,
						dash_name: this.component_dash_name,
					},
					this.humanApi.data
				);
			} else {
				throw new TypeError(
					`Expected template to be a function. Got ${typeof template} instead.`
				);
			}
			this.#interpolated_templates.push({ template: interpolated_template, ...data });
		});
	}

	get component_component_camel_name() {
		return TextFilters.toCamelCase(this.humanApi.data.name);
	}

	get component_dash_name() {
		return TextFilters.toDashCase(this.humanApi.data.name);
	}

	gatherInterpolationData(interpolation_question_map) {
		for (let data_point of interpolation_question_map) {
			this.humanApi.askFor(data_point.key, data_point.question);
		}
	}

	writeComponentFile() {
		fs.mkdirSync(`./${this.component_dash_name}`);
		this.#interpolated_templates.forEach(({ template, extension }) => {
			fs.writeFile(
				`./${this.component_dash_name}/${this.component_dash_name}${extension}`,
				template.trim(),
				function (err) {
					if (err) {
						return console.log("Something went wrong creating the file", err);
					}
				}
			);
		});
	}
}

module.exports = CreateComponent;
