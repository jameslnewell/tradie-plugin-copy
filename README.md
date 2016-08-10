# tradie-plugin-copy

A plugin for copying random files when tradie builds.

## Installation

    npm --save-dev tradie-plugin-copy

## Usage

1. Configure `tradie.config.js`:

```js
var copy = require('tradie-plugin-copy').default;

module.exports = {
  plugins: [
    copy({files: ['*.html', '*.ico']})
  ]
};
```


2. Run `tradie build`.