# How to

## Setup

```shell
yarn dlx @yarnpkg/sdks vscode
```

`.vscode/settings.json`

```json
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Install

``` shell
yarn
```

## Run Server

``` shell
yarn start
```
