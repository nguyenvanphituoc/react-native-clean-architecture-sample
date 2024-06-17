function simplCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');
}

function simpleCamelCaseKeys(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = simplCamelCase(key);
      result[newKey] = obj[key];
    }
  }
  return result;
}

function isHtml(str: string): boolean {
  return /<\/?[a-zA-Z][\s\S]*>/gm.test(str);
}

export const parseXmlToJson = (xml: string) => {
  const json: Record<string, any> = {};
  const OPEN_TAG_INDEX = 1;
  const CLOSE_TAG_INDEX = 3;
  const CONTENT_INDEX = 2;
  for (const res of xml.matchAll(
    /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm,
  )) {
    const key = res[OPEN_TAG_INDEX] || res[CLOSE_TAG_INDEX];
    const value = res[CONTENT_INDEX] && parseXmlToJson(res[CONTENT_INDEX]);
    json[key] =
      (value && Object.keys(value).length ? value : res[CONTENT_INDEX]) || null;
  }
  return json;
};

export const normalizeJsonApiIfNeed = (
  data: Record<string, any> | string | Array<any>,
) => {
  let newData: Record<string, any> = {};
  // detect xml file
  if (typeof data === 'string') {
    newData = {message: data};
    try {
      newData = JSON.parse(data);
    } catch (e) {
      if (isHtml(data)) {
        newData = parseXmlToJson(data);
      }
    }
    return simpleCamelCaseKeys(newData);
  }

  if (Array.isArray(data)) {
    newData = [...data];
  } else if (typeof data === 'object') {
    newData = {...data};
  }

  return simpleCamelCaseKeys(newData);
};
