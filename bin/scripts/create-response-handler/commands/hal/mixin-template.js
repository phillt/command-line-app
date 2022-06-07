const TextFilter = require("../../../../utils/text-filters");

const template = function ({ name, snake_name }, { default_url }) {
	const snake_api_namespace = TextFilter.toSnakeCase(name) + "_api";
	return `
export default {
    data: function () {
        return {
            ${snake_api_namespace}: {
                loading: false,
                error: null,
                url: "${default_url}",
            }
        }
    },
    computed: {
        ${snake_name}_response: function () {
            return this.$hal.data?.[this.${snake_api_namespace}.url] ?? null; 
        }
        // Abstract response data here
    },
    methods: {
        ${TextFilter.toCamelCase(
			`fetch ` + name
		)}: async function (url = this.${snake_api_namespace}.url) {
            this.$set(this.${snake_api_namespace}, "loading", true);
            this.$set(this.${snake_api_namespace}, "error", null);

            try {
                await this.$hal.api.fetch(url);
                if (url !== this.${snake_api_namespace}.url) {
                    this.$set(this.${snake_api_namespace}, "url", url);
                }

            } catch (e) {
                this.$set(this.${snake_api_namespace}, "error", e);
            } finally {
                this.$set(this.${snake_api_namespace}, "loading", false);
            }
        }
    }
}
`;
};

module.exports = template;
