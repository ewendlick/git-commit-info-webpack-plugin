const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class GitCommitInfoWebpackPlugin {
  constructor (options) {
    // Default options
    this.options = {
      ...{
        pathToFile: './',
        filename: 'git.json'
      },
      ...options
    }
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('Git Commit Info Webpack Plugin', (compilation, callback) => {
      let gitBranchName = ''
      let gitLastCommitDatetime = ''
      let gitLastCommitAuthor = ''
      let gitLastCommitHash = ''

      try {
        gitBranchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
      } catch (e) {
        console.error(e)
      }

      try {
        const commitDate = new Date(execSync('git log -1 --format=%ci'))
        gitLastCommitDatetime = `${commitDate.getFullYear()}-${commitDate.getMonth() + 1}-${commitDate.getDate()}`
          + ` ${commitDate.getHours()}:${commitDate.getMinutes()}`
      } catch (e) {
        console.error(e)
      }

      try {
        gitLastCommitAuthor = execSync(`git log -1 --pretty=format:'%an'`).toString().trim()
      } catch (e) {
        console.error(e)
      }

      try {
        gitLastCommitHash = execSync('git rev-parse HEAD').toString().trim()
      } catch (e) {
        console.error(e)
      }

      const JSONContent = {
        branch_name: gitBranchName,
        last_commit_date: gitLastCommitDatetime,
        last_commit_author: gitLastCommitAuthor,
        last_commit_hash: gitLastCommitHash
      }

      const fullPath = path.join(this.options.pathToFile, this.options.filename)
      fs.writeFile(fullPath, JSON.stringify(JSONContent), (err) => {
        if (err) {
          console.log('Failed with error: ', err)
          console.log('Unable to create git.json file in path: ' + fullPath)
          throw err
        }
      })
    })
  }
}

module.exports = GitCommitInfoWebpackPlugin
