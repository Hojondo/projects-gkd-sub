import { updateDist } from '@gkd-kit/tools';
import subscription from './check';
import { updateReadMeMd } from './autoUpdateMD';

await updateDist(subscription);
await updateReadMeMd();
