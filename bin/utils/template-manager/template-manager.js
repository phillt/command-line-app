const fs = require("fs");

class TemplateManager {
	#interpolated_templates = [];
	templates = [];
	write_path = "./";
	interpolation_data = null;

	constructor({ interpolation_data, templates, write_path = "./" }) {
		this.interpolation_data = interpolation_data;
		this.templates = templates;
		this.write_path = write_path;
	}

	buildTemplates() {
		this.interpolateTemplates();
		return this.getInterpolatedTemplates();
	}

	interpolateTemplates() {
		this.templates.forEach(({ template, name, ...data }) => {
			let interpolated_template;
			if (typeof template === "function") {
				interpolated_template = template(this.interpolation_data);
			} else {
				throw new TypeError(
					`Expected template to be a function. Got ${typeof template} instead.`
				);
			}
			this.#interpolated_templates.push({
				template: interpolated_template,
				file_name: `${name}`,
				...data,
			});
		});
	}

	getInterpolatedTemplates() {
		return this.#interpolated_templates;
	}
}

module.exports = TemplateManager;
