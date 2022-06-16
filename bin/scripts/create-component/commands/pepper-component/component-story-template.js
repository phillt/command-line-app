const StoryBuildingToos = require("../../utils/story-building-tools");
const TextFilter = require("../../../../utils/text-filters/text-filters");

const componentStoryTemplate = function ({ name, component_type, slots, props }) {
	const camel_name = TextFilter.toCamelCase(name);
	const dash_name = TextFilter.toDashCase(name);
	return `
import ${camel_name} from './${dash_name}';

export default {
    title: 'components/${component_type}/${dash_name}',
    component: ${camel_name},
};

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {${camel_name}},
    template: \`
        <${dash_name} v-bind="$props">${StoryBuildingToos.buildSlots(slots)}</${dash_name}>
    \`,
});

export const Primary = Template.bind({});
Primary.args = ${StoryBuildingToos.buildPropArgs(props)};
	
	`;
};

module.exports = componentStoryTemplate;
