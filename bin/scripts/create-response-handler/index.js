#!/usr/bin/env node
const CommandManager = require("../../utils/command-manager/command-manager");
const config = require("./config");

new CommandManager("./commands", config).execute();
