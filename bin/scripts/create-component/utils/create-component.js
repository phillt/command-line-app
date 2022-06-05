const fs = require("fs");
const prompt = require("prompt-sync")();
const TextFilters = require("../../../utils/text-filters");

class CreateComponent {
	name;
	interpolation_data = {};
	#interpolated_templates = [];
	#interpolation_question_map = [];
	templates = [];

	#INTERNAL_DATA_DELIMINATORS = "$$";
	#GATHERED_DATA_DELIMINATORS = "%%";

	constructor({ templates, interpolation_question_map }) {
		this.templates = templates;

		this.#interpolation_question_map = [
			...this.#interpolation_question_map,
			...interpolation_question_map,
		];
	}

	buildComponent() {
		this.requestComponentName();
		this.gatherInterpolationData(this.#interpolation_question_map);
		this.interpolateTemplates();
		this.writeComponentFile();
		console.log("Done dude!");
	}

	requestComponentName() {
		this.name = prompt("What's the name of the component?");
	}

	interpolateTemplates() {
		this.templates.forEach(({ template, ...data }) => {
			let interpolated_template;
			if (typeof template === "function") {
				interpolated_template = template(
					{
						snake_name: TextFilters.toSnakeCase(this.name),
						name: this.name,
						camel_name: this.component_component_camel_name,
						dash_name: this.component_dash_name,
					},
					this.interpolation_data
				);
			} else {
				interpolated_template = this.interpolateGatheredData(template);
				interpolated_template = this.interpolateInternalData(interpolated_template);
			}
			this.#interpolated_templates.push({ template: interpolated_template, ...data });
		});
	}

	get component_component_camel_name() {
		return TextFilters.toCamelCase(this.name);
	}

	get component_dash_name() {
		return TextFilters.toDashCase(this.name);
	}

	gatherInterpolationData(interpolation_question_map) {
		for (let data_point of interpolation_question_map) {
			this.interpolation_data[data_point.key] = prompt(data_point.question);
		}
	}

	interpolateGatheredData(template) {
		return this.interpolateTemplate(
			template,
			this.interpolation_data,
			this.#GATHERED_DATA_DELIMINATORS
		);
	}

	interpolateInternalData(template) {
		const interpolation_data = {
			["component-camel-name"]: this.component_component_camel_name,
			["component-dash-name"]: this.component_dash_name,
			["component-name"]: this.name,
		};

		return this.interpolateTemplate(
			template,
			interpolation_data,
			this.#INTERNAL_DATA_DELIMINATORS
		);
	}

	interpolateTemplate(component_template, interpolation_data, delim) {
		let interpolated_template = component_template;
		Object.keys(interpolation_data).forEach((key) => {
			interpolated_template = interpolated_template.replaceAll(
				`${delim}${key}${delim}`,
				interpolation_data[key]
			);
		});
		return interpolated_template;
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
