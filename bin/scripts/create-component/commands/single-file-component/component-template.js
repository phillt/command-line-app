const component_template = function ({ dash_name }, { injection, props }) {
	const buildInjection = function () {
		if (!injection) {
			return "";
		}

		return `inject: [${injection.map(({ injection }) => ` "${injection}"`).join()}],`;
	};

	const buildProps = function () {
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
	};

	return `
<template>
	<div ref="${dash_name}">
		<!-- Component body -->
	</div>
</template>

<script>
export default {
	${buildInjection()} 
	${buildProps()}
}
</script>
`;
};

module.exports = component_template;
