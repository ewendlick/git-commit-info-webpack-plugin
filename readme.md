<div align="center">
  <h1>Git Commit Info Webpack Plugin</h1>
  <p>Generate a JSON file containing information about the current Git commit via a [Webpack](http://webpack.github.io/) plugin</p>
</div>

<h2 align="center">Purpose</h2>
This plugin was created with the intention of having git information available for both run and built environments for use in a status bar that would appear on non-production enviornments that would notify QA employees about what code they are currently checking.

The reason for the output file being JSON is to allow more versatility in regards to which language/frameworks are capable of reading it.

<h2 align="center">Install</h2>

```bash
npm install --save git-commit-info-webpack-plugin
```

<h2 align="center">Usage</h2>

To run with default options, modify your Webpack config file(s):
```js
const GitTextPlugin = require("extract-text-webpack-plugin");

// ------

module.exports = {
  module: {
    // ------
  },
  plugins: [
    new GitCommitInfoWebpackPlugin()
  ]
}
```

Additionally, options may be specified:
```js
new GitCommitInfoWebpackPlugin({
  pathToFile: './',
  filename: 'git.json'
})
```

|Name|Type|Description|
|:--:|:--:|:----------|
|**`pathToFile`**|`{String}`|Path to folder that will contain the output file. This folder must exist.|
|**`filename`**|`{String}`|Name of the JSON output file.|
