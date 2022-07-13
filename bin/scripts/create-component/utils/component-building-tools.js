/**
 * @typedef InjectionObject
 * @type {Object}
 * @property {string} injection - String representing the value of the injected value
 * @property
 */

class ComponentBuildingTools {
	/**
	 * Builds the injection property of a component.
	 * @param { Array.<InjectionObject>}  injection - Array of strings representing the name of the variable
	 * @return {string}
	 */
	static buildInjection(injection) {
		if (!injection) {
			return "";
		}

		return `inject: [${injection.map(({ injection }) => ` "${injection}"`).join()}],`;
	}

	/**
	 * Builds the props section of a vue component.
	 * @param {object} props - Object containing information about the props
	 * @property {string} props.prop_name - The key of the prop
	 * @property {String|Boolean|Array|Object} props.prop_type - The type of prop
	 * @property {boolean?} props.required - Whether the property is required
	 * @property {any} props.default_value - The default value.
	 * @return {string}
	 */
	static buildProps(props) {
		if (!props) {
			return "";
		}

		return `props: {
			${props
				.map(({ prop_name, prop_type, required, default_value }) => {
					return `
					${prop_name}: {
						${prop_type ? `type: ${prop_type},` : ""}
						${required ? `required: ${required},` : ""}
						${default_value ? `default_value: ${default_value},` : ""}
					}`;
				})
				.join()}
		}`;
	}

	static buildSlots(slots = []) {
		let slot_templates = "";
		slots.forEach(
			({ name }) =>
				(slot_templates += `
		${ComponentBuildingTools.buildSlot(name)}
		`)
		);
		return slot_templates;
	}

	static buildSlot(name = "") {
		if (name) {
			return `<slot name="${name}" />`;
		}

		return `<slot />`;
	}
}

module.exports = ComponentBuildingTools;
