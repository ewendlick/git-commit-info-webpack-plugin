<div align="center">
  <h1>Git Commit Info Webpack Plugin</h1>
  <p>Generate a JSON file containing information about the current Git commit via a <a href="http://webpack.github.io/">Webpack</a> 4 plugin</p>
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
const GitCommitInfoWebpackPlugin = require("git-commit-info-webpack-plugin");

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
|**`pathToFile`**|`{String}`|Path to folder that will contain the output file. This folder must already exist during Webpack's "afterEmit" compiler hook.|
|**`filename`**|`{String}`|Name of the JSON output file.|

A JSON file will be created with the following key-value pairs:

|Key|Description|Example|
|:-:|:---------:|:------|
|**`branch_name`**|Current Git branch name|feature/my_new_feature|
|**`last_commit_date`**|Datetime of latest commit|2019-02-06T06:10:03.000Z|
|**`last_commit_author`**|Author of latest commit|eli.wendlick|
|**`last_commit_hash`**|Full hash of latest commit|154e57fca206014c30ccf6f520f0e918cc1f4256|
