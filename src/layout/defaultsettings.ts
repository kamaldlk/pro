import type { MenuDataItem } from '@umijs/route-utils';

export type ContentWidth = 'Fluid' | 'Fixed';

export type RenderSetting = {
  headerRender?: false;
  footerRender?: false;
  menuRender?: false;
  menuHeaderRender?: false;
};
export type PureSettings = {
  navTheme?: 'realDark' | 'light' | undefined;
  layout?: 'side' | 'top' | 'mix';
  contentWidth?: ContentWidth;
  fixedHeader?: boolean;
  fixSiderbar?: boolean;
  menu?: {
    locale?: boolean;
    hideMenuWhenCollapsed?: boolean;
    collapsedShowTitle?: boolean;
    collapsedShowGroupTitle?: boolean;
    defaultOpenAll?: boolean;
    ignoreFlatMenu?: boolean;
    loading?: boolean;
    onLoadingChange?: (loading?: boolean) => void;
    params?: Record<string, any>;
    request?: (
      params: Record<string, any>,
      defaultMenuData: MenuDataItem[],
    ) => Promise<MenuDataItem[]>;
    type?: 'sub' | 'group';
    autoClose?: false;
  };
  title?: string | false;
  iconfontUrl?: string;
  colorPrimary?: string;
  colorWeak?: boolean;
  splitMenus?: boolean;
  suppressSiderWhenMenuEmpty?: boolean;
  siderMenuType?: 'sub' | 'group';
};

export type ProSettings = PureSettings & RenderSetting;

const defaultSettings: any = {
  navTheme: 'light',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  iconfontUrl: '',
  colorPrimary: '#EFF2F5',
  splitMenus: false,
};
export { defaultSettings };
