const ComponentBuildingTools = require("../../utils/component-building-tools");
const TextFilters = require("../../../../utils/text-filters/text-filters");

const component_template = function ({ name, injection, props, slotted }) {
	const dash_name = TextFilters.toDashCase(name);
	return `
<template>
	<div ref="${dash_name}">
		<!-- Component body -->
		${slotted ? ComponentBuildingTools.buildSlot() : ""}
	</div>
</template>

<script>
export default {
	${ComponentBuildingTools.buildInjection(injection)} 
	${ComponentBuildingTools.buildProps(props)}
}
</script>
`;
};

module.exports = component_template;
