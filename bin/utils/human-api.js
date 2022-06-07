const prompt = require("prompt-sync")();

class HumanApi {
	#data = {};

	askFor(key, question) {
		this.#data[key] = prompt(question);
		return this.#data[key];
	}

	get data() {
		return this.#data;
	}

	yesOrNo(question) {
		let response = prompt(question + " (Y/n)")
			.charAt(0)
			.toLowerCase();

		if (response !== "y" || response !== "n") {
			console.log("Please answer Yes or No (Y/n)");
			this.yesOrNo(question);
		}

		return response === "y";
	}
}

module.exports = HumanApi;
