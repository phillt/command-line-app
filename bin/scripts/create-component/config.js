/**
 * @type {CommandManagerConfig}
 */
const config = {
	script_name: "pepper-create-component",
	description: "Will create a given component type.",
	usage: "$0 <type> <name> <omit-tests>",
	example: "$0 --type=single-file-component",
	example_description:
		"Creates a SFC called my-first-component.vue and called my-first-component.spec.js",
	alias: "cc",
	keys: [
		{
			default: "single-file-component",
			description: "What component type to create.",
			name: "type",
			required: false,
			type: "string",
			alias: "t",
		},
	],
};

module.exports = config;
