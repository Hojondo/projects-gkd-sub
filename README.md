# GKD-subscription-hojondo

GKD 订阅即可使用

## 声明

**自用**

- `https://fastly.jsdelivr.net/gh/Hojondo/projects-gkd-sub@main/dist/gkd.json5`
- `https://raw.githubusercontent.com/Hojondo/projects-gkd-sub/refs/heads/main/dist/gkd.json5`

## INFO

- 当前版本: v2
- 已适配 6 个应用，
- 查看 [适配 APP 列表](./dist/README.md)

## 目录结构

- 订阅详情 [./src/subscription.ts](./src/subscription.ts)
- 全局规则 [./src/globalGroups.ts](./src/globalGroups.ts)
- 规则分类 [./src/categories.ts](./src/categories.ts)
- 应用规则 [./src/apps](./src/apps/)

在 vscode 内使用鼠标悬浮在任意字段上即可查看注释说明, 也可在 <https://gkd.li/api> 搜索查看

![image](https://e.gkd.li/3b3c8b14-f7f4-46ee-90dc-b69b9233f993)

现在您可编辑 [./src](./src/) 下的文件来自定义您的订阅, 构建后的订阅文件处于 [./dist](./dist/) 目录下

另外您必须修改 订阅详情 [./src/subscription.ts](./src/subscription.ts) 下的 id 字段, 否则可能会和其它订阅冲突, 填一个较大的随机数字即可

可以在 github 查找下方代码块 ([快捷链接](https://github.com/search?q=export+default+defineGkdSubscription%28%7B+++id%3A+&type=code)), 查看您的订阅id是否跟已有项目重复

```ts
export default defineGkdSubscription({
  id:
```

## 格式修复

我们使用 [prettier](https://github.com/prettier/prettier) 来格式化代码 和 [eslint](https://github.com/eslint/eslint) 来检测并修复代码错误

同时使用 [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) 在您提交代码时运行格式化和代码检测修复脚本

当您的代码存在错误时, 它会阻止您提交代码并输出具体错误以供您手动修复后再次提交

当提交代码到仓库时, 我们也需要使用 github actions 来帮助自动格式化并修复代码, 因此您需要开启仓库的此项权限

打开 <https://github.com/username/subscription/settings/actions>

然后找到 Workflow permissions 点击 Read and write permissions 然后点击下方的 Save 即可

![image](https://e.gkd.li/89dd8c22-f3f0-4331-a3d1-03d466dcc3d6)

## 构建订阅

我们需要将 [./src](./src/) 分散的文件合并为一个 gkd.json5 的最终订阅文件并输出到 [./dist](./dist/) 目录下

推荐使用 github actions 进行构建, 在 [./.github/workflows](./.github/workflows) 下有 3 个工作流

我们使用其中的 `build_release.yml` 构建并发布

打开 <https://github.com/username/subscription/actions/workflows/build_release.yml>

然后点击右侧的 `Run workflow` 即可运行并发布

![image](https://e.gkd.li/ab202786-d56d-4dba-a5ee-03190aafb6e6)

构建后订阅将输出到 dist 目录下, gkd.json 的文件订阅地址如下, 复制后到 GKD 添加即可

```txt
https://raw.githubusercontent.com/username/subscription/main/dist/gkd.json5
```

## 镜像加速

raw.githubusercontent.com 在大陆的访问常常无法访问

您可以换成 <https://fastly.jsdelivr.net/gh/username/subscription@main/dist/gkd.json5> 加速访问

如果无法访问 raw.githubusercontent.com 和 fastly.jsdelivr.net

请自行解决网络问题

## 自定义配置文件

注意: **大多数情况下, 你不需要自定义, 使用默认配置时, 下面此节教程无需了解**

你可以在 [./package.json](./package.json) 下添加 gkd 属性配置自定义构建选项

```json
{
  "gkd": {
    "outDir": "dist",
    "file": "gkd.json5",
    "versionFile": "gkd.version.json5",
    "changelog": "CHANGELOG.md",
    "README.md": "README.md"
  }
}
```

这个 gkd 属性的类型如下

```ts
/**
 * @default package.json.gkd
 */
type GkdConfig = {
  /**
   * @default 'dist'
   */
  outDir?: string;
  /**
   * @default 'gkd.json5'
   */
  file?: string;
  /**
   * @default 'gkd.version.json5'
   */
  versionFile?: string;
  /**
   * @default 'CHANGELOG.md'
   */
  changelog?: string;
  /**
   * @default 'README.md'
   */
  readme?: string;
};
```

如果不想写配置文件, 也可以将这个参数直接传递给 `@gkd-kit/tools` 的 `updateDist` 函数

手动传递参数的时候, 你必须显式将路径(非文件名)参数传递给 [./.github/workflows/build_release.yml](./.github/workflows/build_release.yml) 下的 `updatePkgVersion` 和 `stdoutGkdVersion` 函数
