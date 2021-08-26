import { writeFile } from "node:fs/promises"
import { check, read } from "./utils.js"

export default async function index ( dir = process.cwd() ) {
	const pkgs = await check(dir)
	const all = await Promise.all(
		Object.entries(pkgs).map(read)
	)

	const main = all.find(({ main }) => main)
	const licenses = all.filter(({ main }) => !main)

	let file = [
		"# LICENSES",
		"",
		"## LICENSE",
		"",
		""
	]

	file.push(main.license)
	file.push("")

	file = file.concat([
		"## OTHER",
		""
	])

	file = file.concat(
		licenses.map(({ name, license, licenses }) => ([
			`### ${name} -- ${licenses}`,
			"",
			license,
			""
		].join("\n")))
	)

	await writeFile("LICENSES.md", file.join("\n").replace(/(\r?\n){3,}/g, "\n\n"))
}
