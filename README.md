# tradie-plugin-copy

A plugin for copying random files.

## Installation

    npm --save-dev tradie-plugin-copy

## Usage

Configure `.tradierc`:

```json
{
  "plugins": [["copy", {"files": ["*.html", "*.ico"], "src": "./src", "dest": "./dist"}]]
}
```

Run `tradie build`.