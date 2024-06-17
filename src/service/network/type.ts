export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ParameterEncoding = 'URL' | 'JSON';

export enum Task {
  REQUEST = 'request',
  DOWNLOAD = 'download',
  UPLOAD = 'upload',
}

export interface TargetType extends Omit<RequestInit, 'method' | 'body'> {
  //
  path: string;
  //
  task: Task;
  //
  accessToken?: string;
  //
  method: RequestMethod;
  //
  parameters?: Record<string, any>;
  //
  body?: Record<string, any> | RequestInit['body'];
  //
  ignoreNormalize?: boolean;
  //
  encoding?: ParameterEncoding;
  //
  /** Override default base url */
  baseURL?: (config: AppServerConfiguration) => string;
}

export interface AppServerConfiguration {
  baseURL: string;
  version: string;
  resultPath?: string;
}

export enum AcceptType {
  json = 'application/json',
  form_data = 'multipart/form-data',
  url_encode = 'application/x-www-form-urlencoded',
}

export interface APIErrorResponse {
  statusCode: number;
  status: string;
  messageCode: string;
  message: string;
}

export interface IAPIProvider {
  get(
    url: string,
    params?: Omit<TargetType, 'method' | 'path' | 'task'>,
  ): Promise<Record<string, any>>;
  post(
    url: string,
    body?: Omit<TargetType, 'method' | 'path' | 'task'>,
  ): Promise<Record<string, any>>;
  postForm(
    url: string,
    body?: Omit<TargetType, 'method' | 'path' | 'task'>,
  ): Promise<Record<string, any>>;
  request(target: Omit<TargetType, 'task'>): Promise<Record<string, any>>;
  //
  customBaseUrl?(configuration: AppServerConfiguration): string;
}
