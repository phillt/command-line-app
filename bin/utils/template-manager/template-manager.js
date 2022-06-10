const fs = require("fs");
const TextFilters = require("../text-filters/text-filters");
const HumanApi = require("../human-api");

class TemplateManager {
	name;
	#interpolated_templates = [];
	#interpolation_question_map = [];
	templates = [];
	write_path = "./";
	interpolation_data = null;

	constructor({ interpolation_data, templates, interpolation_question_map, write_path = "./" }) {
		this.interpolation_data = interpolation_data;
		this.templates = templates;
		this.write_path = write_path;

		this.#interpolation_question_map = [
			...this.#interpolation_question_map,
			...interpolation_question_map,
		];
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
		this.gatherInterpolationData(this.#interpolation_question_map);
		this.interpolateTemplates();
		return this.getInterpolatedTemplates();
	}

	interpolateTemplates() {
		this.templates.forEach(({ template, ...data }) => {
			let interpolated_template;
			if (typeof template === "function") {
				interpolated_template = template(this.interpolation_data);
			} else {
				throw new TypeError(
					`Expected template to be a function. Got ${typeof template} instead.`
				);
			}
			this.#interpolated_templates.push({ template: interpolated_template, ...data });
		});
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
