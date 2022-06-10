class TestBuildingTools {
	static buildDefaultOptions(injection) {
		if (!injection) {
			return "";
		}

		const injectOptions = {};
		injection.forEach(
			({ injection, sample_injection }) => (injectOptions[injection] = sample_injection)
		);

		return `const default_options = {provide: ${JSON.stringify(injectOptions)}};`;
	}
}

module.exports = TestBuildingTools;
