const path = require("path");
const path_map = require("../../salt-path-maps");
const SETTINGS = require("../../../settings");

class PathsBuddy {
	static getRelativePathTo(file_name, prefix = "../") {
		if (path_map[file_name]) {
			return prefix + path.relative(process.cwd(), SETTINGS.SALT_PATH + path_map[file_name]);
		}
		throw new TypeError(`The file ${file_name} has not been registered in salt-path-maps`);
	}
}

module.exports = PathsBuddy;
