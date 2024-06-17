import {normalizeJsonApiIfNeed} from '../../utils/normalize';

import {TargetType} from './type';

export const responseInterceptor = async (
  target: TargetType,
  response: Response,
) => {
  if (!response.ok) {
    return response.text().then(error => {
      const normalizeData = normalizeJsonApiIfNeed(error);
      const normalizeError = {
        statusCode: response.status,
        status: response.statusText,
        messageCode: 'EXTERNAL',
        message: error,
        ...normalizeData,
      };
      return Promise.reject(normalizeError);
    });
  }
  //
  if (target?.ignoreNormalize) {
    const responseJSON: Record<string, any> = await response.json();
    return responseJSON;
  }

  const responseStr = await response.text();
  const normalizeData = normalizeJsonApiIfNeed(responseStr);
  return normalizeData;
};

export const errorInterceptor = (error: any) => {
  let normalizeError = normalizeJsonApiIfNeed(error);

  if (error instanceof Error) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      // Include any other properties you want to stringify
    };
    normalizeError = normalizeJsonApiIfNeed(errorData);
  }

  if (
    normalizeError.statusCode === undefined ||
    normalizeError.statusCode === null
  ) {
    normalizeError.statusCode = 400;
  }

  if (normalizeError.status === undefined || normalizeError.status === null) {
    normalizeError.status = '400';
  }

  if (
    normalizeError.messageCode === undefined ||
    normalizeError.messageCode === null
  ) {
    normalizeError.messageCode = 'INTERNAL';
  }

  if (normalizeError.message === undefined || normalizeError.message === null) {
    normalizeError.message = JSON.stringify(error);
  }

  return Promise.reject(normalizeError);
};
