# How to

## Setup

- Install yarn support for VSCode

  ```shell
  yarn dlx @yarnpkg/sdks vscode
  ```

- Update `.vscode/launch.json` for debugging

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

- Update `.vscode/settings.json` for coding

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
