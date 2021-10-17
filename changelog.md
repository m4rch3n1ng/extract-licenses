# changelog

all notable changes to this project will be documented in this file.

the format is loosely based on [keep a changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [semantic versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

## [0.1.1] - 2021-10-17

### changed

- all functions for reading files are now async

### fixed

- won't break when no path is returned for the license
- will now try to look for a license in readme.md now
- will now stop at the first next header when looking in readme instead of the end

## [0.1.0] - 2021-08-26

### added

- initial release
