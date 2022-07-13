const TextFilter = require("../../../../utils/text-filters/text-filters");

const naming_helper = function ({
	name,
	request_methods,
	default_url,
	raw_response,
	computed_props,
}) {
	const name_no_dash = name.replace(/-/g, " ");

	const snake_name = TextFilter.toSnakeCase(name_no_dash);
	const camel_name = TextFilter.toCamelCase(name_no_dash);
	const dash_name = TextFilter.toDashCase(name_no_dash);
	const response_name = TextFilter.toCamelCase(`${name_no_dash} response`);

	let raw_response_import_normalized;
	if (raw_response) {
		raw_response_import_normalized = raw_response.import
			.replaceAll("{", "")
			.replaceAll("}", "");
	}

	const getRequestTypeByType = function (type) {
		return request_methods.find((method) => method.type === type);
	};

	return {
		response_name,
		dash_name,
		snake_name,
		camel_name,
		mixin_name: camel_name,
		default_url,
		request_methods,
		raw_response,
		computed_props,
		raw_response_import_normalized,
		getRequestTypeByType,
	};
};

module.exports = naming_helper;
