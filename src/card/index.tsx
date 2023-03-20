import type { CheckCardGroupProps, CheckCardProps } from './components/checkcard';
import CheckCard from './components/checkcard';
import type { StatisticProps } from './components/statistic';
import Statistic from './components/statistic';
import type { StatisticCardProps } from './components/statisticcard';
import StatisticCard from './components/statisticcard';
import type { ProCardProps } from './procard';
import ProCard from './procard';
import type { ProCardTabsProps } from './typing';

import 'antd/lib/card/style';

export type {
  ProCardTabsProps,
  ProCardProps,
  StatisticCardProps,
  CheckCardGroupProps,
  CheckCardProps,
  StatisticProps,
};
export { StatisticCard, Statistic, CheckCard, ProCard };

export default ProCard;
