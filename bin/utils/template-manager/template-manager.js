const fs = require("fs");
const TextFilters = require("../text-filters/text-filters");
const HumanApi = require("../human-api");

class TemplateManager {
	name;
	#interpolated_templates = [];
	#interpolation_question_map = [];
	templates = [];
	humanApi;
	write_path = "./";
	interpolation_data = null;

	constructor({ interpolation_data, templates, interpolation_question_map, write_path = "./" }) {
		this.humanApi = new HumanApi();

		this.interpolation_data = interpolation_data;
		this.templates = templates;
		this.write_path = write_path;

		this.#interpolation_question_map = [
			...this.#interpolation_question_map,
			...interpolation_question_map,
		];
	}

	get interpolationData() {
		return this.humanApi.data;
	}

	/**
	 * @deprecated - use buildTemplates
	 */
	buildComponent() {
		this.requestFileName();
		this.gatherInterpolationData(this.#interpolation_question_map);
		this.interpolateTemplates();
		this.writeComponentFile();
		console.log("Done dude!");
	}

	buildTemplates() {
		this.requestFileName();
		this.gatherInterpolationData(this.#interpolation_question_map);
		this.interpolateTemplates();
		return this.getInterpolatedTemplates();
	}

	requestFileName() {
		this.humanApi.askFor("name", "What's the name of this file?");
	}

	interpolateTemplates() {
		this.templates.forEach(({ template, ...data }) => {
			let interpolated_template;
			if (typeof template === "function") {
				interpolated_template = template(
					{
						snake_name: TextFilters.toSnakeCase(this.humanApi.data.name),
						name: this.humanApi.data.name,
						camel_name: this.camel_name,
						dash_name: this.dash_name,
					},
					this.interpolation_data
				);
			} else {
				throw new TypeError(
					`Expected template to be a function. Got ${typeof template} instead.`
				);
			}
			this.#interpolated_templates.push({ template: interpolated_template, ...data });
		});
	}

	get camel_name() {
		return TextFilters.toCamelCase(this.humanApi.data.name);
	}

	get dash_name() {
		return TextFilters.toDashCase(this.humanApi.data.name);
	}

	gatherInterpolationData(interpolation_question_map) {
		this.humanApi.survey(interpolation_question_map);
	}

	getInterpolatedTemplates() {
		return this.#interpolated_templates;
	}

	/**
	 * @deprecated - Use PathsBuddy.writeFiles() to write the templates. Use getInterpolatedTemplates to get the templates.
	 */
	writeComponentFile() {
		fs.mkdirSync(`${this.write_path}${this.dash_name}`);
		this.#interpolated_templates.forEach(({ template, extension }) => {
			fs.writeFile(
				`${this.write_path}${this.dash_name}/${this.dash_name}${extension}`,
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

module.exports = TemplateManager;
