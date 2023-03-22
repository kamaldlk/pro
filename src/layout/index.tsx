import 'antd/lib/anchor/style';
import 'antd/lib/avatar/style';
import 'antd/lib/breadcrumb/style';
import 'antd/lib/divider/style';
import 'antd/lib/drawer/style';
import 'antd/lib/layout/style';
import 'antd/lib/list/style';
import 'antd/lib/menu/style';
import 'antd/lib/message/style';
import 'antd/lib/popover/style';
import 'antd/lib/select/style';
import 'antd/lib/space/style';
import 'antd/lib/spin/style';
import 'antd/lib/switch/style';
import 'antd/lib/tabs/style';
import 'antd/lib/tooltip/style';
import 'antd/lib/typography/style';

import { FooterToolbar } from './components/footertoolbar';
import { GridContent } from './components/gridcontent';
import type { PageContainerProps } from './components/pagecontainer';
import { PageContainer, ProBreadcrumb, ProPageHeader } from './components/pagecontainer';
import type { PageHeaderProps } from './components/pageheader';
import { PageHeader } from './components/pageheader';
import type { AppItemProps, AppListProps } from './components/appslogo/types';

import type { FooterProps } from './components/footer';
import { DefaultFooter } from './components/footer';
import type { HeaderViewProps as HeaderProps } from './components/header';
import { DefaultHeader } from './components/header';
import { PageLoading } from './components/pageloading';
import type { SettingDrawerProps, SettingDrawerState } from './components/settingdrawer';
import { SettingDrawer } from './components/settingdrawer';
import type { TopNavHeaderProps } from './components/topnavheader';
import { TopNavHeader } from './components/topnavheader';
import type { WaterMarkProps } from './components/watermark';
import { WaterMark } from './components/watermark';
import type { RouteContextType } from './context/routecontext';
import { RouteContext } from './context/routecontext';
import { getPageTitle } from './getpagetitle';
import type { ProLayoutProps } from './layout';
import { ProLayout } from './layout';
import { getMenuData } from './utils/getmenudata';
import { ProCard } from '../card';
import { ProConfigProvider } from '../provider';
export type { ProSettings, ProSettings as Settings } from './defaultsettings';
export type { MenuDataItem } from './typing';


export * from './components/help';

export {
  PageHeader,
  ProLayout,
  ProCard,
  ProConfigProvider,
  RouteContext,
  PageLoading,
  GridContent,
  DefaultHeader,
  TopNavHeader,
  DefaultFooter,
  SettingDrawer,
  getPageTitle,
  getMenuData,
  PageContainer,
  FooterToolbar,
  WaterMark,
  ProPageHeader,
  ProBreadcrumb,
};
export type {
  WaterMarkProps,
  FooterProps,
  PageHeaderProps,
  PageContainerProps,
  TopNavHeaderProps,
  ProLayoutProps,
  RouteContextType,
  HeaderProps,
  SettingDrawerProps,
  SettingDrawerState,
  AppItemProps,
  AppListProps,
};

export default ProLayout;
