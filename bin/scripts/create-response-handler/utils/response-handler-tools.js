const TextFilter = require("../../../utils/text-filters/text-filters");

/**
 * @typedef {"put"|"fetch"|"delete"|"post"|"patch"} ActionType - the action type.
 */
/**
 * An object for building out a request method
 * @typedef {object} RequestMethodNameType
 * @property {string} name - the name of the request method.
 * @property {ActionType} type - the action type.
 */

class ResponseHandlerTools {
	/**
	 * @param {string} name_space - The name of the operation status name space.
	 * @param {string} name - the name of the request method. Will be prefixed with type.
	 * @param {ActionType} [type=fetch] - Optional action type.
	 */
	static buildRequestMethod(name_space, name, type = "fetch") {
		return `
	${name}: async function (url = this.${name_space}.url) {
		this.$set(this.${name_space}, "loading", true);
		this.$set(this.${name_space}, "error", null);

		try {
			await this.$hal.api.${type}(url);
			if (url !== this.${name_space}.url) {
				this.$set(this.${name_space}, "url", url);
			}

		} catch (e) {
			this.$set(this.${name_space}, "error", e);
		} finally {
			this.$set(this.${name_space}, "loading", false);
		}
	},`;
	}

	/**
	 *
	 * @param {string} name_space - The name of the status namespace.
	 * @param  {Array<RequestMethodNameType>} [requests=[]]
	 * @return {string}
	 */
	static buildRequestMethods(name_space, requests = []) {
		let request_methods = "";

		requests.forEach(({ name, type }) => {
			request_methods += ResponseHandlerTools.buildRequestMethod(name_space, name, type);
		});
		return request_methods;
	}
}

module.exports = ResponseHandlerTools;
