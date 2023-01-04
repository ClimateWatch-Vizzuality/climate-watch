---
layout: default
title: Release
permalink: /_docs/release
---

# Release

## Semantic versioning on Half Earth
We do our own flavour of [Semantic Versioning](https://semver.org){:target="_blank"}, in order to fulfill the specificities of a data intensive user facing project. In short, updates on version number will increase depending on the type of change that has been done to the codebase.
This should be the structure of the version number: `major.minor.patch`

To release using a [fork of zeit release](https://github.com/vizzuality/release) to generate the changelog automatically with all of the PR included since the last release just run:

(Be sure you have all of your branches sync first,
and merge the changes that you want in master locally before running the command)

```bash
npx release 'major' | 'minor' | 'patch'
```

and push to master!