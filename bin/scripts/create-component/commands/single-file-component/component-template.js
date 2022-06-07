const component_template = function ({ dash_name }) {
	return `
<template>
	<div ref="${dash_name}">
		<!-- Component body -->
	</div>
</template>

<script>
export default {}
</script>
`;
};

module.exports = component_template;
