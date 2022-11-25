# How to

## Setup

```shell
yarn dlx @yarnpkg/sdks vscode
```

`.vscode/launch.json`

```json
{
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/index.ts",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "start"
            ],
        }
    ]
}
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
