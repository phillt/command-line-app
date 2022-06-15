const TextFilter = require("../../../../utils/text-filters/text-filters");
const ComponentBuildingTools = require("../../utils/component-building-tools");

const component_template = function ({ name, injection, props }) {
	const dash_name = TextFilter.toDashCase(name);

	return `
<template>
	<div ref="${dash_name}">
		<!-- Component body -->
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
