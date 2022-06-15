const prompt = require("prompt-sync")();

class HumanApi {
	#data = {};
	OBJECT = "object";
	COLLECTION = "collection";
	KEY_VALUE_PAIR = "key_value_pair";
	ASK_AND_DEFAULT = "ask_and_default";
	SELECT = "select";

	askFor(key, question) {
		this.#data[key] = prompt(question);
		return this.#data[key];
	}

	get data() {
		return this.#data;
	}

	static yesOrNo(question) {
		let response = prompt(question + " (Y/n)")
			.charAt(0)
			.toLowerCase();

		if (response !== "y" && response !== "n") {
			console.log("Please answer Yes or No (Y/n)");
			this.yesOrNo(question);
		}

		return response === "y";
	}

	#checkSurveyQuestionType(question) {
		if (question.hasOwnProperty("choices")) {
			return this.SELECT;
		}

		if (question.hasOwnProperty("collection")) {
			return this.COLLECTION;
		}

		if (question.hasOwnProperty("object")) {
			return this.OBJECT;
		}

		if (question.hasOwnProperty("optional") && question.hasOwnProperty("value")) {
			return this.ASK_AND_DEFAULT;
		}

		return this.KEY_VALUE_PAIR;
	}

	static #questionIsOptional(question) {
		return question.hasOwnProperty("optional");
	}

	hr() {
		console.log("----------------------------------------");
	}

	h(heading) {
		console.log(`----------------${heading}----------------`);
	}

	survey(survey) {
		this.hr();
		for (const question of survey) {
			if (
				HumanApi.#questionIsOptional(question) &&
				HumanApi.yesOrNo(question.optional) === false
			) {
				continue;
			}

			const question_type = this.#checkSurveyQuestionType(question);

			switch (question_type) {
				case this.SELECT:
					this.askFromSelection(question.key, question.choices, question.question);
					break;
				case this.COLLECTION:
					this.askForCollection(
						question.key,
						question.continue_question,
						question.collection
					);
					break;
				case this.OBJECT:
					this.askForObject(question.key, question.object);
					break;
				case this.ASK_AND_DEFAULT:
					this.askAndDefault(question.key, question.question, question.value);
					break;
				case this.KEY_VALUE_PAIR:
				default:
					this.askFor(question.key, question.question);
			}
		}
	}

	askAndDefault(key, value) {
		this.#data[key] = value;
	}

	askForObject(object_key, interpolation_data_group) {
		this.#data[object_key] = HumanApi.#collectObject(interpolation_data_group);
	}

	askForCollection(collection_key, confirm_question, interpolation_data_group) {
		this.#data[collection_key] = HumanApi.#buildArrayOfObjects(
			confirm_question,
			interpolation_data_group
		);
	}

	/**
	 *
	 * @param {string} key
	 * @param {Array<string>} selection
	 * @param {string} question
	 */
	askFromSelection(key, selection, question) {
		const choose_from = `: Please choose from the following ${selection
			.map((item, index) => ` ${item} (${index})`)
			.join()}`;
		const response = this.normalizedPrompt(question + choose_from);

		if (isNaN(response) && selection.includes(response)) {
			this.#data[key] = response;
			return;
		} else if (!isNaN(response) && selection[response]) {
			this.#data[key] = selection[response];
			return;
		}

		console.log("Please make a valid selection.");
		this.askFromSelection(selection, question, key);
	}

	static #collectObject(interpolation_data_group) {
		const data = {};

		for (const group of interpolation_data_group) {
			const { question, key } = group;
			data[key] = prompt(question);
		}

		return data;
	}

	static #buildArrayOfObjects(continue_question, interpolation_data_group) {
		const collection = [];
		let continue_collecting = true;

		while (continue_collecting) {
			collection.push(this.#collectObject(interpolation_data_group));
			continue_collecting = this.yesOrNo(continue_question);
		}

		return collection;
	}

	normalize(text) {
		return text.toLowerCase();
	}

	normalizedPrompt(question) {
		const response = prompt(question);

		if (isNaN(Number(response))) {
			return this.normalize(response);
		}
		return Number(response);
	}
}

module.exports = HumanApi;
