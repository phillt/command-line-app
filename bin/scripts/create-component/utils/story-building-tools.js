const TextFilter = require("../../../utils/text-filters/text-filters");

class StoryBuildingTools {
	static buildSlots(slots) {
		let slot_templates = "";

		slots.forEach(
			({ name }) =>
				(slot_templates += `
			${StoryBuildingTools.buildSlot(name)}`)
		);

		return slot_templates;
	}

	static buildSlot(name = "") {
		if (name) {
			return `<template #${TextFilter.toDashCase(name)}>${name} slot</template>`;
		}

		return `${name} slot`;
	}

	static buildPropArgs(props = []) {
		let propsArgs = {};

		props.forEach(({ prop_name, sample_value }) => {
			propsArgs[prop_name] = sample_value;
		});

		return JSON.stringify(propsArgs);
	}
}

module.exports = StoryBuildingTools;
