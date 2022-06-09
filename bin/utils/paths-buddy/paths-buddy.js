const path = require("path");
const path_map = require("../../salt-path-maps");
const SETTINGS = require("../../../settings");
const fs = require("fs");

class PathsBuddy {
	static getRelativePathTo(file_name, prefix = "../") {
		if (path_map[file_name]) {
			return prefix + path.relative(process.cwd(), SETTINGS.SALT_PATH + path_map[file_name]);
		}
		throw new TypeError(`The file ${file_name} has not been registered in salt-path-maps`);
	}

	static writeFiles(write_path, files) {
		files.forEach(({ template, file_name, extension }) => {
			PathsBuddy.writeFile(write_path, file_name, extension, template);
		});
	}

	static writeFile(write_path, file_name, extension, template) {
		fs.mkdirSync(`${write_path}${file_name}`);

		fs.writeFile(
			`${write_path}${file_name}/${file_name}${extension}`,
			template.trim(),
			function (err) {
				if (err) {
					return console.log("Something went wrong creating the file", err);
				}
			}
		);
	}
}

module.exports = PathsBuddy;
