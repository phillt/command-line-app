const fs = require("fs");
const path = require("path");
const argv = require("yargs/yargs");

class CommandManager {
	#argv;

	/**
	 *
	 * @param {string} commands_directory - The path to the commands directory
	 * @param {object} options - Settings for this command
	 * @param {number} options.argument_count - Amount of arguments
	 */
	constructor(commands_directory, options) {
		this.#createArgv(options);
		this.#buildOptions();
	}

	#createArgv(options) {
		this.#argv = argv(process.argv.slice(options.argument_count));
	}

	#buildOptions(commands_directory = "./commands") {
		fs.readdir(commands_directory, function (err, files) {
			if (err) {
				console.error(err);
				return;
			}
		});
	}

	#getAllCommandsConfigInDirectory(dir) {}
}

module.exports = CommandManager;
