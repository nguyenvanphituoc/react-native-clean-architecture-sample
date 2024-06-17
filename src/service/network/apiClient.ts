import {Logger} from '../logger';

import {makeURLSearchParamsStr} from './common';
import {errorInterceptor, responseInterceptor} from './interceptor';
import {
  AcceptType,
  AppServerConfiguration,
  IAPIProvider,
  TargetType,
  Task,
} from './type';

const jsonHeader = {
  Accept: AcceptType.json,
  'Content-Type': AcceptType.json,
};

const formHeader = {
  Accept: AcceptType.form_data,
  'Content-Type': AcceptType.form_data,
};

export class RemoteAPIProvider implements IAPIProvider {
  private configuration: AppServerConfiguration;

  constructor(configuration: AppServerConfiguration) {
    this.configuration = configuration;
  }

  get: IAPIProvider['get'] = async (path, options) => {
    const {headers, ...restOptions} = options ?? {};
    const defaultHeaders = {
      ...jsonHeader,
      ...headers,
    };

    return this.request({
      path: path,
      method: 'GET',
      headers: defaultHeaders,
      ...restOptions,
    });
  };

  post: IAPIProvider['post'] = async (path, options) => {
    const {headers, ...restOptions} = options ?? {};
    const defaultHeaders = {
      ...jsonHeader,
      ...headers,
    };

    return this.request({
      path: path,
      method: 'POST',
      headers: defaultHeaders,
      ...restOptions,
    });
  };

  postForm: IAPIProvider['postForm'] = async (
    path: string,
    options?: Omit<TargetType, 'method' | 'path'>,
  ) => {
    return this.post(path, {
      ...options,
      headers: Object.assign(formHeader, options?.headers),
    });
  };

  request: IAPIProvider['request'] = async target => {
    // Extract necessary data from target
    const {path, accessToken, body, method, headers, baseURL, ...rest} = target;
    // Construct URL
    const pathDelimiter = '/';
    const paths = [this.configuration.baseURL, path];
    if (baseURL) {
      paths[0] = baseURL(this.configuration);
    } else if (this.configuration.version) {
      paths.splice(1, 0, this.configuration.version);
    }
    let url = paths.join(pathDelimiter);
    // Construct headers
    const finalizedHeader: Record<string, string> = {};

    if (accessToken) {
      finalizedHeader.Authorization = 'Bearer ' + accessToken;
    }

    if (headers) {
      Object.assign(finalizedHeader, headers);
    }
    // Construct request options
    const requestOptions: RequestInit = {
      method: method,
      headers: finalizedHeader,
      // Add other necessary options like body, etc.
      ...rest,
    };
    // Construct URL with query params
    if (
      method === 'GET' &&
      body &&
      typeof body === 'object' &&
      Object.keys(body).length > 0
    ) {
      const queries = makeURLSearchParamsStr(body);
      url += queries;
    } else if (body) {
      // Add body to request options
      requestOptions.body = body as RequestInit['body'];
    }

    Logger.group('CALL NETWORK');
    Logger.info('API REQUEST: ', method, url, body, finalizedHeader);

    // Fetch request
    return fetch(url, requestOptions)
      .then(async response =>
        responseInterceptor(
          Object.assign(target, {task: Task.REQUEST}),
          response,
        ),
      )
      .then(normalizeData => {
        let result: typeof normalizeData =
          this.configuration.resultPath && !target?.ignoreNormalize
            ? normalizeData[this.configuration.resultPath]
            : normalizeData;
        Logger.info('API RESPONSE JSON: ', result);

        return result;
      })
      .catch(errorInterceptor)
      .catch(normalizeError => {
        Logger.info('API RESPONSE ERROR: ', JSON.stringify(normalizeError));
        return Promise.reject(normalizeError);
      })
      .finally(() => {
        Logger.groupEnd();
      });
  };

  // Define other request methods here
}
