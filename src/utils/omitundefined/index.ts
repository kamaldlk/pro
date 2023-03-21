type OmitUndefined<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export const omitUndefined = <T>(obj: any): OmitUndefined<T> => {
  const newObj:any = {} as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  if (Object.keys(newObj as Record<string, any>).length < 1) {
    return undefined as any;
  }
  return newObj as OmitUndefined<T>;
};
