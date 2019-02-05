const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class GitBranchInfoWebpackPlugin {
  // TODO: pass in arguments about the name of the output file, path of the output file
  // names of the keys(?)
  // TODO: date format
  apply (compiler) {
    // compiler.hooks.done.tap('Git Branch Info Webpack Plugin', (stats) => {
    //   // TODO: kick out a JSON file with information about the Git branch and date of the last commit
    //   console.log('asdf')
    // })
    compiler.hooks.emit.tapAsync('Git Branch Info Webpack Plugin', (compilation, callback) => {
      console.log('asdf')

      const pathToFile = './'
      // Creates a JSON file used by the QABar to display current branch name and last commit date
      let gitBranchName = ''
      let gitLastCommitDatetime = ''

      try {
        gitBranchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
      } catch (e) {
        console.error(e)
      }

      try {
        const commitDate = new Date(execSync('git log -1 --format=%ci'))
        gitLastCommitDatetime = `${commitDate.getFullYear()}-${commitDate.getMonth()+1}-${commitDate.getDate()}`
          + ` ${commitDate.getHours()}:${commitDate.getMinutes()}`
      } catch (e) {
        console.error(e)
      }

      const JSONContent = {
        name: gitBranchName,
        date: gitLastCommitDatetime
      }

      // ./dist for build, ./static for development
      const thepath = path.join(pathToFile, 'git.json')
      fs.writeFile(thepath, JSON.stringify(JSONContent), (err) => {
        if (err) {
          console.log('Passed error: ', err)
          console.log('Unable to create git.json file in path: ' + thepath)
          throw err
        }
      })
    })
  }
}

module.exports = GitBranchInfoWebpackPlugin
