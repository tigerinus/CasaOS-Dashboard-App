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

- Make sure CasaOS Message Bus is running
- Make sure CasaOS LocalStorage is running
- Update `.env` (based on `.env.sample`) with correct `CASAOS_HOST` and `CASAOS_PORT`
- Run

  ``` shell
  yarn start
  ```
