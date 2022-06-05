#!/usr/bin/env node

var argv = require("yargs/yargs")(process.argv.slice(2))
	.usage("Usage: $0 <command> [options]")
	.command("create-component", "Used to create and test files.")
	.example(
		"$0 create-component -t single-file-component -n my-component",
		"Creates a file called my-component"
	)
	.alias("n", "name")
	.nargs("n", 1)
	.describe("n", "Name of component")
	.alias("t", "type")
	.nargs("t", 1)
	.describe("t", "The type of component to make")
	.demandOption(["n"])
	.help("h")
	.alias("h", "help")
	.epilog("copyright 2019").argv;

console.log(`Hello ${argv.name}, create this ${argv.type} there`);
