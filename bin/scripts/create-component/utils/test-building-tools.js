class TestBuildingTools {
	static buildDefaultOptions({ injection = [], slots = [] }) {
		const options = {};

		if (injection?.length) {
			const injectOptions = {};
			injection.forEach(
				({ injection, sample_injection }) => (injectOptions[injection] = sample_injection)
			);

			options.provide = injectOptions;
		}

		if (slots?.length) {
			let slot_options = {};
			slots.forEach(({ name }) => {
				slot_options[name] = `content for ${name}`;
			});

			options.slots = slot_options;
		}

		return `${JSON.stringify(options)}`;
	}

	static buildSlotTests(wrapper_component, slots = []) {
		let slot_yields = ``;
		let slot_options = {};
		slots.forEach(({ name }) => {
			slot_yields += `
			yield ["${name}", "content for ${name}"];`;
			slot_options[name] = "content for ${name}";
		});

		return `
			describe("Renders slots correctly", function () {
				const provideSlotContent = function *(){
					${slot_yields}
				}
				
				const sut = shallowMount(${wrapper_component}, default_options);
				for (const conditions of provideSlotContent()) {
					const [slot_name, expected_content] = conditions;
					it(slot_name, function () {
					    assert.contains(sut.html(), expected_content);
					});				
				}
			});
		`;
	}
}

module.exports = TestBuildingTools;
