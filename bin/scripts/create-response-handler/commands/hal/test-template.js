const naming_helper = require("./naming_helper");
const TestTemplateTools = require("../../utils/test-template-tools");

const testTemplate = function (template_variables) {
	const { raw_response, dash_name, camel_name, response_name, default_url, computed_props } =
		naming_helper(template_variables);

	return `
import ${camel_name} from "./${dash_name}";
${TestTemplateTools.importResponseHandlerTestsFactory()}
${TestTemplateTools.buildRawResponseImport(raw_response)}

describe("${dash_name} tests", function () {
    validateDefaultApiStateData(${camel_name}, "${camel_name}", "${default_url}");
   
	${TestTemplateTools.buildValidateDefaultComputedData(response_name, camel_name, computed_props)}
});
`;
};

module.exports = testTemplate;
