import { arrayMoveImmutable } from './arraymove';
import { DropdownFooter } from './components/dropdownfooter';
import { ErrorBoundary } from './components/errorboundary';
import { FieldLabel } from './components/fieldlabel';
import { FilterDropdown } from './components/filterdropdown';
import { InlineErrorFormItem } from './components/inlineerrorformItem';
import { LabelIconTip } from './components/labelicontip';
import type { ProFormInstanceType } from './components/formcontext';
import { ProFormContext } from './components/formcontext';
import { conversionMomentValue, convertMoment, dateFormatterMap } from './conversionmomentvalue';
import { dateArrayFormatter } from './datearrayformatter';
import { genCopyable } from './gencopyable';
import { getFieldPropsOrFormItemProps } from './getfieldpropsorformitemprops';
/** Hooks */
import { useDebounceFn } from './hooks/usedebouncefn';
import { useDebounceValue } from './hooks/usedebouncevalue';
import { useDeepCompareEffect, useDeepCompareEffectDebounce } from './hooks/usedeepcompareeffect';
import { useDocumentTitle } from './hooks/usedocumenttitle';
import type { ProRequestData } from './hooks/usefetchdata';
import { useFetchData } from './hooks/usefetchdata';
import { useLatest } from './hooks/uselatest';
import { usePrevious } from './hooks/useprevious';
import { useRefFunction } from './hooks/usereffunction';
import { isBrowser } from './isbrowser';
import { isDeepEqualReact } from './isdeepequalreact';
import { isDropdownValueType } from './isdropdownvaluetype';
import { isImg } from './isimg';
import { isNil } from './isnil';
import { isUrl } from './isurl';
import { merge } from './merge';
import { nanoid } from './nanoid';
import { omitBoolean } from './omitboolean';
import { omitUndefined } from './omitundefined';
import { omitUndefinedAndEmptyArr } from './omitundefinedandemptyarr';
import { parseValueToDay } from './parsevaluetomoment';
import { pickProFormItemProps } from './pickformitemprops';
import { pickProProps } from './pickprops';
import { runFunction } from './runfunction';
import { transformKeySubmitValue } from './transformkeysubmitvalue';
import {
  lighten,
  operationUnit,
  resetComponent,
  setAlpha,
  useStyle,
} from '@ant-design/pro-provider';
import type {
  RowEditableConfig,
  RowEditableType,
  UseEditableType,
  UseEditableUtilType,
} from './useeditablearray';
import { editableRowByKey, recordKeyToString, useEditableArray } from './useeditablearray';
import type { UseEditableMapType, UseEditableMapUtilType } from './useeditablemap';
import { useEditableMap } from './useeditablemap';
import { useMountMergeState } from './useMountMergeState';
import { compareVersions } from './compareversions';
import { openVisibleCompatible } from './compareversions/openvisiblecompatible';
import { menuOverlayCompatible } from './compareversions/menuoverlaycompatible';

export * from './typing';

export type {
  ProFormInstanceType,
  RowEditableConfig,
  RowEditableType,
  ProRequestData,
  UseEditableType,
  UseEditableUtilType,
  UseEditableMapType,
  UseEditableMapUtilType,
};

export {
  LabelIconTip,
  ProFormContext,
  isDeepEqualReact,
  FilterDropdown,
  menuOverlayCompatible,
  FieldLabel,
  arrayMoveImmutable,
  InlineErrorFormItem,
  DropdownFooter,
  ErrorBoundary,
  dateFormatterMap,
  // function
  transformKeySubmitValue,
  conversionMomentValue as conversionSubmitValue,
  conversionMomentValue,
  convertMoment,
  parseValueToDay,
  genCopyable,
  useDocumentTitle,
  isImg,
  omitBoolean,
  isNil,
  merge,
  isDropdownValueType,
  omitUndefined,
  omitUndefinedAndEmptyArr,
  pickProFormItemProps,
  isUrl,
  isBrowser,
  pickProProps,
  runFunction,
  getFieldPropsOrFormItemProps,
  dateArrayFormatter,
  openVisibleCompatible,
  nanoid,
  editableRowByKey,
  recordKeyToString,
  compareVersions,
  // hooks
  useEditableArray,
  useEditableMap,
  useRefFunction,
  useDeepCompareEffect,
  usePrevious,
  useDebounceFn,
  useMountMergeState,
  useFetchData,
  useDeepCompareEffectDebounce,
  useLatest,
  useDebounceValue,
  useStyle,
  setAlpha,
  resetComponent,
  operationUnit,
  lighten,
};
