import type { GenerateStyle, ProTokenType } from '@ant-design/pro-provider';
import { ProConfigProvider, ProProvider } from '@ant-design/pro-provider';
import { isBrowser, useDocumentTitle, useMountMergeState } from '@ant-design/pro-utils';
import { getMatchMenu } from '@umijs/route-utils';
import type { NewBreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb/Breadcrumb';
import { ConfigProvider, Layout } from 'antd';
import classNames from 'classnames';
import Omit from 'omit.js';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import warning from 'rc-util/lib/warning';
import type { CSSProperties } from 'react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useAntdMediaQuery from 'use-media-antd-query';
import { Logo } from './assert/logo';
import { DefaultFooter as Footer } from './components/footer';
import type { HeaderViewProps } from './components/header';
import { DefaultHeader as Header } from './components/header';
import { PageLoading } from './components/pageloading';
import { SiderMenu } from './components/sidermenu';
import type { SiderMenuProps } from './components/sidermenu/SiderMenu';
import type { SiderMenuToken } from './components/sidermenu/style';
import type { WaterMarkProps } from './components/watermark';
import { RouteContext } from './context/routecontext';
import type { ProSettings } from './defaultsettings';
import { defaultSettings } from './defaultsettings';
import type { GetPageTitleProps } from './getpagetitle';
import { getPageTitleInfo } from './getpagetitle';
import type { LocaleType } from './locales';
import { gLocaleObject } from './locales';
import { useStyle } from './style';
import type { MenuDataItem, MessageDescriptor, RouterTypes, WithFalse } from './typing';
import type { BreadcrumbProLayoutProps } from './utils/getbreadcrumbprops';
import { getBreadcrumbProps } from './utils/getbreadcrumbprops';
import { getMenuData } from './utils/getmenudata';
import { useCurrentMenuLayoutProps } from './utils/usecurrentmenulayoutprops';
import { clearMenuItem } from './utils/utils';
import { WrapContent } from './wrapcontent';

let layoutIndex = 0;

export type LayoutBreadcrumbProps = {
  minLength?: number;
};

type GlobalTypes = Omit<
  Partial<RouterTypes> &
  SiderMenuProps &
  HeaderViewProps & {
    token?: ProTokenType['layout'];
  },
  'collapsed'
>;

export type ProLayoutProps = GlobalTypes & {
  stylish?: {
    header?: GenerateStyle<SiderMenuToken>;
    sider?: GenerateStyle<SiderMenuToken>;
  };
  bgLayoutImgList?: {
    src?: string;
    width?: string;
    height?: string;
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
  }[];

  pure?: boolean;

  logo?: React.ReactNode | JSX.Element | WithFalse<() => React.ReactNode | JSX.Element>;

  onPageChange?: (location?: RouterTypes['location']) => void;

  loading?: boolean;

  locale?: LocaleType;

  collapsed?: boolean;

  onCollapse?: (collapsed: boolean) => void;

  footerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;

  breadcrumbRender?: WithFalse<
    (routers: AntdBreadcrumbProps['items']) => AntdBreadcrumbProps['items']
  >;

  pageTitleRender?: WithFalse<
    (
      props: GetPageTitleProps,
      defaultPageTitle?: string,
      info?: {
        title: string;
        id: string;
        pageName: string;
      },
    ) => string
  >;

  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];

  itemRender?: AntdBreadcrumbProps['itemRender'];

  formatMessage?: (message: MessageDescriptor) => string;

  disableMobile?: boolean;

  contentStyle?: CSSProperties;

  className?: string;
  breadcrumbProps?: AntdBreadcrumbProps & LayoutBreadcrumbProps;

  waterMarkProps?: WaterMarkProps;

  actionRef?: React.MutableRefObject<
    | {
      reload: () => void;
    }
    | undefined
  >;

  ErrorBoundary?: any;

  siderMenuType?: 'sub' | 'group';

  isChildrenLayout?: boolean;
};

const headerRender = (
  props: ProLayoutProps & {
    hasSiderMenu: boolean;
  },
  matchMenuKeys: string[],
): React.ReactNode => {
  if (props.headerRender === false || props.pure) {
    return null;
  }
  return <Header matchMenuKeys={matchMenuKeys} {...props} stylish={props.stylish?.header} />;
};

const footerRender = (props: ProLayoutProps): React.ReactNode => {
  if (props.footerRender === false || props.pure) {
    return null;
  }
  if (props.footerRender) {
    return props.footerRender({ ...props }, <Footer />);
  }
  return null;
};

const renderSiderMenu = (props: ProLayoutProps, matchMenuKeys: string[]): React.ReactNode => {
  const {
    layout,
    isMobile,
    selectedKeys,
    openKeys,
    splitMenus,
    suppressSiderWhenMenuEmpty,
    menuRender,
  } = props;
  if (props.menuRender === false || props.pure) {
    return null;
  }
  let { menuData } = props;

  if (splitMenus && (openKeys !== false || layout === 'mix') && !isMobile) {
    const [key] = selectedKeys || matchMenuKeys;
    if (key) {
      menuData = props.menuData?.find((item) => item.key === key)?.children || [];
    } else {
      menuData = [];
    }
  }
  const clearMenuData = clearMenuItem(menuData || []);
  if (clearMenuData && clearMenuData?.length < 1 && (splitMenus || suppressSiderWhenMenuEmpty)) {
    return null;
  }
  if (layout === 'top' && !isMobile) {
    return (
      <SiderMenu matchMenuKeys={matchMenuKeys} {...props} hide stylish={props.stylish?.sider} />
    );
  }

  const defaultDom = (
    <SiderMenu
      matchMenuKeys={matchMenuKeys}
      {...props}
      menuData={clearMenuData}
      stylish={props.stylish?.sider}
    />
  );
  if (menuRender) {
    return menuRender(props, defaultDom);
  }

  return defaultDom;
};

const defaultPageTitleRender = (
  pageProps: GetPageTitleProps,
  props: ProLayoutProps,
): {
  title: string;
  id: string;
  pageName: string;
} => {
  const { pageTitleRender } = props;
  const pageTitleInfo = getPageTitleInfo(pageProps);
  if (pageTitleRender === false) {
    return {
      title: props.title || '',
      id: '',
      pageName: '',
    };
  }
  if (pageTitleRender) {
    const title = pageTitleRender(pageProps, pageTitleInfo.title, pageTitleInfo);
    if (typeof title === 'string') {
      return getPageTitleInfo({
        ...pageTitleInfo,
        title,
      });
    }
    warning(
      typeof title === 'string',
      'pro-layout: renderPageTitle return value should be a string',
    );
  }
  return pageTitleInfo;
};

export type BasicLayoutContext = { [K in 'location']: ProLayoutProps[K] } & {
  breadcrumb: Record<string, MenuDataItem>;
};

const getpaddingInlineStart = (
  hasLeftPadding: boolean,
  collapsed: boolean | undefined,
  siderWidth: number,
): number | undefined => {
  if (hasLeftPadding) {
    return collapsed ? 60 : siderWidth;
  }
  return 0;
};

const BaseProLayout: React.FC<ProLayoutProps> = (props) => {
  const {
    children,
    onCollapse: propsOnCollapse,
    location = { pathname: '/' },
    contentStyle,
    route,
    defaultCollapsed,
    style,
    siderWidth: propsSiderWidth,
    menu,
    siderMenuType,
    isChildrenLayout: propsIsChildrenLayout,
    menuDataRender,
    actionRef,
    bgLayoutImgList,
    formatMessage: propsFormatMessage,
    loading,
  } = props || {};

  const siderWidth = useMemo(() => {
    if (propsSiderWidth) return propsSiderWidth;
    if (props.layout === 'mix') return 215;
    return 256;
  }, [props.layout, propsSiderWidth]);

  const context = useContext(ConfigProvider.ConfigContext);

  const prefixCls = props.prefixCls ?? context.getPrefixCls('pro');

  const [menuLoading, setMenuLoading] = useMountMergeState(false, {
    value: menu?.loading,
    onChange: menu?.onLoadingChange,
  });

  const [defaultId] = useState(() => {
    layoutIndex += 1;
    return `pro-layout-${layoutIndex}`;
  });

  const formatMessage = useCallback(
    ({ id, defaultMessage, ...restParams }: { id: string; defaultMessage?: string }): string => {
      if (propsFormatMessage) {
        return propsFormatMessage({
          id,
          defaultMessage,
          ...restParams,
        });
      }
      const locales = gLocaleObject();
      return locales[id] ? locales[id] : (defaultMessage as string);
    },
    [propsFormatMessage],
  );

  const { data, mutate } = useSWR(
    [defaultId, menu?.params],
    async ([, params]) => {
      setMenuLoading(true);
      const menuDataItems = await menu?.request?.(
        params || {},
        route?.children || route?.routes || [],
      );
      setMenuLoading(false);
      return menuDataItems;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
    },
  );

  const { cache } = useSWRConfig();
  useEffect(() => {
    return () => {
      if (cache instanceof Map) cache.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuInfoData = useMemo<{
    breadcrumb?: Record<string, MenuDataItem>;
    breadcrumbMap?: Map<string, MenuDataItem>;
    menuData?: MenuDataItem[];
  }>(
    () =>
      getMenuData(
        data || route?.children || route?.routes || [],
        menu,
        formatMessage,
        menuDataRender,
      ),
    [formatMessage, menu, menuDataRender, data, route?.children, route?.routes],
  );

  const { breadcrumb = {}, breadcrumbMap, menuData = [] } = menuInfoData || {};

  if (actionRef && menu?.request) {
    actionRef.current = {
      reload: () => {
        mutate();
      },
    };
  }
  const matchMenus = useMemo(() => {
    return getMatchMenu(location.pathname || '/', menuData || [], true);
  }, [location.pathname, menuData]);

  const matchMenuKeys = useMemo(
    () => Array.from(new Set(matchMenus.map((item) => item.key || item.path || ''))),
    [matchMenus],
  );

  const currentMenu = (matchMenus[matchMenus.length - 1] || {}) as ProSettings & MenuDataItem;

  const currentMenuLayoutProps = useCurrentMenuLayoutProps(currentMenu);

  const {
    fixSiderbar,
    navTheme,
    layout: propsLayout,
    ...rest
  } = {
    ...props,
    ...currentMenuLayoutProps,
  };

  const colSize = useAntdMediaQuery();

  const isMobile = (colSize === 'sm' || colSize === 'xs') && !props.disableMobile;

  const hasLeftPadding = propsLayout !== 'top' && !isMobile;

  const [collapsed, onCollapse] = useMergedState<boolean>(
    () => {
      if (defaultCollapsed !== undefined) return defaultCollapsed;
      if (process.env.NODE_ENV === 'test') return false;
      if (isMobile) return true;
      if (colSize === 'md') return true;
      return false;
    },
    {
      value: props.collapsed,
      onChange: propsOnCollapse,
    },
  );

  const defaultProps = Omit(
    {
      prefixCls,
      ...props,
      siderWidth,
      ...currentMenuLayoutProps,
      formatMessage,
      breadcrumb,
      menu: { ...menu, type: siderMenuType || menu?.type, loading: menuLoading },
      layout: propsLayout as 'side',
    },
    ['className', 'style', 'breadcrumbRender'],
  );

  const pageTitleInfo = defaultPageTitleRender(
    {
      pathname: location.pathname,
      ...defaultProps,
      breadcrumbMap,
    },
    props,
  );

  const breadcrumbProps = getBreadcrumbProps(
    {
      ...(defaultProps as BreadcrumbProLayoutProps),
      breadcrumbRender: props.breadcrumbRender,
      breadcrumbMap,
    },
    props,
  );

  const siderMenuDom = renderSiderMenu(
    {
      ...defaultProps,
      menuData,
      onCollapse,
      isMobile,
      collapsed,
    },
    matchMenuKeys,
  );

  const headerDom = headerRender(
    {
      ...defaultProps,
      children: null,
      hasSiderMenu: !!siderMenuDom,
      menuData,
      isMobile,
      collapsed,
      onCollapse,
    },
    matchMenuKeys,
  );

  const footerDom = footerRender({
    isMobile,
    collapsed,
    ...defaultProps,
  });

  const { isChildrenLayout: contextIsChildrenLayout } = useContext(RouteContext);

  const isChildrenLayout =
    propsIsChildrenLayout !== undefined ? propsIsChildrenLayout : contextIsChildrenLayout;

  const proLayoutClassName = `${prefixCls}-layout`;
  const { wrapSSR, hashId } = useStyle(proLayoutClassName);

  const className = classNames(props.className, hashId, 'ant-design-pro', proLayoutClassName, {
    [`screen-${colSize}`]: colSize,
    [`${proLayoutClassName}-top-menu`]: propsLayout === 'top',
    [`${proLayoutClassName}-is-children`]: isChildrenLayout,
    [`${proLayoutClassName}-fix-siderbar`]: fixSiderbar,
    [`${proLayoutClassName}-${propsLayout}`]: propsLayout,
  });

  const leftSiderWidth = getpaddingInlineStart(!!hasLeftPadding, collapsed, siderWidth);

  const genLayoutStyle: CSSProperties = {
    position: 'relative',
  };

  if (isChildrenLayout || (contentStyle && contentStyle.minHeight)) {
    genLayoutStyle.minHeight = 0;
  }

  useEffect(() => {
    props.onPageChange?.(props.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.pathname?.search]);

  const [hasFooterToolbar, setHasFooterToolbar] = useState(false);

  const [hasPageContainer, setHasPageContainer] = useState(0);
  useDocumentTitle(pageTitleInfo, props.title || false);
  const bgImgStyleList = useMemo(() => {
    if (bgLayoutImgList && bgLayoutImgList.length > 0) {
      return bgLayoutImgList.map((item, index) => {
        return (
          <img
            key={index}
            src={item.src}
            alt=""
            style={{
              position: 'absolute',
              ...item,
            }}
          />
        );
      });
    }
    return null;
  }, [bgLayoutImgList]);
  const { token } = useContext(ProProvider);
  return wrapSSR(
    <RouteContext.Provider
      value={{
        ...defaultProps,
        breadcrumb: breadcrumbProps,
        menuData,
        isMobile,
        collapsed,
        hasPageContainer,
        setHasPageContainer,
        isChildrenLayout: true,
        title: pageTitleInfo.pageName,
        hasSiderMenu: !!siderMenuDom,
        hasHeader: !!headerDom,
        siderWidth: leftSiderWidth,
        hasFooter: !!footerDom,
        hasFooterToolbar,
        setHasFooterToolbar,
        pageTitleInfo,
        matchMenus,
        matchMenuKeys,
        currentMenu,
      }}
    >
      {props.pure ? (
        <>{children}</>
      ) : (
        <div className={className}>
          <div className={`${proLayoutClassName}-bg-list ${hashId}`}>{bgImgStyleList}</div>
          <Layout
            style={{
              minHeight: '100%',
              // hack style
              flexDirection: siderMenuDom ? 'row' : undefined,
              ...style,
            }}
          >
            {siderMenuDom}
            <div style={genLayoutStyle} className={`${proLayoutClassName}-container ${hashId}`}>
              {headerDom}
              <WrapContent
                hasPageContainer={hasPageContainer}
                isChildrenLayout={isChildrenLayout}
                {...rest}
                hasHeader={!!headerDom}
                prefixCls={proLayoutClassName}
                style={contentStyle}
              >
                {loading ? <PageLoading /> : children}
              </WrapContent>
              {footerDom}
              {hasFooterToolbar && (
                <div
                  className={`${proLayoutClassName}-has-footer`}
                  style={{
                    height: 64,
                    marginBlockStart:
                      token?.layout?.pageContainer?.paddingBlockPageContainerContent,
                  }}
                />
              )}
            </div>
          </Layout>
        </div>
      )}
    </RouteContext.Provider>,
  );
};

BaseProLayout.defaultProps = {
  logo: <Logo />,
  ...defaultSettings,
  location: isBrowser() ? window.location : undefined,
};

const ProLayout: React.FC<ProLayoutProps> = (props) => {
  const { colorPrimary } = props;

  const darkProps =
    props.navTheme !== undefined
      ? {
        dark: props.navTheme === 'realDark',
      }
      : {};

  return (
    <ConfigProvider
      // direction='rtl'
      theme={
        colorPrimary
          ? {
            token: {
              colorPrimary: colorPrimary,
            },
          }
          : undefined
      }
    >
      <ProConfigProvider
        autoClearCache
        {...darkProps}
        token={props.token}
        prefixCls={props.prefixCls}
      >
        <BaseProLayout {...props} />
      </ProConfigProvider>
    </ConfigProvider>
  );
};

export { ProLayout };
