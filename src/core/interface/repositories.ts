import {TAsyncResponse} from './AbstractionResponse';

export interface ITodoService {
  getTasks(): TAsyncResponse;
}
