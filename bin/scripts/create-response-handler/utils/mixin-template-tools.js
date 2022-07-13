class MixinTemplateTools {
	static buildComputedProperty({ key, default_value }) {
		return `
		${key}() { 
		    return ${default_value};
		},`;
	}

	static buildComputedProperties(computed_props = []) {
		let computed_properties = "";

		computed_props.forEach(
			(computed_prop) => (computed_properties += this.buildComputedProperty(computed_prop))
		);

		return computed_properties;
	}
}

module.exports = MixinTemplateTools;
