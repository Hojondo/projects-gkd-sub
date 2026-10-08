import fs from 'node:fs/promises';

const parseReadMeMd = async () => {
  const readmePath = process.cwd() + '/dist/README.md';
  const readmeContent = await fs.readFile(readmePath, 'utf-8');

  // 使用正则表达式匹配需要的值
  const appSizeMatch = readmeContent.match(/\|应用\|(\d+)\|/);
  const versionMatch = readmeContent.match(/v(\d+)/);

  const APP_SIZE = appSizeMatch ? appSizeMatch[1] : '';
  const VERSION = versionMatch ? versionMatch[1] : '';

  return { APP_SIZE, VERSION };
};

// 更新 README.md 的模板内容并写入文件
export const updateReadMeMd: () => Promise<void> = async () => {
  const { APP_SIZE, VERSION } = await parseReadMeMd();

  const readmeMdPath = process.cwd() + '/README.md';

  // 读取模板文件
  const oldMainMdContent = await fs.readFile(readmeMdPath, 'utf-8');

  // 替换模板中的占位符
  const readMeMdText = oldMainMdContent
    .replace(/(?<=当前版本:\sv).+$/m, VERSION)
    .replace(/(?<=已适配\s)\d+(?=\s个应用)/, APP_SIZE);

  // 写入 README.md 文件
  await fs.writeFile(readmeMdPath, readMeMdText);
};
