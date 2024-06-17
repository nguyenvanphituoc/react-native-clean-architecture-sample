import {parseTodoItem} from '../domain/todoItem';
import {TCreateTask} from '../interface/todoUseCases';

export const createTask: TCreateTask = ({apiGateway, options}) => {
  return {
    execute: async () => {
      const item = parseTodoItem({title: options.title});
      apiGateway.create(item);

      return {
        success: true,
        data: apiGateway,
      };
    },
  };
};
