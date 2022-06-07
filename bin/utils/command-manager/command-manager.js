const argv = require("yargs/yargs");

class CommandManager {
	#argv;
	/**
	 * @type {CommandManagerConfig}
	 */
	#options;

	/**
	 *
	 * @param {string} commands_directory - The path to the commands directory
	 * @param {CommandManagerConfig} options - Settings for this command
	 */
	constructor(commands_directory, options) {
		this.#options = options;
		this.#createArgv(options);
	}

	#createArgv() {
		this.#argv = argv(process.argv.slice(2))
			.usage(this.#options.usage)
			.command(this.#options.script_name, this.#options.description)
			.example(this.#options.example, this.#options.example_description)
			.help("h")
			.alias("h", "help")
			.epilog("Hope you like this dude!");

		this.#buildOptions();
	}

	#buildOptions() {
		this.#options.keys.forEach((key) => {
			this.#argv
				.describe(key.alias, key.description)
				.alias(key.alias, key.name)
				.nargs(key.alias, 1)
				.describe("t", "The type of component to make");

			if (key.required) {
				this.#argv.demandOption([key.alias]);
			}

			if (key.default) {
				this.#argv.default(key.alias, key.default);
			}
		});
	}

	execute() {
		const args = this.#argv.argv;
		try {
			const command = require(`../../scripts/${this.#options.script_name}/commands/${
				args.type
			}/command.js`);
			command();
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = CommandManager;
