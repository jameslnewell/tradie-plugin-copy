# tradie-plugin-copy

A plugin for copying random files.

## Installation

    npm --save-dev tradie-plugin-files

## Usage

Configure `.tradierc`:

```json
{
  "plugins": [["files", {"files": ["*.html", "*.ico"], "src": "./src", "dest": "./dist"}]]
}
```

Run `tradie build`.