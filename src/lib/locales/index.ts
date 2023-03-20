import { isBrowser } from '@ant-design/pro-utils';
import enUSLocal from './en-US';
import itITLocal from './it-IT';
import koKRLocal from './ko-KR';
import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';

const locales: any = {
  'zh-CN': zhLocal,
  'zh-TW': zhTWLocal,
  'en-US': enUSLocal,
  'it-IT': itITLocal,
  'ko-KR': koKRLocal,
};

type GLocaleWindow = {
  g_locale: keyof typeof locales;
};

export type LocaleType = keyof typeof locales;

export const getLanguage = (): any => {
  // support ssr
  if (!isBrowser()) return 'en-US';
  const lang = window.localStorage.getItem('umi_locale');
  return lang || (window as unknown as GLocaleWindow).g_locale || navigator.language;
};
export const gLocaleObject = (): Record<string, string> => {
  const gLocale = getLanguage();
  return locales[gLocale] || locales['en-US'];
};
