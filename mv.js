const path = require('path')
const fs = require('fs')
const argv = process.argv[2].split('/')
const base = argv[0];
let version;
// 代表加了路径的，取第一个判断
if (argv.length === 2) {
  version = argv[1]
}
console.log(base, version)
const dirName = ['小微', '企业千牛', '拼多多']
// 如果传入的不是这三个文件夹下面的，就return false
const dir = dirName.find(d => d === base);
if (!dir) return false
// qnplugin地址
const qupluginPath = path.join(__dirname, 'ai-original-client/node_modules/qnplugin/dist/bin/qnplugin.dll')
// 读取内容和替换内容
fs.readdir(path.join(__dirname, dir), (err, files) => {
  const file = version ? files.find(f => f === version) : files.slice(files.length - 1)[0];
  if (!file) console.log('没有找到对应文件')
  console.log(path.join(__dirname, dir, file, 'qnplugin.dll'))
  console.log(qupluginPath)
  fs.readFile(path.join(__dirname, dir, file, 'qnplugin.dll'), (err1, f) => {
    if (f) {
      fs.writeFile(qupluginPath, f, (err2, res) => {
        if (err2) {
          console.log(err2)
        } else {
          console.log('成功')
        }
      })
    }
  })
})
