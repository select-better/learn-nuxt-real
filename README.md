### 最简单的部署方式

需要 上传服务器：
.nuxt
static
nuxt.config.js
package.json

将这些文件进行压缩（ 7-zip ）

用 ssh 连接阿里云服务器 ( ssh root@39.105.28.5) 创建 youfile

将压缩文件上传服务器 (scp ./压缩文件 root@39.105.28.5/root/youfile)

解压 (ssh root@39.105.28.5 到相应目录 unzip 压缩文件)

安装依赖 npm install

npm run start 开始网站了

---

- pm2 保持运行，防止本地停止浏览器也打不开了

在连接服务器后

npm install --global pm2

pm2 start npm -- start // 相当于运行 npm run start， 但不会轻易停止

pm2 stop 6 // 6 是 id 就是你上一步启动的时候的 id 也可也 pm2 list 查看脚本 pm2 reload 重启 pm2 delete 删除应用

- 上面都是传统方式的更新

用户本地 --> github <--> ci/cd 服务 --> 发布到服务器

1. 有 linux 服务器
2. github 仓库 在 github 创建 action 和 上次发布个人微博的过程类型

```
name: GitHub Actions Demo
on:
push: tags:
- 'v*'
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
# 下载源码
- name: Checkout
      uses: actions/checkout@master
# 打包构建
- name: Build
      uses: actions/setup-node@master
    - run: npm install
    - run: npm run build
    - run: tar -zcvf release.tgz .nuxt static app.js nuxt.config.js package.json
package-lock.json ecosystem.config.js
# 发布 Release
- name: Create Release
      id: create_release
      uses: actions/create-release@master
      env:
        GITHUB_TOKEN: ${{ secrets.TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Release ${{ github.ref }}
        draft: false
        prerelease: false
# 上传构建结果到 Release
- name: Upload Release Asset
      id: upload-release-asset
      uses: actions/upload-release-asset@master
      env:
       GITHUB_TOKEN: ${{ secrets.TOKEN }}
      with:
        upload_url: ${{ steps.create_release.outputs.upload_url }} # This pulls
from the CREATE RELEASE step above, referencing it's ID to get its outputs
object, which include a `upload_url`. See this blog post for more info:
https://jasonet.co/posts/new-features-of-github-actions/#passing-data-to-future-
steps
        asset_path: ./release.tgz
        asset_name: release.tgz
        asset_content_type: application/x-tgz
# 部署到服务器
- name: Deploy
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        password: ${{ secrets.PASSWORD }}
        port: ${{ secrets.PORT }}
        script: |
          cd /root/pm2-test
          wget https://github.com/lipengzhou/realworld-
nuxtjs/releases/latest/download/release.tgz -O release.tgz
          tar zxvf release.tgz
          npm install --production
          pm2 reload ecosystem.config.js
```
