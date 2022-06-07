/**
 * @typedef {object} CommandKeyDefinition
 * @property {any?} default - The default value of the key.
 * @property {string?} description - The description of the key.
 * @property {string} name - The full name of the key.
 * @property {boolean} required - Whether the value is required.
 * @property {string} type - The type of the expected value.
 * @property {string} alias - Short name for key
 */

/**
 * Configuration Object CommandManager
 * @typedef {object} CommandManagerConfig
 * @property {string} usage - The usage command
 * @property {string} description - The description of the command.
 * @property {string} example - An example of the command.
 * @property {string} alias - The shorthand name for this command.
 * @property {string} example_description - The description for the provided example.
 * @property {string} script_name - The file name of the script, no extension.
 * @property {Array<CommandKeyDefinition>?} keys - The arguments accepted by the command.
 */
