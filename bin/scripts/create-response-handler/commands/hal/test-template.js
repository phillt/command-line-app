const naming_helper = require("./naming_helper");
const TestTemplateTools = require("../../utils/test-template-tools");

const testTemplate = function (template_variables) {
	const {
		raw_response_import_normalized,
		raw_response,
		dash_name,
		mixin_name,
		response_name,
		default_url,
		computed_props,
		getRequestTypeByType,
	} = naming_helper(template_variables);

	return `
import ${mixin_name} from "./${dash_name}";
${TestTemplateTools.importResponseHandlerTestsFactory()}
${TestTemplateTools.buildRawResponseImport(raw_response)}

describe("${dash_name} tests", function () {
    validateDefaultApiStateData(${mixin_name}, "${mixin_name}", "${default_url}");
   
	${TestTemplateTools.buildValidateDefaultComputedData(response_name, mixin_name, computed_props)}
	
	${TestTemplateTools.buildValidateResponseComputedData(
		mixin_name,
		response_name,
		raw_response_import_normalized,
		computed_props,
		getRequestTypeByType("fetch").name
	)}
});
`;
};

module.exports = testTemplate;
