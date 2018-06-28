const commander = require('commander')
const pkg = require('./package.json')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const spawn = require('cross-spawn')

let projectName
const ownPath = path.join(__dirname)
const templatePath = path.join(ownPath, 'template')
const originDir = process.cwd()

const program = new commander
  .Command(pkg.name)
  .version(pkg.version)
  .action(name => {
    projectName = name
  })
  .parse(process.argv)

if (!projectName) {
  console.log(chalk.red('必须填写项目名称,例如 create-js-app js-demo'))
  process.exit(1)
}
// package 文件定义
const packageJson = {
  "name": projectName,
  "version": "1.0.0",
  "description": "",
  "browser": `dist/${projectName}.js`,
  "main": "src/main.js",
  "scripts": {
    "build": "standard && rollup -c",
    "dev": "rollup -c -w",
    "test": "node test/test.js",
    "pretest": "npm run build"
  },
  "author": "wengwang",
  "license": "ISC"
}

// 依赖文件
const devDependencies = [
'babel-cli',
'babel-preset-env',
'rollup',
'rollup-plugin-babel',
'rollup-plugin-commonjs',
'rollup-plugin-node-resolve',
'rollup-plugin-filesize',
'rollup-plugin-uglify',
'uglify-es',
'standard',
'ms'
]
const commond = 'npm'
const commondArgs = ['install', '--save-dev', ...devDependencies]

if(!fs.ensureDir(path.resolve(projectName))) {
  fs.mkdirsSync(path.resolve(projectName))
  console.log(chalk.green(`创建 ${projectName} 文件夹成功`))
}
const appDir = path.resolve(projectName)

fs.writeFileSync(`${appDir}/package.json`, JSON.stringify(packageJson, null, 2));
console.log(chalk.green(`创建 package.json 文件成功`))

fs.copySync(templatePath, appDir)
console.log(chalk.green(`拷贝模板文件成功`))

process.chdir(appDir)

console.log(chalk.yellow(`正在安装依赖 ...`))
const installProc = spawn.sync(commond, commondArgs, { stdio: 'inherit'})
console.log(chalk.green(`安装依赖成功`))

console.log('\n')

console.log(chalk.green(`创建 ${projectName} 成功`))

console.log('\n')

console.log(chalk.green(`执行以下命令就能愉快的开始了：`))
console.log(chalk.cyan(`cd ./${projectName} && npm run dev`))