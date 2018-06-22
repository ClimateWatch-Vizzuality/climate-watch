# Releases

## Intro

We are using the [release](https://github.com/zeit/release) package to run automatically this process

To make it easier with our workflow it is using a custom fork where it only takes all of the PR commits to generate the changelog instead of them al


## How to

So to make a new release follow the next steps:
1. Make sure you want to put in production everything that it is in develop.
2. Merge develop to master and sync with origin all of the other branches.
3. Run the command ```npx release major|minor|patch```.
4. You will be prompted with a list of commits where you select what time of change it includes. Normally `feature/*` branches go to `minor` and `fix/*` to `patches`
5. When finished you will have:
    - The new version number.
    - The package.json version updated.
    - A new tag committed
    - Changelog ready to publish.

6. Don't forget going to Jenkins and confirm the deploy!