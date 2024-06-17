import {TargetType} from '../../service/network/type';

import {ITodoService} from '../../core/interface/repositories';
import {IAPIProvider, Task} from '../../service/network/type';
import {getFullPath, withTarget} from '../hooks/useCredential';

export type TFunctionTodoService = keyof ITodoService;

export const TodoTarget: {
  [key in TFunctionTodoService]: Partial<TargetType>;
} = {
  getTasks: {
    method: 'GET',
    path: 'todos',
  },
};

export function todoServiceImplement(apiProvider: IAPIProvider) {
  const commonServiceBaseUrl: IAPIProvider['customBaseUrl'] = config =>
    `${config.baseURL}`;

  const getBody = (payload?: Record<string, any>) => {
    return payload;
  };

  const getBaseUrl = (path?: string) => {
    switch (path) {
      default:
        return commonServiceBaseUrl;
    }
  };

  const result = Object.entries(TodoTarget).reduce((rs, [key, target]) => {
    rs[key as TFunctionTodoService] = async (payload?: Record<string, any>) => {
      return withTarget(apiProvider, {
        ...target,
        method: target.method ?? 'GET',
        path: getFullPath(target.path, payload),
        baseURL: getBaseUrl(target.path),
        body: getBody(payload),
        task: target.task ?? Task.REQUEST,
      });
    };

    return rs;
  }, {} as ITodoService);

  return result;
}
