import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 5678,
  name: 'Hojondo的GKD订阅',
  version: 0,
  author: 'Hojondo',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/Hojondo/projects-gkd-sub',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
