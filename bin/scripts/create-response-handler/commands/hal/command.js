const CreateComponent = require("../../../../utils/template-manager/template-manager");
const mixin_template = require("./mixin-template");
const test_template = require("./test-template");

const createHalMixin = function () {
	const createComponent = new CreateComponent({
		templates: [
			{
				template: mixin_template,
				extension: ".js",
			},
			{
				template: test_template,
				extension: ".spec.js",
			},
		],
		interpolation_question_map: [
			{
				key: "default_url",
				question: "What is the default URL the api should call?",
			},
		],
	});

	createComponent.buildComponent();
};

module.exports = createHalMixin;
