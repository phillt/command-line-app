const prompt = require("prompt-sync")();

class HumanApi {
	#data = {};
	OBJECT = "object";
	COLLECTION = "collection";
	KEY_VALUE_PAIR = "key_value_pair";
	ASK_AND_DEFAULT = "ask_and_default";
	SELECT = "select";

	askFor(key, question) {
		return prompt(question + " : ");
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

	#askQuestionByType(question) {
		if (
			HumanApi.#questionIsOptional(question) &&
			HumanApi.yesOrNo(question.optional) === false
		) {
			return;
		}

		const question_type = this.#checkSurveyQuestionType(question);

		switch (question_type) {
			case this.SELECT:
				return this.askFromSelection(question.key, question.choices, question.question);
			case this.COLLECTION:
				return this.askForCollection(
					question.key,
					question.continue_question,
					question.collection
				);
			case this.OBJECT:
				return this.askForObject(question.key, question.object);
			case this.ASK_AND_DEFAULT:
				return this.askAndDefault(question.key, question.question, question.value);
			case this.KEY_VALUE_PAIR:
			default:
				return this.askFor(question.key, question.question);
		}
	}

	survey(survey) {
		this.hr();
		for (const question of survey) {
			this.#data[question.key] = this.#askQuestionByType(question);
		}
	}

	askAndDefault(key, value) {
		return value;
	}

	askForObject(object_key, interpolation_data_group) {
		return this.#collectObject(interpolation_data_group);
	}

	askForCollection(collection_key, confirm_question, interpolation_data_group) {
		return this.#buildArrayOfObjects(confirm_question, interpolation_data_group);
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
			return response;
		} else if (!isNaN(response) && selection[response]) {
			return selection[response];
		}

		console.log("Please make a valid selection.");
		return this.askFromSelection(key, selection, question);
	}

	#collectObject(interpolation_data_group) {
		const data = {};

		for (const group of interpolation_data_group) {
			data[group.key] = this.#askQuestionByType(group);
		}

		return data;
	}

	#buildArrayOfObjects(continue_question, interpolation_data_group) {
		const collection = [];
		let continue_collecting = true;

		while (continue_collecting) {
			collection.push(this.#collectObject(interpolation_data_group));
			continue_collecting = HumanApi.yesOrNo(continue_question);
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
