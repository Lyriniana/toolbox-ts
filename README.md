# toolbox-ts

![TypeScript](https://img.shields.io/badge/typescript-5-blue)

A TypeScript command-line tool built with Commander.js and chalk.

## Features

- Interactive prompts via Inquirer.js
- Colourful output with chalk
- Config file auto-discovery (`.toolbox-tsrc.json`)
- Extensible command structure
- Published as an npm global package

## Installation

```bash
npm install -g toolbox-ts
# or
git clone https://github.com/Lyriniana/toolbox-ts.git && npm install && npm run build
```

## Usage

```bash
toolbox-ts run ./src
toolbox-ts init my-project --template default
toolbox-ts generate component Button
```

## Configuration

| Option | Default | Description |
|---|---|---|
| `--output` | `./out` | Output directory |
| `--dry-run` | `false` | Preview without writing |
| `--verbose` | `false` | Verbose logging |
