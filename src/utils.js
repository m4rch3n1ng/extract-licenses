import checker from "license-checker"
import { basename } from "node:path"
import { readFileSync } from "node:fs"

export function check ( start ) {
	return new Promise(( resolve, reject ) => checker.init({ start }, ( err, pkgs ) => err ? reject(err) : resolve(pkgs)))
}

export async function read ([ name, { licenses, licenseFile, path }]) {
	const main = path == process.cwd()
	const base = basename(licenseFile)

	if (base.toLowerCase() == "license" || base.endsWith(".txt") || /^license\-[^\.]+$/i.test(base)) {
		const text = readFileSync(licenseFile).toString()
		const license = toQuotes(text)

		return {
			name,
			main,
			licenses,
			license
		}
	} else if (base.toLowerCase() == "license.md" || base.toLowerCase().endsWith(".md")) {
		const text = getFromMarkdown(licenseFile)
		const license = !/\#/g.test(text) ? toQuotes(text) : text

		return {
			name,
			main,
			licenses,
			license
		}
	} else {
		const license = await getFromReadme({ licenseFile, path })

		return {
			name,
			main,
			licenses,
			license
		}
	}
}

function toQuotes ( text ) {
	return text.replace(/^(\r?\n)+|(\r?\n)+$/, "").split(/r?\n/).map(( line ) => `> ${line}`).join("\n")
}

function getFromMarkdown ( path ) {
	const text = readFileSync(path).toString()
	const license = text.replace(/^ *\#/gm, "####")

	return license
}

async function getFromReadme ({ licenseFile, path }) {
	const text = readFileSync(licenseFile).toString()
	const [, license = null ] = /\# license.*?\n([^]+)(\#|$)/i.exec(text) || []

	if (license) {
		return license
	} else {
		// do stuff
		return ""
	}
}
