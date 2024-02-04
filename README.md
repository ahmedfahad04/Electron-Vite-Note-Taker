# note-marker

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```

### How to add Local File Manipulation features

`src/main/lib/index.ts` (write the action as a function) ==>
`src/main/index.ts` (invoke this function with appropriate args and params) ==>
`src/preload/index.ts` (add context name in contextBridge.exposeInMainWorld) ==>
`src/preload/index.d.ts` (update the global interface) ==>
`src/src/render/store/index.ts` (connect this function with frontend)

### Windows Specific config

- We have to use Path.join to define paths as path definition is different from than that of linux/macos
