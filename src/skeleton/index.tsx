import 'antd/lib/skeleton/style';
import React from 'react';
import type { DescriptionsPageSkeletonProps } from './components/descriptions';
import DescriptionsPageSkeleton, {
  DescriptionsSkeleton,
  TableItemSkeleton,
  TableSkeleton,
} from './components/descriptions';
import type { ListPageSkeletonProps } from './components/list';
import ListPageSkeleton, {
  ListSkeleton,
  ListSkeletonItem,
  ListToolbarSkeleton,
  PageHeaderSkeleton,
} from './components/list';
import ResultPageSkeleton from './components/result';

const ProSkeleton: React.FC<
  ListPageSkeletonProps &
    DescriptionsPageSkeletonProps & {
      type?: 'list' | 'result' | 'descriptions';
      active?: boolean;
    }
> = ({ type = 'list', ...rest }) => {
  if (type === 'result') {
    return <ResultPageSkeleton {...rest} />;
  }

  if (type === 'descriptions') {
    return <DescriptionsPageSkeleton {...rest} />;
  }

  return <ListPageSkeleton {...rest} />;
};

export {
  ProSkeleton,
  ListPageSkeleton,
  ListSkeleton,
  ListSkeletonItem,
  PageHeaderSkeleton,
  ListToolbarSkeleton,
  DescriptionsSkeleton,
  TableSkeleton,
  TableItemSkeleton,
};

export default ProSkeleton;
