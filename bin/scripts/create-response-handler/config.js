const config = {
	script_name: "create-response-handler",
	description: "Will generate a hal response handler and tests.",
	usage: "$0 <type>",
	example: "$0 --type=hal",
	example_description: "Creates a hal response handler and a hal response handler test",
	alias: "crh",
	keys: [
		{
			default: "hal",
			description: "What type of response handler do you want to make.",
			name: "type",
			required: false,
			type: "string",
			alias: "t",
		},
	],
};

module.exports = config;
