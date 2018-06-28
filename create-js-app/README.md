方便创建基于 rollup 的 js 单文件开发的构建模板  
每次 js 单文件开发时都要拷贝拷贝，想一想，还不如写一个脚本

# create-js-app

## 使用方式

```javascript
// 全局按照插件
npm install create-js-app -g

// 创建目录
create-js-app <project-name>
```

## 目录说明

- src：主目录，入口文件为 `main.js` 可以自行修改
- dist：打包后的文件，默认文件名为 `<project-name>`
- package.json：可以自行定义，如果修改入口文件名的话，记得修改 `main` 字段
- rollup.js：rollup 的配置，自行修改

## 目前的特性

- ES6 语法  
- commonjs 
- uglifyjs

## 未来要做的

- [ ] 模板变为压缩包或者放在 npm 上进行下载，可以减少维护成本和保持最新版本
- [ ] 上线 npm 
- [ ] 增加交互命令行