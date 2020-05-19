const fs = require('fs')
const path = require('path')

const currentDir = process.argv[2] || '../merchant-web'
const currentDirPath = path.join(currentDir, '/', 'src')

function mapDir(dir, callback, finish) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.error(err)
      return
    }
    files.forEach((filename, index) => {
      let pathname = path.join(dir, filename)
      fs.stat(pathname, (err, stats) => { // 读取文件信息
        if (err) {
          console.log('获取文件stats失败')
          return
        }
        if (stats.isDirectory()) {
          mapDir(pathname, callback, finish)
        } else if (stats.isFile()) {
          if (!['.vue'].includes(path.extname(pathname))) {  // 排除 目录下的 其他 文件
            return
          }
          fs.readFile(pathname, (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            callback && callback(pathname, data)
          })
        }
      })
      if (index === files.length - 1) {
        finish && finish()
      }
    })
  })
}

mapDir(
  currentDirPath,
  // 读取文件之后的处理
  (pathname, content) => {
    const c = content.toString()
    const len = c.split('\n').length
    if (len > 500) console.log(`路径：${pathname.split('src')[1]}`, `行数：${len}`)
  },
  // 完成后做什么
  () => {
    // console.log(`${currentDir}目录下的文件遍历完成了`)
  })