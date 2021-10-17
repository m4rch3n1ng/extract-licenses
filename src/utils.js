import checker from "license-checker"
import { basename, join } from "node:path"
import { readdir, readFile } from "node:fs/promises"

export function check ( start ) {
	return new Promise(( resolve, reject ) => checker.init({ start }, ( err, pkgs ) => err ? reject(err) : resolve(pkgs)))
}

export async function read ([ name, { licenses, licenseFile, path }]) {
	const main = path == process.cwd()
	const base = licenseFile ? basename(licenseFile) : ""

	if (base.toLowerCase() == "license" || base.endsWith(".txt") || /^license\-[^\.]+$/i.test(base)) {
		const text = await readFile(licenseFile)
		const license = toQuotes(text.toString())

		return {
			name,
			main,
			licenses,
			license
		}
	} else if (base.toLowerCase() == "license.md" || (base.toLowerCase().endsWith(".md") && base.toLowerCase() != "readme.md")) {
		const text = await getFromMarkdown(licenseFile)
		const license = !/\#/g.test(text) ? toQuotes(text) : text

		return {
			name,
			main,
			licenses,
			license
		}
	} else {
		const text = await getFromReadme({ licenseFile, path })
		const license = text && !/\#/g.test(text) ? toQuotes(text) : text

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

async function getFromMarkdown ( path ) {
	const text = await readFile(path)
	const license = text.toString().replace(/^ *\#/gm, "####")

	return license
}

async function getFromReadme ({ path }) {
	const readme = await getReadmePath(path)

	if (readme) {
		const text = await readFile(join(path, readme))
		const [, license = null ] = /\# (?:license|licensing).*?(?:\r?\n)+([^]+?)(\r?\n\#|$)/i.exec(text.toString()) || []

		if (license) {
			return license
		} else {
			// do stuff
			return ""
		}
	} else {
		return ""
	}
}

async function getReadmePath ( dir ) {
	const files = await readdir(dir)
	return files.find(( name ) => name.toLowerCase() == "readme.md")
}
