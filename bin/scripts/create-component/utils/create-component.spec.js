const sinon = require("sinon");
const { assert } = require("@sinonjs/referee");
const CreateComponent = require("./create-component");
const HumanApi = require("../../../utils/human-api");

const sandbox = sinon.createSandbox();

const mock_template = sandbox.stub().callsFake(
	() => `
	First Mock Template
`
);

const templates = [
	{
		template: mock_template,
		extension: ".vue",
	},
];

const interpolation_question_map = [];

const default_options = {
	templates,
	interpolation_question_map,
};

describe("CreateComponent", function () {
	beforeEach(function () {
		sandbox.restore();
	});

	it("constructor", function () {
		const sut = new CreateComponent(default_options);
		assert.equals(sut.templates, templates);
	});

	it("requestComponentName", function () {
		const expected_value = "some_name";
		const askForStub = sandbox.stub(HumanApi.prototype, "askFor").returns(expected_value);

		const sut = new CreateComponent(default_options);
		sut.requestComponentName();

		sinon.assert.calledWith(askForStub, "name", "What's the name of the component?");
	});

	it("get interpolationData", function () {
		const expected_response = "expected_response";
		sandbox.stub(HumanApi.prototype, "data").get(() => expected_response);
		const sut = new CreateComponent(default_options);
		assert.equals(sut.interpolationData, expected_response);
	});
});
