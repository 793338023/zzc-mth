## 说明

专门本地转换 markdown 为 html 静态资源，转换后的目录可以直接拿来使用

## 安装

```
npm i -D zzc-mth
```

## 使用

建议目录结构

```
|-src
  |  |-认识TCP                  文件md目录
  |  |  |-img                   图片资源
  |  |  |  |-三次握手.png
  |  |  |  |-四次挥手.png
  |  |  |-认识TCP.md           markdown
```

打包指令

```
"scripts": {
    "zzc-mth": "zzc-mth run default"
  },

如果安装在全局直接指令打包即可
zzc-mth run default

```

## 小技巧

生成文件目录结构，window 有 tree，但功能极差，安装 ctree-cli,它可以满足一般的目录结构，默认过滤掉 node_modules

```
npm install ctree-cli -g

// 目录生成到tree.text里
ctree-cli >tree.text
```
