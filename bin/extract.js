#!/usr/bin/env node

import sade from "sade"
import index from "../src/index.js"

sade("extract-licenses", true)
	.version("v0.1.0")
	.describe("quickly extract all licenses into a single LICENSES.md file")
	.example("")
	.action(index.bind(null, process.cwd()))
	.parse(process.argv)
