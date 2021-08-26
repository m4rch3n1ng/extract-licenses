<!-- omit in toc -->
# @m4rch/extract-licenses

quickly extract all licenses into a single LICENSES.md file

# table of content

- [table of content](#table-of-content)
- [install](#install)
- [use](#use)
	- [cli](#cli)
	- [api](#api)

# install

```
$ npm install @m4rch/extract-licenses
```

# use

## cli

```
$ extract-licenses -h

  Description
    quickly extract all licenses into a single LICENSES.md file

  Usage
    $ extract-licenses [options]

  Options
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ extract-licenses
```

## api

```js
import extractLicenses from "@m4rch/extract-licenses"
```

the imported command takes a single argument: the directory, which will default to `process.cwd()` and returns a promise, that will resolve, once it is done
