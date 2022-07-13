const ResponseHandlerTools = require("../../utils/response-handler-tools");
const naming_helper = require("./naming_helper");

const template = function (template_variables) {
	const { camel_name, response_name, request_methods, default_url } =
		naming_helper(template_variables);

	const built_request_methods = ResponseHandlerTools.buildRequestMethods(
		camel_name,
		request_methods
	);

	return `
export default {
    data: function () {
        return {
            ${camel_name}: {
                loading: false,
                error: null,
                url: "${default_url}",
            }
        }
    },
    computed: {
        ${response_name}: function () {
            return this.$hal.data?.[this.${camel_name}.url] ?? null; 
        }
        // Abstract response data here
    },
    methods: {
    	${built_request_methods}
    }
}
`;
};

module.exports = template;
