# Project Atlas：GitHub Pages 作品集

这是一个纯静态个人作品集：首页用卡片聚合 Vercel 上的网页应用，GitHub Actions 每天同步一次线上项目并重新发布到 GitHub Pages。

## 仓库结构

```text
app/
  page.tsx                 # 首页结构与筛选交互
  globals.css              # 视觉样式和响应式布局
data/
  projects.json            # 项目卡片的数据源
public/
  og.png                   # 链接分享预览图
scripts/
  sync-vercel-projects.mjs # 从 Vercel API 获取生产项目
.github/workflows/
  deploy-pages.yml         # 自动同步、构建和部署
next.config.ts             # GitHub Pages 子路径适配
```

## 先换成你的内容

1. 顶部链接已设置为 `https://github.com/northernmelody`。
2. 直接编辑 `data/projects.json`，即可手工管理卡片。字段含义：
   - `name`：项目名
   - `vercelProject`：Vercel 控制台里的项目名，用于自动同步匹配
   - `description`：一句话介绍
   - `url`：Vercel 线上地址
   - `repo`：可选的 GitHub 源码地址
   - `tags`：筛选标签
   - `featured`：是否标记为精选
   - `updatedAt`：更新时间（ISO 格式）

## 部署到 GitHub Pages

1. 新建仓库。若希望地址是 `https://你的用户名.github.io`，仓库名必须是 `你的用户名.github.io`；普通仓库会发布到 `https://你的用户名.github.io/仓库名/`。
2. 把本目录全部文件推送到仓库的 `main` 分支。
3. 打开仓库 **Settings → Pages**，在 **Build and deployment → Source** 中选择 **GitHub Actions**。
4. 打开 **Actions** 查看首次发布；成功后 Pages 页面会显示访问地址。

`next.config.ts` 会自动识别两种 GitHub Pages 地址，不需要手工修改资源路径。

## 自动同步 Vercel

自动同步是可选的；不配置密钥时，工作流会使用 `data/projects.json` 中的手工数据正常发布。

1. 在 Vercel 的 Account Settings → Tokens 创建只用于读取项目的访问令牌。
2. 在 GitHub 仓库 **Settings → Secrets and variables → Actions → Secrets** 添加：
   - `VERCEL_TOKEN`：Vercel 访问令牌（必需）
   - `VERCEL_TEAM_ID`：团队项目才需要；个人项目留空
3. 默认只同步 `data/projects.json` 中已经列出的 5 个项目。若要同步账号下所有项目，可在 **Variables** 添加 `SYNC_ALL_VERCEL_PROJECTS=true`；需要排除项目时，再添加逗号分隔的 `EXCLUDE_VERCEL_PROJECTS`。

工作流每天北京时间约 09:17 运行，也可在 Actions 页面手动运行。同步脚本会保留已有项目的 `description`、`tags` 与 `featured`，只刷新线上地址和更新时间。

## 本地预览

需要 Node.js 22 或更新版本：

```bash
npm install
npm run dev
```

验证 GitHub Pages 静态产物：

```bash
npm run build:pages
```

生成结果位于 `out/`。
