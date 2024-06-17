import {isNull} from '../../utils/isNull';

//
export const makeURLSearchParamsStr = (params: Record<string, any>) => {
  const paramObject = {
    ...params,
  };

  let paramList: string[] = [];
  for (let key in paramObject) {
    const value = paramObject[key];
    if (!isNull(value)) {
      if (Array.isArray(value)) {
        paramList.push(key + '=' + encodeURIComponent(JSON.stringify(value)));
      } else {
        paramList.push(key + '=' + encodeURIComponent(paramObject[key]));
      }
    }
  }
  let paramStr = paramList.reduce((currentValue, item, index) => {
    let nextValue =
      index === 0 ? currentValue + item : currentValue + '&' + item;
    return nextValue;
  }, '?');

  return paramStr.length !== 1 ? paramStr : '';
};
//
export const getParams = (payload?: {[key in string]: any}) => {
  let params = '';
  if (payload) {
    const paramsMapper = Object.keys(payload).map(
      key => `${key}=${encodeURIComponent(payload[key])}`,
    );
    params = `?${paramsMapper?.join('&')}`;
  }
  return params;
};
