const fs = require("fs");
const prompt = require("prompt-sync")();

class CreateComponent {
	name;
	interpolation_data = {};
	#interpolated_templates;
	#interpolation_question_map = [];
	templates = [];

	#INTERNAL_DATA_DELIMINATORS = "$$";
	#GATHERED_DATA_DELIMINATORS = "%%";

	constructor({ templates, interpolation_question_map }) {
		this.templates = templates;
		this.#interpolated_templates = templates;

		this.#interpolation_question_map = [
			...this.#interpolation_question_map,
			...interpolation_question_map,
		];
	}

	buildComponent() {
		this.requestComponentName();
		this.gatherInterpolationData(this.#interpolation_question_map);
		this.interpolateGatheredData();
		this.interpolateInternalData();
		this.writeComponentFile();
		console.log("Done dude!");
	}

	requestComponentName() {
		this.name = prompt("What's the name of the component?");
	}

	get component_component_camel_name() {
		const split_name = this.name.split(" ");
		if (split_name.length > 1) {
			let [first_word, ...last_words] = split_name;
			first_word = first_word.toLowerCase();

			let last_words_cased = last_words.map(
				(last_word) => last_word.charAt(0).toUpperCase() + last_word.slice(1)
			);

			return [first_word, ...last_words_cased].toString().replaceAll(",", "");
		}

		return split_name.toString().toLowerCase();
	}

	get component_dash_name() {
		return this.name.replace(/\s/g, "-").toLowerCase();
	}

	gatherInterpolationData(interpolation_question_map) {
		for (let data_point of interpolation_question_map) {
			this.interpolation_data[data_point.key] = prompt(data_point.question);
		}
	}

	interpolateGatheredData() {
		this.#interpolated_templates.forEach(({ template }, index) => {
			this.#interpolated_templates[index].template = this.interpolateTemplate(
				template,
				this.interpolation_data,
				this.#GATHERED_DATA_DELIMINATORS
			);
		});
	}

	interpolateInternalData() {
		const interpolation_data = {
			["component-camel-name"]: this.component_component_camel_name,
			["component-dash-name"]: this.component_dash_name,
			["component-name"]: this.name,
		};

		this.#interpolated_templates.forEach(({ template }, index) => {
			this.#interpolated_templates[index].template = this.interpolateTemplate(
				template,
				interpolation_data,
				this.#INTERNAL_DATA_DELIMINATORS
			);
		});
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
