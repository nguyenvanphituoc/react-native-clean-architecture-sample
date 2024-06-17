//check data null
export const isNull = (data: any) => {
  if (data === undefined || data == null) {
    return true;
  } else if (typeof data === 'string') {
    data = String(data).trim();
    return data === '';
  } else if (typeof data === 'object' && data.constructor === Object) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  } else if (Array.isArray(data) && data.length === 0) {
    return true;
  }
  return false;
};
