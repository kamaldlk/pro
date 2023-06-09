﻿/* eslint-disable react-hooks/exhaustive-deps */
import { openVisibleCompatible } from '../../../utils';
import { Popover } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { AppsLogo } from './appslogo';
import { DefaultContent } from './defaultcontent';
import { SimpleContent } from './simplecontent';
import { useStyle } from './style/index';
import type { AppListProps, AppItemProps } from './types';

export const defaultRenderLogo = (
  logo: React.ReactNode | (() => React.ReactNode),
): React.ReactNode => {
  if (typeof logo === 'string') {
    return <img width="auto" height={22} src={logo} alt="logo" />;
  }
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};


export const AppsLogoComponents: React.FC<{
  appList?: AppListProps;
  itemClick?: (item: AppItemProps, popoverRef?: React.RefObject<HTMLSpanElement>) => void;
  prefixCls?: string;
}> = (props) => {
  const { appList, prefixCls = 'ant-pro', itemClick } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLSpanElement>(null);
  const baseClassName = `${prefixCls}-layout-apps`;
  const { wrapSSR, hashId } = useStyle(baseClassName);

  const [open, setOpen] = useState(false);

  const cloneItemClick = (app: AppItemProps) => {
    itemClick?.(app, popoverRef);
  };

  const popoverContent = useMemo(() => {
    const isSimple = appList?.some((app) => {
      return !app?.desc;
    });
    if (isSimple) {
      return (
        <SimpleContent
          hashId={hashId}
          appList={appList}
          itemClick={itemClick ? cloneItemClick : undefined}
          baseClassName={`${baseClassName}-simple`}
        />
      );
    }
    return (
      <DefaultContent
        hashId={hashId}
        appList={appList}
        itemClick={itemClick ? cloneItemClick : undefined}
        baseClassName={`${baseClassName}-default`}
      />
    );
  }, [appList, baseClassName, hashId]);

  if (!props?.appList?.length) return null;

  const popoverOpenProps = openVisibleCompatible(undefined, (openChange: boolean) =>
    setOpen(openChange),
  );

  return wrapSSR(
    <>
      <div
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
      <Popover
        placement="bottomLeft"
        trigger={['click']}
        zIndex={9999}
        arrow={false}
        {...popoverOpenProps}
        overlayClassName={`${baseClassName}-popover ${hashId}`}
        content={popoverContent}
        getPopupContainer={() => ref.current || document.body}
      >
        <span
          ref={popoverRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={classNames(`${baseClassName}-icon`, hashId, {
            [`${baseClassName}-icon-active`]: open,
          })}
        >
          <AppsLogo />
        </span>
      </Popover>
    </>,
  );
};
